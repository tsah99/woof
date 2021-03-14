import React, { useContext, useCallback } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/AuthContext";
import LectureContext from "../../contexts/LectureContext";
import firebase from "firebase/app";
import { useLocation } from "react-router-dom";
import "./Comment.css";

/**
 * Code here inspired from https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript.
 *
 * Converts seconds into a timestring format HH:MM:SS and returns the timestring.
 *
 * @param totalSeconds is the number of seconds to convert into timestring format
 */
function convertSecondsToTimestringFormat(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  let timestring = "";

  if (hours) timestring += String(hours).padStart(2, "0") + ":";
  timestring += String(minutes).padStart(2, "0") + ":";
  timestring += String(seconds).padStart(2, "0");

  return timestring;
}

/**
 * Converts a timestring into seconds and returns it.
 *
 * @param timestring - a string of the format HH:MM:SS, H:MM:SS, MM:SS,
 *                     or M:SS
 */
function convertTimestringFormatToSeconds(timestring) {
  let hms = timestring.split(":"); // split it at the colons

  let seconds = 0;
  for (let i = hms.length - 1; i >= 0; --i) {
    seconds += 60 ** (hms.length - i - 1) * hms[i];
  }

  return seconds;
}

/**
 * Given a comment, finds all timestamp strings in the comment
 * text and links them such that clicking on the timestamp will
 * change the playerhead on the current video to that timestamp.
 *
 * For example, in the comment "3:33 was helpful for learning
 * regression and 33:22 was helpful for learning parameter tuning",
 * clicking on 3:33 or 33:22 should change the video's player head
 * to 3:33 and 33:22 respectively
 *
 * @param comment - a comment object as explained in the Comment component
 * @param playerRef - a handle on the current video's player
 */
function linkTimestampsInComment(comment, playerRef) {
  let timestampReg = new RegExp(
    /([0-9]?[0-9]:[0-5][0-9]:[0-5][0-9])|([0-5]?[0-9]:[0-5][0-9])/
  );

  let parts = comment.text.split(timestampReg);

  for (let i = 0; i < parts.length; ++i) {
    let timestampStr = parts[i];
    if (timestampStr !== undefined && timestampReg.test(timestampStr)) {
      parts[i] = (
        <span
          onClick={() => {
            playerRef.current.seekTo(
              convertTimestringFormatToSeconds(timestampStr)
            );
            document.getElementsByClassName("CourseVideo")[0].scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          style={{ cursor: "pointer", color: "lightblue" }}
          className="match"
          key={i}
        >
          {parts[i]}
        </span>
      );
    }
  }
  return <div>{parts}</div>;
}

/**
 * Converts a UNIX timestamp seconds into a "... time ago" format.
 * Code inspired from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
 * @param seconds - UNIX timestamp seconds
 */
function timeSince(seconds) {
  var secondsSince = Math.floor((new Date() - new Date(seconds * 1000)) / 1000);

  var interval = secondsSince / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " year ago";
    } else {
      return Math.floor(interval) + " years ago";
    }
  }
  interval = secondsSince / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " month ago";
    } else {
      return Math.floor(interval) + " months ago";
    }
  }
  interval = secondsSince / 86400;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " day ago";
    } else {
      return Math.floor(interval) + " days ago";
    }
  }
  interval = secondsSince / 3600;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " hour ago";
    } else {
      return Math.floor(interval) + " hours ago";
    }
  }
  interval = secondsSince / 60;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " minute ago";
    } else {
      return Math.floor(interval) + " minutes ago";
    }
  }
  if (Math.floor(secondsSince) == 1) {
    return Math.floor(secondsSince) + " second ago";
  } else {
    return Math.floor(secondsSince) + " seconds ago";
  }
}

/**
 * Renders a singular sub-comment.
 * @param comment - a comment object, as explained in Comment component
 * @param playerRef - a handle on the current video's player
 */
function renderComment(comment, playerRef) {
  return (
    <div>
      <div className="subcomment-owner">{comment.username}</div>
      <div className="subcomment-text">
        {linkTimestampsInComment(comment, playerRef)}
      </div>
      <div className="time-posted">
        {timeSince(comment.time_posted.seconds)}
      </div>
    </div>
  );
}

/**
 * The handler which submits a sub-comment.
 *
 * @param event - a handle on the on enter event
 * @param comment - the comment object
 */
