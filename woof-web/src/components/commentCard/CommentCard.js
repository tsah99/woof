import VideoProgressContext from "../../contexts/VideoProgressContext";
import { useState, useContext } from "react";
import "./CommentCard.css";

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

function CommentCard(props) {
  let [mostRecentComment, updateMostRecentComment] = useState(
    props.comments[0]
  );

  let videoProgressApi = useContext(VideoProgressContext);

  // for (let i = props.comments.length - 1; i >= 0; --i) {
  //   if (
  //     Math.floor(videoProgressApi.progress.playedSeconds) >=
  //       Math.floor(props.comments[i].video_time) &&
  //     props.comments[i].id !== mostRecentComment.id &&
  //     Math.floor(props.comments[i].video_time) !==
  //       Math.floor(mostRecentComment.video_time)
  //   ) {
  //     console.log(props.comments[i]);
  //     updateMostRecentComment(props.comments[i]);
  //     break;
  //   }

  //   if (
  //     Math.floor(videoProgressApi.progress.playedSeconds) >=
  //       Math.floor(props.comments[i].video_time) &&
  //     props.comments[i].id === mostRecentComment.id
  //   ) {
  //     break;
  //   }
  // }

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
      <div className="comment-card-timestamp-and-owner">
        <div className="comment-card-timestamp">{timestring}</div>
        <div className="comment-card-owner">{mostRecentComment.username}</div>
      </div>
      <div className="comment-card-text">{mostRecentComment.text}</div>
    </div>
  );
}

export default CommentCard;
