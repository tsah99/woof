import firebase from "firebase/app";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import Carousel from "react-elastic-carousel";
import "firebase/auth";
import CourseVideo from "../courseVideo/CourseVideo";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./CourseCarousel.css";

/**
 * Handler that removes a person's class.
 *
 * @param classData is an object that contains information about
 *                  the class being removed. See usage in function.
 * @param authApi is a handle on the auth api which contains info
 *                about the logged in user
 */
function removeClass(classData, authApi) {
  const currUserRef = firebase
    .firestore()
    .collection("users")
    .doc(authApi.user.uid);

  confirmAlert({
    title: "You are about to leave a class",
    message: (
      <>
        Are you sure you want to{" "}
        <b>
          {" "}
          remove
          {" " + classData.course_code + " " + classData.course_title}
        </b>{" "}
        from your list of classes?
      </>
    ),
    buttons: [
      {
        label: "Yes",
        onClick: () =>
          currUserRef.update({
            classes: firebase.firestore.FieldValue.arrayRemove(
              classData.courseId
            ),
          }),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
}

/**
 * Displays all lecture videos for a particular course in
 * a nice Carousel format.
 * @param props is an object that has the properties
 *    courseId - the id of the course
 */
function CourseCarousel(props) {
  // used to dynamically control how many lectures should be
  // displayed in the carousel when window resized.
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 760, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const classRef = firebase
    .firestore()
    .collection("classes")
    .doc(props.courseId);

  const videosRef = classRef
    .collection("videos")
    .orderBy("time_uploaded", "desc");

  const [classData] = useDocumentData(classRef, { idField: "courseId" });
  const [videosData] = useCollectionData(videosRef, { idField: "videoId" });

  const history = useHistory();

  const authApi = useContext(AuthContext);

  if (!classData || !videosData) {
    return <div></div>;
  }

  return (
    <div className="CourseCarousel">
      <div className="row">
        <span>{classData.course_code + " " + classData.course_title}</span>
        <span
          className="remove-class-button"
          onClick={() => removeClass(classData, authApi)}
        >
          X
        </span>
      </div>

      <Carousel
        breakPoints={breakPoints}
        style={{ height: "200px", textAlign: "center" }}
      >
        {videosData.map((videoData) => (
          <div
            style={{ textAlign: "center" }}
            onClick={() =>
              history.push(
                "/lecture/" + classData.courseId + "/" + videoData.videoId
              )
            }
          >
            <CourseVideo
              width="250px"
              height="125px"
              light={true}
              videoData={videoData}
            ></CourseVideo>
            <div className="video-title">{videoData.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CourseCarousel;
