import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect } from "react";
import "./CourseVideo.css";

/**
 * This component houses the current video being displayed on
 * the web app.
 * @param props is an object that contains any properties that
 * ReactPlayer might take (see react-player documentation) and
 * it also contains
 *    videoData - information about the video to be played
 *    updatePlayer - [optional] a react hook from the parent component,
 *                   which updates the parent's player handle
 *
 */
function CourseVideo(props) {
  let player = useRef(null);
  useEffect(() => {
    if (props.updatePlayer) {
      props.updatePlayer(player);
    }
  });

  return (
    <div className="CourseVideo">
      <ReactPlayer
        style={{ margin: "auto" }}
        {...props}
        url={props.videoData.url}
        ref={player}
      />
      <div style={{ width: props.width }}>{props.videoData.title}</div>
    </div>
  );
}

export default CourseVideo;
