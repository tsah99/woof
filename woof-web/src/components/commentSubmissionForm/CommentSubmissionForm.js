import React from "react";
import "./CommentSubmissionForm.css";

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
 * @param firebase is a handle on the Firebase API
 */
async function submitComment(event, videoId, firebase) {
  event.preventDefault();

  let comment = event.target[0].value;

  if (comment.length === 0) return;

  const firestore = firebase.firestore();
  const commentsRef = firestore
    .collection("videos")
    .doc(videoId)
    .collection("comments");

  await commentsRef.add({
    text: comment,
    username: "sam",
    time_posted: firebase.firestore.Timestamp.now(),
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
  return (
    <div className="CommentSubmissionForm">
      <form
        className="comment-submission-form"
        noValidate
        autoComplete="off"
        onSubmit={(event) =>
          submitComment(event, props.videoId, props.firebase)
        }
      >
        <input className="comment-field" placeholder="write a comment..." />
        <input className="post-comment-button" type="submit" value="comment" />
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
