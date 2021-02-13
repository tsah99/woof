import React from "react";
import ReactPlayer from "react-player";
import { useRef } from "react";
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
  let player = useRef(null);

  props.updatePlayer(player);
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
