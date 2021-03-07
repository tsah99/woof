import React from "react";
import ReactPlayer from "react-player";
import VideoProgressContext from "../../contexts/VideoProgressContext";
import { forwardRef, useContext } from "react";
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
const CourseVideo = forwardRef((props, ref) => {
  let videoProgressApi = useContext(VideoProgressContext);

  return (
    <div className="CourseVideo">
      <div
        onResize={() => console.log("hello")}
        className="player-wrapper"
        style={props.light ? {} : { position: "relative", paddingTop: "65vh" }}
      >
        <ReactPlayer
          className="react-player"
          style={
            props.light
              ? { margin: "auto" }
              : { position: "absolute", top: 0, left: 0 }
          }
          width={props.width ? props.width : "100%"}
          height={props.height ? props.height : "100%"}
          {...props}
          url={props.videoData.url}
          ref={ref}
          onProgress={(progress) => {
            videoProgressApi.setProgress(progress);
          }}
        />
      </div>
    </div>
  );
});

export default CourseVideo;
