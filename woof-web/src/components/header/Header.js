import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import Notifications from "../notifications/Notifications.js";
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

  function goAbout() {
    history.push("/about");
  }

  function goLanding() {
    history.push("/");
  }

  return (
    <div className="header">
      <div className="logo" onClick={goLanding}>
        WOOF
      </div>
      <div className="home" onClick={goAbout}>
        ABOUT
      </div>
      <div className="symbols">123450124254112345012425411234501242541</div>
      <div className="sign-in-out" onClick={logIn}>
        SIGN IN / UP
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
  const [notificationsList, setNotificationsList] = useState([]);
  const [individualNotifications, setIndividualNotifications] = useState([]);

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

  // This function populates notificationsList asynchronously, where each
  // list item is a dictionary with keys [replyingUser, courseInfo, videoInfo]
  async function getNotifications(authApi) {
    setNotificationsList([]);
    const firestore = firebase.firestore();
    const notificationsRef = firestore
      .collection("users")
      .doc(authApi.user.uid)
      .collection("notifications");
    const notificationsData = await notificationsRef.get();

    let notificationsListData = [];
    notificationsData.forEach(async function (doc) {
      let notificationInfo = await doc.data();

      const userRef = firestore
        .collection("users")
        .doc(notificationInfo.comment_reply_uid);
      const courseRef = firestore
        .collection("classes")
        .doc(notificationInfo.courseId);
      const videoRef = firestore
        .collection("classes")
        .doc(notificationInfo.courseId)
        .collection("videos")
        .doc(notificationInfo.videoId);

      const replyingUser = await (await userRef.get()).data();
      // console.log("Replying user: ", replyingUser);
      const courseInfo = await (await courseRef.get()).data();
      // console.log("Course info: ", courseInfo);
      const videoInfo = await (await videoRef.get()).data();
      // console.log("Video info: ", videoInfo);

      const username = await replyingUser.username;
      const courseName = `${await courseInfo.course_code} ${await courseInfo.course_title}`;
      const videoName = await videoInfo.title;

      // setNotificationsList(
      //   notificationsList.concat([
      //     {
      //       replyingUser: username,
      //       courseName: courseName,
      //       videoName: videoName,
      //       commentReply: notificationInfo.comment_reply,
      //       time_replied: notificationInfo.time_replied,
      //     },
      //   ])
      // );
      notificationsListData.push({
        replyingUser: username,
        courseName: courseName,
        videoName: videoName,
        commentReply: notificationInfo.comment_reply,
        time_replied: notificationInfo.time_replied,
      });
    });
    // const firestore = firebase.firestore();
    // const notificationsRef = firestore
    //   .collection("users")
    //   .doc(authApi.user.uid)
    //   .collection("notifications");
    // const notificationsData = await notificationsRef.get();
    // let notificationMessages = [];
    // console.log(notificationsData);
    // notificationsData.forEach((doc) => {
    //   notificationMessages.push(doc.data());
    // });

    return notificationsListData;
  }

  // function formatNotifications(usersNotifications) {
  //   console.log("Showing notifications: ", usersNotifications);
  //   let notificationsFormatted = [];
  //   let notifications = [];
  //   for (const i in usersNotifications) {
  //     const n = usersNotifications[i];
  //     const [
  //       notifMessage,
  //       notifUserID,
  //       notifTime,
  //       notifCourseID,
  //       notifVideoID,
  //     ] = [
  //       n.comment_reply,
  //       n.comment_reply_uid,
  //       n.time_replied,
  //       n.courseId,
  //       n.videoId,
  //     ];
  //     // console.log(`Notification user ID: ${notifUserID}`);
  //     // console.log(`Notification message: ${notifMessage}`);
  //     notifications.push(n);
  //     notificationsFormatted.push(
  //       `User ${notifUserID} replied: ${notifMessage} at ${notifTime} in Course ${notifCourseID}, Video ${notifVideoID}.`
  //     );
  //   }
  //   // return notificationsFormatted;
  //   return notifications;
  // }

  // function buildNotification(n) {
  //   const firestore = firebase.firestore();
  //   const usersRef = firestore.collection("users").doc(n.comment_reply_uid);
  //   usersRef.get().then((reply_user) => {
  //     return <div>WOO</div>;
  //   });
  // const subCommentsRef = firestore
  //   .collection("classes")
  //   .doc(n.course_id)
  //   .collection("videos")
  //   .doc(n.video_id)
  //   .collection("comments");
  // return <div></div>;
  // }

  async function formatNotificationsMenu(userNotifications) {
    console.log(userNotifications);
    const firestore = firebase.firestore();
    for (let n in userNotifications) {
      const userRef = firestore.collection("users").doc(n.comment_reply_uid);
      const courseRef = firestore.collection("classes").doc(n.courseId);
      const videoRef = firestore
        .collection("classes")
        .doc(n.courseId)
        .collection("videos")
        .doc(n.videoId);

      const notifUser = await userRef.get();
      const courseInfo = await courseRef.get();
      const videoInfo = await videoRef.get();

      const notifUsername = await notifUser.username;
      const courseName = await courseInfo.course_title;
      const videoName = await videoInfo.title;

      console.log(notifUsername, courseName, videoName);
      setIndividualNotifications(
        individualNotifications.concat(
          `${notifUsername} replied to your comment in ${courseName}: ${videoName} at ${n.time_replied}...`
        )
      );
      // console.log(individualNotifications);
    }
    // userNotifications.map((n, idx) => {
    //   // Need to somehow store the subcomment id in the notification for a unique key identifier
    //   <div key={idx} className="notifications-list">
    //     {buildNotification(n)}
    //     {JSON.stringify(n)}
    //   </div>;
    // });
  }

  function returnNotificationsMenu(userNotifications) {
    formatNotificationsMenu(userNotifications);
    return JSON.stringify(userNotifications);
    // return individualNotifications;
  }

  // useEffect(() => {
  //   getNotifications(authApi).then((result) => {
  //     setNotificationsList(result);
  //     console.log("Done populating notificationsList");
  //     // setNotificationsList(result);
  //   });
  // });

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="left-side">
        {/* <div className="home" onClick={goHome}>
          HOME
        </div> */}
        <div className="home" onClick={goLectureDashboard}>
          DASHBOARD
        </div>
      </div>
      <div className="right-side">
        <div
          className="symbols-auth notifications-icon"
          onClick={() => {
            console.log(
              `Toggling display notifications from ${displayNotifications}`
            );
            toggleDisplayNotifications(!displayNotifications);
            console.log(`Toggle to ${displayNotifications}`);
            if (displayNotifications) {
              getNotifications(authApi).then((result) => {
                setNotificationsList(result);
                console.log("Done populating notificationsList with: ", result);
                console.log(
                  "NotificationsList from Header: ",
                  notificationsList
                );
              });
            }
          }}
        >
          T
        </div>
        {/* <div>
          {displayNotifications
            ? JSON.stringify(formatNotifications(notificationsList))
            : "not showing notifications..."}
        </div> */}
        {/* USE BELOW */}
        <div>
          {displayNotifications ? (
            // ? JSON.stringify(notificationsList)
            <Notifications
              displayNotifications={displayNotifications}
              notificationsList={notificationsList}
            />
          ) : (
            "HIDDEN"
          )}
        </div>
        {/* FORMER BELOW */}
        {/* <div>
          {displayNotifications
            ? returnNotificationsMenu(notificationsList)
            : "HIDDEN"}
        </div> */}
        {/* END FORMER */}
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
