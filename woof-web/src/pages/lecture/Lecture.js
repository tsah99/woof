import React, { useState, useContext, useEffect } from "react";
import CourseVideo from "../../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../../components/commentLog/CommentLog.js";
import ReactionBar from "../../components/reactionBar/ReactionBar.js";
import LiveChatMessageForm from "../../components/liveChatMessageForm/LiveChatMessageForm.js";
import LiveChat from "../../components/liveChat/LiveChat.js";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Gathering from "./Gathering.js";
import "firebase/database";
import "./Lecture.css";
import AuthContext from "../../contexts/AuthContext";
/*
var OnlineCount = require("react-count").OnlineCount;
*/

/**
 * This component houses the lecture watching page of our app.
 *
 * Note, this component grabs a courseId and videoId from the
 * url parameters. Hence, this component only works when
 * the url is of the format /lecture/:courseId/:videoId
 *
 * It maintains the state
 *  player - a handle on the player for the video being played
 */

function Lecture({ props }) {
  let [player, updatePlayer] = useState(null);

  let { courseId, videoId } = useParams();

  let [userCount, updateUserCount] = useState(0);
  let [gathering, updateGathering] = useState(
    new Gathering(firebase.database(), videoId)
  );
  const videoRef = firebase
    .firestore()
    .collection("classes")
    .doc(courseId)
    .collection("videos")
    .doc(videoId);

  const [videoData] = useDocumentData(videoRef);
  let authApi = useContext(AuthContext);
  gathering.join(authApi.user.uid);
  gathering.onUpdated((count, users) => {
    if (count !== userCount) {
      console.log(count, userCount);
      console.log(users);
      updateUserCount(count);
    }
  });
  useEffect(() => {
    return () => {
      gathering.leave();
    };
  }, []);
  // check if data exists before rendering
  if (!videoData) {
    return <div> </div>;
  }

  return (
    <div className="Lecture">
      <div className="row">
        <div className="video">
          <CourseVideo
            controls={true}
            updatePlayer={updatePlayer}
            videoData={videoData}
          />
          <ReactionBar />
        </div>
        <div className="commentLogAndLiveChat">
          <div className="commentLog">
            <p className="commentLogTitle"> Comment Log </p>
            <CommentLog courseId={courseId} videoId={videoId} player={player} />
            <CommentSubmissionForm courseId={courseId} videoId={videoId} />
          </div>
          <div className="liveChat">
            <p className="liveChatTitle"> Live Chat ({userCount})</p>
            <LiveChat courseId={courseId} videoId={videoId} player={player} />
            <LiveChatMessageForm courseId={courseId} videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
