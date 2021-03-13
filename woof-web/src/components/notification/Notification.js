import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import firebase from "firebase/app";
import "./Notification.css";

/**
 * Converts a UNIX timestamp seconds into a "... time ago" format.
 * Code inspired from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
 * @param seconds - UNIX timestamp seconds
 */
function timeSince(seconds) {
  var secondsSince = Math.floor((new Date() - new Date(seconds * 1000)) / 1000);

  var interval = secondsSince / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " year ago";
    } else {
      return Math.floor(interval) + " years ago";
    }
  }
  interval = secondsSince / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " month ago";
    } else {
      return Math.floor(interval) + " months ago";
    }
  }
  interval = secondsSince / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " day ago";
    } else {
      return Math.floor(interval) + " days ago";
    }
  }
  interval = secondsSince / 3600;
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " hour ago";
    } else {
      return Math.floor(interval) + " hours ago";
    }
  }
  interval = secondsSince / 60;
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " minute ago";
    } else {
      return Math.floor(interval) + " minutes ago";
    }
  }
  if (Math.floor(secondsSince) === 1) {
    return Math.floor(secondsSince) + " second ago";
  } else {
    return Math.floor(secondsSince) + " seconds ago";
  }
}

function Notification(props) {
  const systemApi = useContext(SystemContext);

  // Notification data
  let replyingUsername = props.notification.comment_reply_username;
  let commentReply = props.notification.comment_reply;
  let courseCode = props.notification.course_code;
  let courseTitle = props.notification.course_title;
  let videoName = props.notification.video_name;
  let timeReplied = timeSince(props.notification.time_replied.seconds);

  let lightStyle = systemApi.darkMode ? "-dark" : "-light";

  return (
    <div className={`notification-container`}>
      <div className="notification-nodisplay">
        {JSON.stringify(props.notification)}
      </div>
      <div className={`notification-header`}>
        <div className="notification-course-details">{`${courseCode}: ${courseTitle}`}</div>
        <div className="notification-video-details">{`${videoName}`}</div>
      </div>
      <div className={"notification-description"}>
        <span className={"notification-username"}>{replyingUsername}</span>
        <span>{` left the following reply to one of your comments:`}</span>
      </div>
      <div className="notification-detail">{`"${commentReply}"`}</div>
      <div className="notification-time">{timeReplied}</div>
    </div>
  );
}

export default Notification;
