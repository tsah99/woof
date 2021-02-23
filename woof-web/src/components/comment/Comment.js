import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/AuthContext";
import firebase from "firebase/app";

import "./Comment.css";

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
 * @param player - a handle on the current video's player
 */
function linkTimestampsInComment(comment, player) {
  let timestampReg = new RegExp(
    /([0-9]?[0-9]:[0-5][0-9]:[0-5][0-9])|([0-5]?[0-9]:[0-5][0-9])/
  );

  let parts = comment.text.split(timestampReg);

  for (let i = 0; i < parts.length; ++i) {
    let timestampStr = parts[i];
    if (timestampStr !== undefined && timestampReg.test(timestampStr)) {
      parts[i] = (
        <span
          onClick={() =>
            player.current.seekTo(
              convertTimestringFormatToSeconds(timestampStr)
            )
          }
          style={{ cursor: "pointer", color: "#2d3edc" }}
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
 *
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
 * @param player - a handle on the current video's player
 */
function renderComment(comment, player) {
  return (
    <Grid justifyContent="left" item xs zeroMinWidth>
      <h4 className="comment-owner">{comment.username}</h4>
      <p className="comment-text">{linkTimestampsInComment(comment, player)}</p>
      <p className="time-posted">{timeSince(comment.time_posted.seconds)}</p>
    </Grid>
  );
}

/**
 * The handler which submits a sub-comment.
 *
 * @param event - a handle on the on enter event
 * @param commentId - the parent comment's id
 * @param videoId - the current video's id
 */
async function submitSubComment(event, commentId, courseId, videoId, authApi) {
  event.preventDefault();

  let comment = event.target[0].value;

  if (comment.length === 0) return;

  const firestore = firebase.firestore();

  const subCommentsRef = firestore
    .collection("classes")
    .doc(courseId)
    .collection("videos")
    .doc(videoId)
    .collection("comments")
    .doc(commentId)
    .collection("subComments");

  await subCommentsRef.add({
    text: comment,
    username: authApi.user.email,
    time_posted: firebase.firestore.Timestamp.now(),
  });

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
 *      videoId - a string containing the current video's id
 *      player - a handle on the player for the current video
 */
function Comment(props) {
  const firestore = firebase.firestore();
  const subCommentsRef = firestore
    .collection("classes")
    .doc(props.courseId)
    .collection("videos")
    .doc(props.videoId)
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

  return (
    <div className="Comment">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="comment-owner">{props.comment.username}</h4>
          <div className="commentBorder">
            <p className="comment-text">
              {linkTimestampsInComment(props.comment, props.player)}
            </p>

            <p className="time-posted">
              {timeSince(props.comment.time_posted.seconds)}
            </p>
            <div className="SubComments">
              {subComments
                ? subComments.map((subComment) =>
                    renderComment(subComment, props.player)
                  )
                : []}
              <form
                className="subcomment-submission-form"
                noValidate
                autoComplete="off"
                onSubmit={(event) =>
                  submitSubComment(
                    event,
                    props.comment.id,
                    props.courseId,
                    props.videoId,
                    authApi
                  )
                }
              >
                <input className="subcomment-field" placeholder="reply..." />
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Comment;
