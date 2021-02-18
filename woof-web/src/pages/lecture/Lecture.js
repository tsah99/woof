import React, { useState } from "react";
import CourseVideo from "../../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../../components/commentLog/CommentLog.js";
import ReactionBar from "../../components/reactionBar/ReactionBar.js";
import LiveChatMessageForm from "../../components/liveChatMessageForm/LiveChatMessageForm.js";
import LiveChat from "../../components/liveChat/LiveChat.js";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

import "./Lecture.css";

/**
 * This component houses the lecture watching page of our app.
 *
 * It maintains the state
 *  youtubeURL - the url of the video being played
 *  player - a handle on the player for the video being played
 */
function Lecture({ props }) {
  let [player, updatePlayer] = useState(null);

  let { courseId, videoId } = useParams();

  const videoRef = firebase
    .firestore()
    .collection("classes")
    .doc(courseId)
    .collection("videos")
    .doc(videoId);

  const [videoData] = useDocumentData(videoRef);

  if (!videoData) {
    return <div> </div>;
  }
  return (
    <div className="Lecture">
      <div className="row">
        <div className="video">
          <CourseVideo updatePlayer={updatePlayer} url={videoData.url} />
          <ReactionBar />
        </div>
        <div>
          <div className="commentLog">
            <p className="commentLogTitle"> Comment Log </p>
            <CommentLog courseId={courseId} videoId={videoId} player={player} />
            <CommentSubmissionForm courseId={courseId} videoId={videoId} />
          </div>
          <div className="liveChat">
            <p className="liveChatTitle"> Live Chat </p>
            <LiveChat courseId={courseId} videoId={videoId} player={player} />
            <LiveChatMessageForm courseId={courseId} videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
