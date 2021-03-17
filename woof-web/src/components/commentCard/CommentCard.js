import LectureContext from "../../contexts/LectureContext";
import { useState, useContext } from "react";
import "./CommentCard.css";

/**
 * Code here inspired from https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript.
 *
 * Converts seconds to timestring format HH:MM:SS.
 *
 * @param totalSeconds
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
 * Displays a comment card, showing the most recent comment.
 * @param props an object that contains
 *          comments - a list of comments to display
 */
function CommentCard(props) {
  let [mostRecentComment, updateMostRecentComment] = useState(null);

  let lectureApi = useContext(LectureContext);

  //logic that determines the most recent card to display
  for (let i = props.comments.length - 1; i >= 0; --i) {
    //determine the most recent comment and update most recent comment to it
    if (
      !mostRecentComment ||
      (Math.floor(lectureApi.progress.playedSeconds) >=
        Math.floor(props.comments[i].video_time) &&
        props.comments[i].id !== mostRecentComment.id &&
        Math.floor(props.comments[i].video_time) !==
          Math.floor(mostRecentComment.video_time))
    ) {
      updateMostRecentComment(props.comments[i]);
      break;
    }

    //if we've encounterd the same comment, don't re render, simply break
    if (
      Math.floor(lectureApi.progress.playedSeconds) >=
        Math.floor(props.comments[i].video_time) &&
      props.comments[i].id === mostRecentComment.id
    ) {
      break;
    }
  }

  if (!mostRecentComment) {
    return <></>;
  }

  let timestring = convertSecondsToTimestringFormat(
    mostRecentComment.video_time
  );

  const scrollCommentIntoView = (comment) => {
    let commentElement = document.getElementById(comment.id);
    commentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="CommentCard"
      onClick={() => scrollCommentIntoView(mostRecentComment)}
    >
      <div className="comment-card-title-container">
        <div className="comment-card-title">
          <ion-icon name="star"></ion-icon> Current Comment
        </div>
        <div className="comment-card-timestamp-and-owner">
          <div className="comment-card-timestamp">{timestring}</div>
          <div className="comment-card-owner">{mostRecentComment.username}</div>
        </div>
      </div>

      <div className="comment-card-text">{mostRecentComment.text}</div>
    </div>
  );
}

export default CommentCard;
