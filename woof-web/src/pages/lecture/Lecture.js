import React, { useState } from "react";
import CourseVideo from "../../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../../components/commentLog/CommentLog.js";
import ReactionBar from "../../components/reactionBar/ReactionBar.js";
import firebase from "firebase/app";
import "./Lecture.css";
/**
 * Given a YouTube URL, returns the video id. For example, given
 * the id "https://www.youtube.com/watch?v=KSeVfHphNlQ", this
 * function returns "KSeVfHphNlQ".
 *
 * Note: Function is taken from
 * https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url.
 *
 * @param url is the YouTube url
 */
function getVideoId(url) {
  let video_id = url.split("v=")[1];
  let ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }

  return video_id;
}

/**
 * This component houses the lecture watching page of our app.
 *
 * It maintains the state
 *  seconds - the current number of seconds the video has played
 */
function Lecture({ props }) {
  let [seconds, updateSeconds] = useState(0);
  let [youtubeURL, updateYoutubeURL] = useState(
    "https://www.youtube.com/watch?v=bfyI9yl3qfE&t=312s"
  );
  let videoId = getVideoId(youtubeURL);

  return (
    <div className="Lecture">
      <CourseVideo updateSeconds={updateSeconds} url={youtubeURL} />
      <ReactionBar />
      <CommentSubmissionForm
        firebase={firebase}
        videoId={videoId}
        seconds={seconds}
      />
      <CommentLog firebase={firebase} videoId={videoId} />
    </div>
  );
}

export default Lecture;
