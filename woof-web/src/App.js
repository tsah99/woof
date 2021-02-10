import { useState } from "react";
import CourseVideo from "./components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "./components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "./components/commentLog/CommentLog.js";
import ReactionBar from "./components/reactionBar/ReactionBar.js";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";
import "firebase/firestore";
import "firebase/auth";
import "./App.css";

firebase.initializeApp(firebaseConfig);

function App() {
  let [seconds, updateSeconds] = useState(0);
  return (
    <div className="App">
      <CourseVideo
        updateSeconds={updateSeconds}
        url="https://www.youtube.com/watch?v=KSeVfHphNlQ"
      />
      <ReactionBar />
      <CommentSubmissionForm firebase={firebase} seconds={seconds} />
      <CommentLog firebase={firebase} />
    </div>
  );
}

export default App;