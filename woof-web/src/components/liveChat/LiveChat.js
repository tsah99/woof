import LiveChatMessage from "../liveChatMessage/LiveChatMessage.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./LiveChat.css";

function LiveChat(props) {
  const firestore = props.firebase.firestore();
  const messagesRef = firestore.collection("liveChat");
  const [liveChat] = useCollectionData(messagesRef, { idField: "id" });
  console.log(liveChat);
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
