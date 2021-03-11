import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect, useContext } from "react";
import "./CourseVideo.css";
import LectureContext from "../../contexts/LectureContext";

/**
 * This component houses the current video being displayed on
 * the web app.
 *
 * Note: A lot of styling is done inside this component instead of in a
 * CSS file because we need to implement logic that differentiates what
 * style should be imposed when this component is being used to watch the
 * lecture video or just being used as a thumbnail.
 *
 * @param props is an object that contains any properties that
 * ReactPlayer might take (see react-player documentation) and
 * it also contains
 *    videoData - information about the video to be played
 *
 */
function CourseVideo(props) {
  const lectureApi = useContext(LectureContext);
  let playerRef = useRef(null);

  useEffect(() => {
    //don't set the lectureApi unless the controls are displayed
    if (props.controls) lectureApi.setCurrentRef(playerRef);
  });

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
          ref={playerRef}
          onProgress={(progress) => {
            lectureApi.setProgress(progress);
          }}
        />
      </div>
    </div>
  );
}

export default CourseVideo;
