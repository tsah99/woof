import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CourseCarousel from "../../components/courseCarousel/CourseCarousel";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";

import "firebase/auth";

/**
 * This component will display all lecture videos that a
 * student has access to.
 */
function LectureDashboard() {
  const authApi = useContext(AuthContext);

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc(authApi.user.uid);

  const [userData] = useDocumentData(userRef);

  if (!userData) {
    return <div></div>;
  }

  return (
    <div className="LectureDashboard">
      {userData.classes.map((courseId) => (
        <CourseCarousel courseId={courseId}></CourseCarousel>
      ))}
    </div>
  );
}

export default LectureDashboard;
