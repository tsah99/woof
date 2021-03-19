import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "./LiveChatMessageForm.css";

/**
 * Event handler for when user sends a message. Sends a message to Firestore
 * and stores it.
 * @param event - event object triggered when user sends a message
 * @param courseId - id of the course their sending a message on
 * @param videoId - id of the video their watching
 * @param authApi - authApi retrieved from AuthContext
 */
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

/**
 * Renders the live chat message form located at the bottom of live chat
 * on the lecture page. Allows the user to send a message to the live chat.
 * @param props an object that contains
 *    courseId - id of course currently on
 *    videoId - id of video being watched
 */
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
