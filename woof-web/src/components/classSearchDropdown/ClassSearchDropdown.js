import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Select from "react-dropdown-select";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

const MAX_CLASSES = 6;

function confirmAddClass(values, currUserRef, classId) {
  confirmAlert({
    title: "You are about to join a class",
    message: (
      <>
        Are you sure you want to{" "}
        <b>
          add
          {" " + values[0].label + " "}
        </b>
        to your list of classes?
      </>
    ),
    buttons: [
      {
        label: "Yes",
        onClick: () =>
          currUserRef.update({
            classes: firebase.firestore.FieldValue.arrayUnion(classId),
          }),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
}

function confirmEnrolledInTooManyClasses() {
  confirmAlert({
    title: "You fool, why are you doing this...",
    message: (
      <>
        For your own good, we will not let enroll in more than {MAX_CLASSES}{" "}
        classes.
      </>
    ),
    buttons: [
      {
        label: "Ok",
      },
    ],
  });
}

function confirmAlreadyEnrolledInClass(values) {
  confirmAlert({
    title: "You're already in this class.",
    message: <>You are already enrolled in {" " + values[0].label}.</>,
    buttons: [
      {
        label: "Ok",
      },
    ],
  });
}

function onSelect(values, currUserRef, currUserData) {
  let classId = values[0].classId;

  if (currUserData.classes.includes(classId)) {
    confirmAlreadyEnrolledInClass(values);
  } else if (currUserData.classes.length >= MAX_CLASSES) {
    confirmEnrolledInTooManyClasses();
  } else {
    confirmAddClass(values, currUserRef, classId);
  }
}

function ClassSearchDropdown() {
  let [selected, updateSelected] = useState([]);

  const classesRef = firebase
    .firestore()
    .collection("classes")
    .orderBy("course_code");

  const [classesData] = useCollectionData(classesRef, { idField: "id" });

  const authApi = useContext(AuthContext);
  const currUserRef = firebase
    .firestore()
    .collection("users")
    .doc(authApi.user.uid);

  const [currUserData] = useDocumentData(currUserRef);

  if (!classesData || !currUserData) {
    return <></>;
  }

  const courseOptions = classesData.map((course) => {
    return {
      label: course.course_code + " " + course.course_title,
      value: course.course_code,
      classId: course.id,
    };
  });

  return (
    <div style={{ backgroundColor: "white" }}>
      <Select
        key={selected}
        values={[]}
        onChange={(values) => {
          //a hack so that selection doesn't stay in search field once selected
          updateSelected(Math.random());
          onSelect(values, currUserRef, currUserData);
        }}
        placeholder="add a class..."
        options={courseOptions}
      />
    </div>
  );
}

export default ClassSearchDropdown;
