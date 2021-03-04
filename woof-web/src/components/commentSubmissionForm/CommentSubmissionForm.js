import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import VideoProgressContext from "../../contexts/VideoProgressContext";
import firebase from "firebase/app";
import "./CommentSubmissionForm.css";

/**
 * Code here inspired from https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript.
 * @param {} totalSeconds
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
 * The handler that's called when a user submits a comment.
 * Makes a call to the Firebase API and posts a comment to
 * Firestore database.
 *
 * This function made async because we desire to await for
 * the comment to be added to the database first and then
 * proceed with any rerendering.
 *
 * @param event is the event that is triggered upon hitting
 *            the "comment at" button
 */
async function submitComment(
  event,
  courseId,
  videoId,
  authApi,
  videoProgressApi
) {
  event.preventDefault();

  let comment = event.target[0].value;

  if (comment.length === 0 || comment.trim().length === 0) return;

  const firestore = firebase.firestore();
  const commentsRef = firestore
    .collection("classes")
    .doc(courseId)
    .collection("videos")
    .doc(videoId)
    .collection("comments");

  await commentsRef.add({
    text: comment,
    username: authApi.user.email,
    time_posted: firebase.firestore.Timestamp.now(),
    video_id: videoId,
    course_id: courseId,
    video_time: videoProgressApi.progress.playedSeconds,
  });

  event.target[0].value = "";
}

/**
 * This component contains the comment submission form and the logic needed
 * to submit a comment to Firebase.
 *
 * @param props is an object that has the properties
 *    firebase - a reference to the firebase API
 *    videoId - the videoId of the current YouTube video
 *    seconds - the current number of seconds the video being played is at
 */
function CommentSubmissionForm(props) {
  const authApi = useContext(AuthContext);
  const videoProgressApi = useContext(VideoProgressContext);

  let seconds = videoProgressApi.progress.playedSeconds
    ? videoProgressApi.progress.playedSeconds
    : 0;
  let timestring = convertSecondsToTimestringFormat(seconds);

  return (
    <div className="CommentSubmissionForm">
      <form
        className="comment-submission-form"
        noValidate
        autoComplete="off"
        onSubmit={(event) =>
          submitComment(
            event,
            props.courseId,
            props.videoId,
            authApi,
            videoProgressApi
          )
        }
      >
        <span className="timestamp"> {timestring}</span>
        <input
          name="comment-field"
          className="comment-field"
          placeholder="write a comment..."
        />
        <input
          className="post-comment-button"
          type="submit"
          value={"comment"}
        />
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