async function submitSubComment(event, comment, authApi) {
  event.preventDefault();

  let commentText = event.target[0].value;

  if (commentText.length === 0) return;

  const firestore = firebase.firestore();

  const subCommentsRef = firestore
    .collection("classes")
    .doc(comment.course_id)
    .collection("videos")
    .doc(comment.video_id)
    .collection("comments")
    .doc(comment.id)
    .collection("subComments");

  const time_posted = firebase.firestore.Timestamp.now();

  await subCommentsRef.add({
    text: commentText,
    username: authApi.user.email,
    time_posted: time_posted,
  });

  // Add the subcomment (comment reply) to parent comment owner's "notifications" firestore collection
  const parentCommentRef = firestore
    .collection("classes")
    .doc(comment.course_id)
    .collection("videos")
    .doc(comment.video_id)
    .collection("comments")
    .doc(comment.id);
  const parentCommentInfo = await parentCommentRef.get();
  const parentCommentId = parentCommentInfo.data().user_id;

  // Only add the notification if the subComment user is DIFFERENT than the logged-in user.
  if (parentCommentId !== authApi.user.uid) {
    const userRef = firestore.collection("users").doc(authApi.user.uid);
    const courseRef = firestore.collection("classes").doc(comment.course_id);
    const videoRef = courseRef.collection("videos").doc(comment.video_id);

    let userInfo = await (await userRef.get()).data();
    let courseInfo = await (await courseRef.get()).data();
    let videoInfo = await (await videoRef.get()).data();

    const notifsRef = firestore
      .collection("users")
      .doc(parentCommentId)
      .collection("notifications");

    await notifsRef.add({
      comment_reply: commentText,
      comment_reply_uid: authApi.user.uid,
      comment_reply_username: userInfo.username,
      course_id: comment.course_id,
      course_code: courseInfo.course_code,
      course_title: courseInfo.course_title,
      parent_comment_id: comment.id,
      video_id: comment.video_id,
      video_name: videoInfo.title,
      time_replied: time_posted,
    });
  }

  // Reset target value to empty string
  event.target[0].value = "";
}

/**
 * This component renders a single comment and should be used as a
 * child component to CommentLog.
 * @param props is an object that contains these properties
 *      comment - an object that contains these properties
 *        username - a string containing the comment owner's username
 *        text - a string containing the comment's text
 *        time_posted - an object containing these properties
 *          seconds - time posted in UNIX timestamp seconds
 *        video_id - id of video comment belongs to
 *        course_id - id of course comment belongs to
 *        video_time - the timestamp at which this comment was made in the video, in seconds
 */
function Comment(props) {
  const firestore = firebase.firestore();
  const subCommentsRef = firestore
    .collection("classes")
    .doc(props.comment.course_id)
    .collection("videos")
    .doc(props.comment.video_id)
    .collection("comments")
    .doc(props.comment.id)
    .collection("subComments");

  let [subComments] = useCollectionData(
    subCommentsRef.orderBy("time_posted", "asc"),
    {
      idField: "id",
    }
  );

  const authApi = useContext(AuthContext);
  const lectureApi = useContext(LectureContext);

  const timestring = convertSecondsToTimestringFormat(props.comment.video_time);

  //logic for scrolling comment into view if arriving by notification click
  let location = useLocation();
  let commentRefCallback = useCallback(
    (commentRef) => {
      let commentId = location.hash;
      if (!commentId || commentId === "#undefined" || !commentRef) return;
      commentId = commentId.substr(1);
      if (commentRef.id === commentId) {
        commentRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [location.hash]
  );

  if (!subComments) {
    return <></>;
  }

  return (
    <div className="Comment" id={props.comment.id} ref={commentRefCallback}>
      <div className="comment-timestamp-and-owner">
        <div
          className="comment-timestamp"
          onClick={() => {
            lectureApi.currentRef.current.seekTo(
              convertTimestringFormatToSeconds(timestring)
            );
            document.getElementsByClassName("CourseVideo")[0].scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {timestring}
        </div>
        <div className="comment-owner">{props.comment.username}</div>
      </div>
      <div className="comment-text">
        {linkTimestampsInComment(props.comment, lectureApi.currentRef)}
      </div>
      <div className="time-posted">
        {timeSince(props.comment.time_posted.seconds)}
      </div>
      <div className="SubComments">
        {subComments.map((subComment) =>
          renderComment(subComment, lectureApi.currentRef)
        )}

        <form
          className="subcomment-submission-form"
          noValidate
          autoComplete="off"
          onSubmit={(event) => submitSubComment(event, props.comment, authApi)}
        >
          <input className="subcomment-field" placeholder="Reply..." />
        </form>
      </div>
    </div>
  );
}

export default Comment;
