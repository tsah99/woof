import "./LiveChatMessageForm.css";

async function sendMessage(event, firebase) {
  event.preventDefault();

  const firestore = firebase.firestore();
  const messagesRef = firestore.collection("liveChat");
  let LiveChatMessage = event.target[0].value;

  await messagesRef.add({
    text: LiveChatMessage,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    username: "kento",
  });

  event.target[0].value = "";
}

function LiveChatMessageForm(props) {
  return (
    <div className="LiveChatMessageForm">
      <form
        className="liveChat-message-form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => sendMessage(event, props.firebase)}
      >
        <input className="chat-field" placeholder="chat in live..." />
        <input className="send-chat-button" type="submit" value="send" />
      </form>
    </div>
  );
}

export default LiveChatMessageForm;
