import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "./LiveChatMessageForm.css";

async function sendMessage(event, courseId, videoId, authApi) {
  event.preventDefault();

  let liveChatMessage = event.target[0].value;
  if (liveChatMessage.length === 0 || liveChatMessage.trim().length === 0)
    return;

  const firestore = firebase.firestore();
  const messagesRef = firestore
    .collection("classes")
    .doc(courseId)
    .collection("videos")
    .doc(videoId)
    .collection("liveChat");

  await messagesRef.add({
    text: liveChatMessage,
    time_sent: firebase.firestore.Timestamp.now(),
    username: authApi.user.email,
  });

  event.target[0].value = "";
}

function LiveChatMessageForm(props) {
  const authApi = useContext(AuthContext);
  return (
    <div className="LiveChatMessageForm">
      <form
        className="liveChat-message-form"
        noValidate
        autoComplete="off"
        onSubmit={(event) =>
          sendMessage(event, props.courseId, props.videoId, authApi)
        }
      >
        <input className="chat-field" placeholder="Send a message..." />
        <input className="send-chat-button" type="submit" value="Send" />
      </form>
    </div>
  );
}

export default LiveChatMessageForm;
