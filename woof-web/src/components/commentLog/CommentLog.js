import React from "react";
import Comment from "../comment/Comment.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./CommentLog.css";

/**
 * This component renders a list of comments to be displayed
 * on the web page for the current video.
 * @param props is an object that contains these properties
 *    firebase - a handle on the Firebase API
 *    videoId - id of the YouTube video for which we should get comments from
 *    player - a handle on the player for the video being played
 */
function CommentLog(props) {
  const firestore = props.firebase.firestore();
  const commentsRef = firestore
    .collection("videos")
    .doc(props.videoId)
    .collection("comments");

  let [comments] = useCollectionData(
    commentsRef.orderBy("time_posted", "desc"),
    {
      idField: "id",
    }
  );
  return (
    <div className="CommentLog">
      {comments
        ? comments.map((comment) => (
            <Comment
              comment={comment}
              videoId={props.videoId}
              firebase={props.firebase}
              player={props.player}
            />
          ))
        : []}
    </div>
  );
}

export default CommentLog;
