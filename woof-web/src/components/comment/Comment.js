import React from "react";
import { Grid } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./Comment.css";

function timeSince(seconds) {
  var secondsSince = Math.floor((new Date() - new Date(seconds * 1000)) / 1000);

  var interval = secondsSince / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = secondsSince / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = secondsSince / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = secondsSince / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = secondsSince / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(secondsSince) + " seconds ago";
}

/**
 * Converts seconds into the format "HH:MM:SS" and returns it.
 * @param seconds
 */
function convertSecondsToTimestringFormat(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function renderComment(comment) {
  return (
    <Grid justifyContent="left" item xs zeroMinWidth>
      <h4 className="comment-owner">{comment.username}</h4>
      <p className="comment-text">{comment.text}</p>
      <p className="time-posted">{timeSince(comment.time_posted.seconds)}</p>
    </Grid>
  );
}

async function submitSubComment(event, commentId, videoId, firebase) {
  event.preventDefault();

  let comment = event.target[0].value;

  if (comment.length === 0) return;

  const firestore = firebase.firestore();
  const subCommentsRef = firestore
    .collection("videos")
    .doc(videoId)
    .collection("comments")
    .doc(commentId)
    .collection("subComments");

  await subCommentsRef.add({
    text: comment,
    username: "brian",
    time_posted: firebase.firestore.Timestamp.now(),
  });

  event.target[0].value = "";
}

/**
 * This component renders a single comment and should be used as a
 * child component to CommentLog.
 * @param props is an object that contains these properties
 *    comment - an object that contains these properties
 *       username - a string containing the comment owner's username
 *       text - a string containing the comment's text
 */
function Comment(props) {
  const firestore = props.firebase.firestore();
  const subCommentsRef = firestore
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

  return (
    <div className="Comment">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="comment-owner">{props.comment.username}</h4>
          <p className="comment-text">{props.comment.text}</p>
          <p className="time-posted">
            {timeSince(props.comment.time_posted.seconds)}
          </p>
          <div className="SubComments">
            {subComments
              ? subComments.map((subComment) => renderComment(subComment))
              : []}
            <form
              className="subcomment-submission-form"
              noValidate
              autoComplete="off"
              onSubmit={(event) =>
                submitSubComment(
                  event,
                  props.comment.id,
                  props.videoId,
                  props.firebase
                )
              }
            >
              <input className="subcomment-field" placeholder="reply..." />
            </form>
          </div>
        </Grid>
        <Grid
          onClick={() =>
            props.player.current.seekTo(props.comment.video_timestamp_in_secs)
          }
          className="video_timestamp"
          justifyContent="left"
          item
          xs
          zeroMinWidth
        >
          {convertSecondsToTimestringFormat(
            props.comment.video_timestamp_in_secs
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Comment;
