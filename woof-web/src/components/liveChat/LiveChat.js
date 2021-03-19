import React, { useEffect } from "react";
import LiveChatMessage from "../liveChatMessage/LiveChatMessage.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import "./LiveChat.css";

/**
 * This component renders a list of live chat messages to be displayed
 * on the web page for the current video.
 * @param props is an object that contains these properties
 *    videoId - id of the YouTube video for which we should get comments from
 *    courseId - id of the course
 */
//yesterday constant used to retrieve messages in live chat only from the day before
const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000);
function LiveChat(props) {
  const firestore = firebase.firestore();

  const messagesRef = firestore
    .collection("classes")
    .doc(props.courseId)
    .collection("videos")
    .doc(props.videoId)
    .collection("liveChat")
    .where("time_sent", ">", YESTERDAY);

  let [liveChat] = useCollectionData(messagesRef.orderBy("time_sent", "asc"), {
    idField: "id",
  });

  useEffect(() => {
    let div = document.getElementsByClassName("LiveChat")[0];
    div.scrollTop = div.scrollHeight;
  });

  return (
    <div className="LiveChat">
      {liveChat
        ? liveChat.map((liveChatMessage, i) => (
            <LiveChatMessage
              key={liveChatMessage.id}
              liveChatMessage={liveChatMessage}
              videoId={props.videoId}
            />
          ))
        : []}
    </div>
  );
}

export default LiveChat;
