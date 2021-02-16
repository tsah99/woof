import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./LiveChatMessageForm.css";

async function sendMessage(event, videoId, firebase, authApi) {
  event.preventDefault();

  let liveChatMessage = event.target[0].value;
  if (liveChatMessage.length === 0) return;

  const firestore = firebase.firestore();
  const messagesRef = firestore
    .collection("videos")
    .doc(videoId)
    .collection("liveChat");

  await messagesRef.add({
    text: liveChatMessage,
    time: firebase.firestore.Timestamp.now(),
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
          sendMessage(event, props.videoId, props.firebase, authApi)
        }
      >
        <input className="chat-field" placeholder="chat in live..." />
        <input className="send-chat-button" type="submit" value="send" />
      </form>
    </div>
  );
}

export default LiveChatMessageForm;
