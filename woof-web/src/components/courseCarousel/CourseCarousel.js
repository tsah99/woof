import firebase from "firebase/app";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import Carousel from "react-elastic-carousel";
import "firebase/auth";
import CourseVideo from "../courseVideo/CourseVideo";
import { useHistory } from "react-router-dom";
import "./CourseCarousel.css";

/**
 * Displays all lecture videos for a particular course in
 * a nice Carousel format.
 * @param props is an object that has the properties
 *    courseId - the id of the course
 *
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
    .orderBy("time_uploaded", "asc");

  const [classData] = useDocumentData(classRef, { idField: "courseId" });
  const [videosData] = useCollectionData(videosRef, { idField: "videoId" });

  const history = useHistory();

  if (!classData || !videosData) {
    return <div></div>;
  }

  return (
    <div className="CourseCarousel">
      {classData.course_code + " " + classData.course_title}
      <Carousel
        breakPoints={breakPoints}
        style={{ height: "200px", textAlign: "center" }}
      >
        {videosData
          ? videosData.map((videoData) => (
              <div
                style={{ textAlign: "center" }}
                onClick={() =>
                  history.push(
                    "/lecture/" + classData.courseId + "/" + videoData.videoId
                  )
                }
              >
                <CourseVideo
                  width="150px"
                  height="150px"
                  light={true}
                  videoData={videoData}
                ></CourseVideo>
              </div>
            ))
          : []}
      </Carousel>
    </div>
  );
}

export default CourseCarousel;
