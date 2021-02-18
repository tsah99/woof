import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect } from "react";
import "./CourseVideo.css";

/**
 * This component houses the current video being displayed on
 * the web app.
 * @param props is an object with the properties
 *    videoId - the id of the video being played
 *    updatePlayer - a react hook from the parent component, which
 *                    updates the parent's player handle
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
      {props.videoData.title}
    </div>
  );
}

export default CourseVideo;
