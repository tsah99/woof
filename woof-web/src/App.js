import { useState } from "react";
import CourseVideo from "./components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "./components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "./components/commentLog/CommentLog.js";
import "./App.css";

let testComments = [
  {
    owner: "tsah",
    text: "This video is super helpful",
    time_posted: "posted 1 min ago",
  },
  {
    owner: "brian",
    text: "what is the machine learning",
    time_posted: "posted 5 min ago",
  },
  {
    owner: "sam",
    text: "dogecoin pull out now",
    time_posted: "posted 1 hr ago",
  },
];

function App() {
  let [seconds, updateSeconds] = useState(0);
  return (
    <div className="App">
      <CourseVideo
        updateSeconds={updateSeconds}
        url="https://www.youtube.com/watch?v=KSeVfHphNlQ"
      />
      <CommentSubmissionForm seconds={seconds} />
      <CommentLog comments={testComments} />
    </div>
  );
}

export default App;
