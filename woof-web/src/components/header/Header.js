import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import { clearConfigCache } from "prettier";

/**
 * Non auth header
 *
 * only shown when there is no user logged in
 */
function NonAuthHeader() {
  const systemApi = useContext(SystemContext);

  const history = useHistory();
  function logIn() {
    history.push("/signin");
  }

  function goHome() {
    history.push("/");
  }

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="home" onClick={goHome}>
        HOME
      </div>
      <div className="symbols">123450124254112345012425411234501242541</div>
      <div className="sign-in-out" onClick={logIn}>
        SIGN IN
      </div>
      <div
        className="symbols-lightdark-nonauth"
        onClick={() => systemApi.setDarkMode(!systemApi.darkMode)}
      >
        {systemApi.darkMode ? "K" : "X"}
      </div>
    </div>
  );
}

/**
 * Auth Header
 *
 * only shown when a user is logged in
 */
function AuthHeader() {
  const authApi = useContext(AuthContext);
  const systemApi = useContext(SystemContext);
  const history = useHistory();
  const [displayNotifications, toggleDisplayNotifications] = useState(false);
  const [notificationsList, setNotifications] = useState("");

  function logOut() {
    firebase.auth().signOut();
    authApi.setUser();
    history.push("/signin");
  }

  function goHome() {
    history.push("/");
  }

  function goLectureDashboard() {
    history.push("/lectureDashboard");
  }

  // This function returns an Array of firestore notification documents
  async function getNotifications(authApi) {
    const firestore = firebase.firestore();
    const notificationsRef = firestore
      .collection("users")
      .doc(authApi.user.uid)
      .collection("notifications");
    const notificationsData = await notificationsRef.get();
    let notificationMessages = [];
    notificationsData.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      notificationMessages.push(doc.data());
    });
    return notificationMessages;
  }

  function formatNotifications(usersNotifications) {
    console.log("Showing notifications: ", usersNotifications);
    let notificationsFormatted = [];
    for (const i in usersNotifications) {
      const n = usersNotifications[i];
      const [
        notifMessage,
        notifUserID,
        notifTime,
        notifCourseID,
        notifVideoID,
      ] = [
        n.comment_reply,
        n.comment_reply_uid,
        n.time_replied,
        n.courseId,
        n.videoId,
      ];
      console.log(`Notification user ID: ${notifUserID}`);
      console.log(`Notification message: ${notifMessage}`);
      notificationsFormatted.push(
        `User ${notifUserID} replied: ${notifMessage} at ${notifTime} in Course ${notifCourseID}, Video ${notifVideoID}.`
      );
    }
    return notificationsFormatted;
  }

  console.log("Dispaly Notifications boolean: ", displayNotifications);

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="left-side">
        <div className="home" onClick={goHome}>
          HOME
        </div>
        <div className="home" onClick={goLectureDashboard}>
          DASHBOARD
        </div>
      </div>
      <div className="right-side">
        <div
          className="symbols-auth notifications-icon"
          onClick={() => {
            toggleDisplayNotifications(!displayNotifications);
            getNotifications(authApi).then((result) => {
              setNotifications(result);
            });
          }}
        >
          T
        </div>
        <div>
          {displayNotifications
            ? JSON.stringify(formatNotifications(notificationsList))
            : "not showing notifications..."}
        </div>
        <div className="sign-in-out" onClick={logOut}>
          LOG OUT
        </div>
        <div
          className="symbols-lightdark-auth"
          onClick={() => systemApi.setDarkMode(!systemApi.darkMode)}
        >
          {systemApi.darkMode ? "K" : "X"}
        </div>
      </div>
    </div>
  );
}

/**
 * Global header for Woof
 */
function Header() {
  const authApi = useContext(AuthContext);

  return authApi.user ? <AuthHeader /> : <NonAuthHeader />;
}

export default Header;
