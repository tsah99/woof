import React from "react";
import LiveChatMessage from "../liveChatMessage/LiveChatMessage.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./LiveChat.css";

function LiveChat(props) {
  const firestore = props.firebase.firestore();
  const messagesRef = firestore
    .collection("videos")
    .doc(props.videoId)
    .collection("liveChat");

  let [liveChat] = useCollectionData(messagesRef.orderBy("time", "desc"), {
    idField: "id",
  });

  return (
    <div className="LiveChat">
      {liveChat
        ? liveChat.map((liveChatMessage) => (
            <LiveChatMessage liveChatMessage={liveChatMessage} />
          ))
        : []}
    </div>
  );
}

export default LiveChat;
