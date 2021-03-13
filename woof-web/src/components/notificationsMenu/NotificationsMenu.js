import React, { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import firebase from "firebase/app";
import Notification from "../notification/Notification.js";
import "./NotificationsMenu.css";

function renderNotificationMenu(notification) {
  return <Notification notification={notification} />;
}

function NotificationsMenu() {
  const authApi = useContext(AuthContext);
  const systemApi = useContext(SystemContext);

  const firestore = firebase.firestore();
  const notifsRef = firestore
    .collection("users")
    .doc(authApi.user.uid)
    .collection("notifications");

  let [notifications] = useCollectionData(
    notifsRef.orderBy("time_replied", "desc"),
    { idField: "id" }
  );

  if (!notifications) return <></>;

  return (
    <div>
      <div className="notificationsMenu-header">Notifications</div>
      {notifications.map((notification) =>
        renderNotificationMenu(notification)
      )}
    </div>
  );
}

export default NotificationsMenu;
