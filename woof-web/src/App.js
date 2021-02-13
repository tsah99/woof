import CourseVideo from "./components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "./components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "./components/commentLog/CommentLog.js";
import ReactionBar from "./components/reactionBar/ReactionBar.js";
import LiveChatMessageForm from "./components/liveChatMessageForm/LiveChatMessageForm.js";
import LiveChat from "./components/liveChat/LiveChat.js";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";
import { useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import "./App.css";

function App() {
  let [seconds, updateSeconds] = useState(0);
  return (
    <div className="App">
      <div className="row">
        <div>
          <CourseVideo
            updateSeconds={updateSeconds}
            url="https://www.youtube.com/watch?v=KSeVfHphNlQ"
          />
          <ReactionBar />
          <CommentSubmissionForm firebase={firebase} seconds={seconds} />
          <CommentLog firebase={firebase} />
        </div>
        <div className="liveChat">
          <p className="liveChatTitle"> Live Chat </p>
          <LiveChatMessageForm firebase={firebase} />
          <LiveChat firebase={firebase} />
        </div>
      </div>
      <Routes />
    </div>
  );
}

export default withRouter(App);
