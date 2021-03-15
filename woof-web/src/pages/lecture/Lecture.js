import React, { useState, useContext, useEffect } from "react";
import CourseVideo from "../../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../../components/commentLog/CommentLog.js";
import LiveChatMessageForm from "../../components/liveChatMessageForm/LiveChatMessageForm.js";
import LiveChat from "../../components/liveChat/LiveChat.js";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Gathering from "./Gathering.js";
import "firebase/database";
import { LectureProvider } from "../../contexts/LectureContext";
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
// toggle for livecchat
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}

function Lecture({ props }) {
  const [isOn, toggleIsOn] = useToggle();

  let playerRef = React.createRef();
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
    return <></>;
  }

  return (
    <LectureProvider>
      <div className="Lecture">
        <CourseVideo
          controls={true}
          //updatePlayer={updatePlayer}
          videoData={videoData}
        />
        <CommentSubmissionForm courseId={courseId} videoId={videoId} />
        <CommentLog
          courseId={courseId}
          videoId={videoId}
          playerRef={playerRef}
        />

        <div className="liveChat">
          <div className="liveChatTitleContainer">
            <p className="liveChatTitle"> Live Chat ({userCount})</p>
            <button className="livechatToggle" onClick={toggleIsOn}>
              {isOn ? (
                <ion-icon name="close-outline" size="large"></ion-icon>
              ) : (
                <ion-icon name="caret-up" size="large"></ion-icon>
              )}
            </button>
          </div>

          {isOn ? (
            <React.Fragment>
              <LiveChat
                courseId={courseId}
                videoId={videoId}
                playerRef={playerRef}
              />
              <LiveChatMessageForm courseId={courseId} videoId={videoId} />
            </React.Fragment>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </LectureProvider>
  );
}

export default Lecture;
