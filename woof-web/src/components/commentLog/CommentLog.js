import Comment from "../comment/Comment.js";
import "./CommentLog.css";

function CommentLog(props) {
  return (
    <div className="CommentLog">
      {props.comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
}

export default CommentLog;
