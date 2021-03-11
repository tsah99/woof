import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import "./Notifications.css";

function Notifications(props) {
  const authApi = useContext(AuthContext);
  const systemApi = useContext(SystemContext);

  //   const [notificationList, setNotificationList] = useState([]);

  //   async function getNotifications(authApi) {
  //     const firestore = firebase.firestore();
  //     const notificationsRef = firestore
  //       .collection("users")
  //       .doc(authApi.user.uid)
  //       .collection("notifications");
  //     const notificationsData = await notificationsRef.get();
  //     // let notificationMessages = [];

  //     notificationsData.forEach(async function (doc) {
  //       let notificationInfo = doc.data();

  //       const userRef = firestore
  //         .collection("users")
  //         .doc(notificationInfo.comment_reply_uid);
  //       const courseRef = firestore
  //         .collection("classes")
  //         .doc(notificationInfo.courseId);
  //       const videoRef = firestore
  //         .collection("videos")
  //         .doc(notificationInfo.courseId)
  //         .collection("videos")
  //         .doc(notificationInfo.videoId);

  //       const replyingUser = await userRef.get();
  //       const courseInfo = await courseRef.get();
  //       const videoInfo = await videoRef.get();

  //       const username = replyingUser.username;
  //       const courseName = `${courseInfo.course_code} ${courseInfo.course_title}`;
  //       const videoName = videoInfo.title;

  //       setNotificationList(
  //         notificationList.concat([
  //           {
  //             replyingUser: username,
  //             courseName: courseName,
  //             videoName: videoName,
  //             commentReply: notificationInfo.comment_reply,
  //             timeReplied: notificationInfo.time_replied,
  //           },
  //         ])
  //       );
  //       //   notificationMessages.push(doc.data());
  //     });
  //     return;
  //   }

  //   setNotificationList([]);
  //   getNotifications(authApi).then((response) => {
  //     console.log("notifications: ", response);
  //     console.log("HI");
  //   });

  return (
    <div>
      {JSON.stringify(props.displayNotifications)}
      {JSON.stringify(props.notificationsList)}
    </div>
  );
}
export default Notifications;
