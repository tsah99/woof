import React from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import "./CourseVideo.css";

function onProgress(progress, updateSeconds) {
  updateSeconds(progress.playedSeconds);
}

function CourseVideo(props) {
  const player = useRef(null);
  return (
    <div className="CourseVideo">
      <ReactPlayer
        controls
        url={props.url}
        ref={player}
        onProgress={(progress) => onProgress(progress, props.updateSeconds)}
      />
    </div>
  );
}

export default CourseVideo;
