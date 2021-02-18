import firebase from "firebase/app";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";
import "firebase/auth";
import { useHistory } from "react-router-dom";

function CourseCarousel(props) {
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
  console.log(classData);
  console.log(videosData);
  const history = useHistory();

  if (!classData || !videosData) {
    return <div></div>;
  }

  return (
    <div>
      <div> d</div>
      <div>
        <Carousel
          breakPoints={breakPoints}
          style={{ backgroundColor: "white", height: "200px" }}
        >
          {videosData
            ? videosData.map((videoData) => (
                <div
                  onClick={() =>
                    history.push(
                      "/lecture/" + classData.courseId + "/" + videoData.videoId
                    )
                  }
                >
                  <ReactPlayer
                    width="100px"
                    height="100px"
                    url={videoData.url}
                    light={true}
                    style={{ padding: "20px" }}
                  ></ReactPlayer>
                  {videoData.title}
                </div>
              ))
            : []}
        </Carousel>
      </div>
      <div> d</div>
    </div>
  );
}

export default CourseCarousel;
