import "./CommentSubmissionForm.css";

async function submitComment(event, firebase) {
  const firestore = firebase.firestore();
  const commentsRef = firestore.collection("comments");
  event.preventDefault();
  let comment = event.target[0].value;

  await commentsRef.add({
    video_id: "test_video_id",
    comment: comment,
    num_upvotes: 0,
    num_downvotes: 1,
    time_posted: firebase.firestore.FieldValue.serverTimestamp(),
    username: "sam",
    vid_timestamp_secs: 42,
  });

  event.target[0].value = "";
  event.target[2].value = "";
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
        onSubmit={(event) => submitComment(event, props.firebase)}
      >
        <input className="comment-field" placeholder="write a comment..." />
        <input
          className="post-comment-button"
          type="submit"
          value="comment at"
        />
        <input
          className="timestamp-field"
          placeholder={convertSecondsToTimestamp(parseInt(props.seconds))}
        />
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
