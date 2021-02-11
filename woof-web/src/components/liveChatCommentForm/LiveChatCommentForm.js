import "./LiveChatCommentForm.css";

function submitComment(event) {
  event.preventDefault();
  console.log(event.target[0].value);
}

function LiveChatCommentForm(props) {
  return (
    <div className="LiveChatCommentForm">
      <form
        className="comment-submission-form"
        noValidate
        autoComplete="off"
        onSubmit={submitComment}
      >
        <input className="chat-field" placeholder="chat in live..." />
        <input className="send-chat-button" type="submit" value="send" />
      </form>
    </div>
  );
}

export default LiveChatCommentForm;
