import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CourseCarousel from "../../components/courseCarousel/CourseCarousel";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import "firebase/auth";

function LectureDashboard(props) {
  const authApi = useContext(AuthContext);
  //   console.log(authApi.user);
  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(authApi.user.uid);

  const [userData] = useDocumentData(userRef);

  console.log(userData);
  //     .collection("videos")
  //     .doc(props.videoId)
  //     .collection("liveChat");
  return (
    <div>
      {userData
        ? userData.classes.map((courseId) => (
            <CourseCarousel courseId={courseId}></CourseCarousel>
          ))
        : []}
    </div>
  );
}

export default LectureDashboard;
