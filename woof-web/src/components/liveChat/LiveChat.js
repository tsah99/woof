import React, { useEffect } from "react";
import LiveChatMessage from "../liveChatMessage/LiveChatMessage.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./LiveChat.css";

/**
 * This component renders a list of live chat messages to be displayed
 * on the web page for the current video.
 * @param props is an object that contains these properties
 *    firebase - a handle on the Firebase API
 *    videoId - id of the YouTube video for which we should get comments from
 *    player - a handle on the player for the video being played
 */
function LiveChat(props) {
  const firestore = props.firebase.firestore();
  const messagesRef = firestore
    .collection("videos")
    .doc(props.videoId)
    .collection("liveChat");

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
              liveChatMessage={liveChatMessage}
              videoId={props.videoId}
              firebase={props.firebase}
              player={props.player}
            />
          ))
        : []}
    </div>
  );
}

export default LiveChat;
