import React from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import "./CourseVideo.css";

/**
 * This component houses the current video being displayed on
 * the web app.
 * @param props is an object with the properties
 *    url - a string that is the link to a youtube video
 *    updateSeconds - a react hook from the parent component, which
 *                    updates the parent's current playedSeconds
 *                    state
 */
function CourseVideo(props) {
  const player = useRef(null);
  return (
    <div className="CourseVideo">
      <ReactPlayer
        controls
        url={props.url}
        ref={player}
        onProgress={(progress) => props.updateSeconds(progress.playedSeconds)}
      />
    </div>
  );
}

export default CourseVideo;
