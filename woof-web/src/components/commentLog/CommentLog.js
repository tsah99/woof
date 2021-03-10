import React from "react";
import Comment from "../comment/Comment.js";
import SearchBar from "../searchBar/searchBar.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./CommentLog.css";
import firebase from "firebase/app";
import CommentCard from "../commentCard/CommentCard.js";

/**
 * This component renders a list of comments to be displayed
 * on the web page for the current video.
 * @param props is an object that contains these properties
 *    videoId - id of the YouTube video for which we should get comments from
 *    courseId - id of the current course
 */
function CommentLog(props) {
  const firestore = firebase.firestore();
  const commentsRef = firestore
    .collection("classes")
    .doc(props.courseId)
    .collection("videos")
    .doc(props.videoId)
    .collection("comments");

  let [comments] = useCollectionData(commentsRef.orderBy("video_time", "asc"), {
    idField: "id",
  });

  if (!comments) {
    return <></>;
  }

  return (
    <div className="CommentLog">
      <CommentCard comments={comments} />
      <SearchBar courseId={props.courseId} videoId={props.videoId}></SearchBar>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentLog;
