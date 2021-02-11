import Comment from "../comment/Comment.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./CommentLog.css";

/**
 * This component renders a list of comments to be displayed
 * on the web page for the current video.
 * @param props is an object that contains these properties
 *    firebase - a handle on the Firebase API
 */
function CommentLog(props) {
  const firestore = props.firebase.firestore();
  const commentsRef = firestore.collection("comments");
  const [comments] = useCollectionData(commentsRef, { idField: "id" });

  return (
    <div className="CommentLog">
      {comments ? comments.map((comment) => <Comment comment={comment} />) : []}
    </div>
  );
}

export default CommentLog;
