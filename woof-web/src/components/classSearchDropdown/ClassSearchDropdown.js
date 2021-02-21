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
import "./ClassSearchDropdown.css";

//maximum number of classes that can be joined
//TODO: we should eventually limit the number of classes
//      via the backend.
const MAX_CLASSES = 6;

/**
 * Generates a confirmation dialogue box to ask the user if they
 * really want to add a class.
 *
 * @param value is the value that was selected via the dropdown
 * @param currUserRef a firestore reference to the current user which
 *                    is used to update the user's list of classes on
 *                    firestore
 * @param classId is the id of the class to be added
 */
function confirmAddClass(value, currUserRef, classId) {
  confirmAlert({
    title: "You are about to join a class",
    message: (
      <>
        Are you sure you want to{" "}
        <b>
          add
          {" " + value.label + " "}
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

/**
 * Generates a confirmation dialogue box telling the user that they're
 * enrolled in too many classes.
 */
function confirmEnrolledInTooManyClasses() {
  confirmAlert({
    title: "But like, why though?",
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

/**
 * Generates a confirmation dialogue box that tells the user they're already
 * enrolled in a class.
 * @param value
 */
function confirmAlreadyEnrolledInClass(value) {
  confirmAlert({
    title: "You're already in this class.",
    message: <>You are already enrolled in {" " + value.label}.</>,
    buttons: [
      {
        label: "Ok",
      },
    ],
  });
}

/**
 * Handler for when the user selects a class to add.
 *
 * @param value is the value selected via the dropdownn
 * @param currUserRef is a firestore reference to the current user
 * @param currUserData is an object containing the current user's data
 */
function onSelect(value, currUserRef, currUserData) {
  let classId = value.classId;

  if (currUserData.classes.includes(classId)) {
    confirmAlreadyEnrolledInClass(value);
  } else if (currUserData.classes.length >= MAX_CLASSES) {
    confirmEnrolledInTooManyClasses();
  } else {
    confirmAddClass(value, currUserRef, classId);
  }
}

/**
 * This component displays a dropdown search for students to search for
 * and add classes.
 *
 * TODO: Ideally, search should be done via the backend. We should NOT be
 *       downloading the entire list of classes and then doing search from
 *       the frontend as we are now. For now, this is ok since our list of
 *       classes is small.
 *
 * It maintains the state
 *    selected - acts as a key to the Select component, which is updated
 *               to a random value every time a user selects a class.
 *               this is a hack so the Select component rerenders with
 *               an empty selection input after selection.
 */
function ClassSearchDropdown() {
  let [selected, updateSelected] = useState();

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
    <div>
      <Select
        key={selected}
        values={[]}
        onChange={(values) => {
          //a hack so that selection doesn't stay in search field once selected
          updateSelected(Math.random());
          //values is always length 1 b/c values is always reset to [] after
          //selection
          onSelect(values[0], currUserRef, currUserData);
        }}
        placeholder="add a class..."
        options={courseOptions}
      />
    </div>
  );
}

export default ClassSearchDropdown;
