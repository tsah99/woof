import React, { useState } from "react";
import CourseVideo from "../../components/courseVideo/CourseVideo.js";
import CommentSubmissionForm from "../../components/commentSubmissionForm/CommentSubmissionForm.js";
import CommentLog from "../../components/commentLog/CommentLog.js";
import ReactionBar from "../../components/reactionBar/ReactionBar.js";
import LiveChatMessageForm from "../../components/liveChatMessageForm/LiveChatMessageForm.js";
import LiveChat from "../../components/liveChat/LiveChat.js";
import firebase from "firebase/app";
import { useRef } from "react";

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
 *  youtubeURL - the url of the video being played
 *  player - a handle on the player for the video being played
 */
function Lecture({ props }) {
  let [youtubeURL, updateYoutubeURL] = useState(
    "https://www.youtube.com/watch?v=bfyI9yl3qfE&t=312s"
  );
  let [player, updatePlayer] = useState(null);
  let videoId = getVideoId(youtubeURL);

  return (
    <div className="Lecture">
      <div className="row">
        <div className="video">
          <CourseVideo updatePlayer={updatePlayer} url={youtubeURL} />
          <ReactionBar />
        </div>
        <div>
          <div className="commentLog">
            <p className="commentLogTitle"> Comment Log </p>
            <CommentLog firebase={firebase} videoId={videoId} player={player} />
            <CommentSubmissionForm firebase={firebase} videoId={videoId} />
          </div>
          <div className="liveChat">
            <p className="liveChatTitle"> Live Chat </p>
            <LiveChat firebase={firebase} videoId={videoId} player={player} />
            <LiveChatMessageForm firebase={firebase} videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
