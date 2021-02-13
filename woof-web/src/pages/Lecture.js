import React, { useState } from "react";
import CourseVideo from "../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../components/commentLog/CommentLog.js";
import ReactionBar from "../components/reactionBar/ReactionBar.js";
import firebase from "firebase/app";

/**
 * This component houses our entire app.
 *
 * It maintains the state
 *  seconds - the current number of seconds the video has played
 */
function Lecture({ props }) {
  const [seconds, updateSeconds] = useState(0);

  return (
    <>
      <CourseVideo
        updateSeconds={updateSeconds}
        url="https://www.youtube.com/watch?v=KSeVfHphNlQ"
      />
      <ReactionBar />
      <CommentSubmissionForm firebase={firebase} seconds={seconds} />
      <CommentLog firebase={firebase} />
    </>
  );
}

export default Lecture;
