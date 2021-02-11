import { Avatar, Grid } from "@material-ui/core";
import "./Comment.css";

const imgLink =
  "https://media-exp1.licdn.com/dms/image/C5603AQF4-QPAgjUAkA/profile-displayphoto-shrink_400_400/0/1580369272770?e=1618444800&v=beta&t=mgZHbnyCFTN2iY1-huTWITyFHe2u4xr19yh6N0NboPE";

/**
 * This component renders a single comment and should be used as a
 * child component to CommentLog.
 * @param props is an object that contains these properties
 *    comment - an object that contains these properties
 *       username - a string containing the comment owner's username
 *       comment - a string containing the comment's text
 */
function Comment(props) {
  return (
    <div className="Comment">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="comment-owner">{props.comment.username}</h4>
          <p className="comment-text">{props.comment.comment}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Comment;
