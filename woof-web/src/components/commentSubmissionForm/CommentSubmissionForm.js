import "./CommentSubmissionForm.css";

function submitComment(event) {
  event.preventDefault();
  console.log(event.target[0].value);
}

function convertSecondsToTimestamp(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function CommentSubmissionForm(props) {
  return (
    <div className="CommentSubmissionForm">
      <form
        className="comment-submission-form"
        noValidate
        autoComplete="off"
        onSubmit={submitComment}
      >
        <input className="comment-field" placeholder="write a comment..." />
        <input
          className="timestamp-field"
          placeholder={convertSecondsToTimestamp(parseInt(props.seconds))}
        />
        <input type="submit" value="post" />
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
