import Comment from "../comment/Comment.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./LiveChat.css";

function CommentLog(props) {
  const firestore = props.firebase.firestore();
  const commentsRef = firestore.collection("comments");
  const [comments] = useCollectionData(commentsRef, { idField: "id" });
  console.log(comments);
  return (
    <div className="CommentLog">
      {comments ? comments.map((comment) => <Comment comment={comment} />) : []}
    </div>
  );
}

export default CommentLog;
