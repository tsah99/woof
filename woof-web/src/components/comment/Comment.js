import { Avatar, Grid } from "@material-ui/core";
import "./Comment.css";

const imgLink =
  "https://media-exp1.licdn.com/dms/image/C5603AQF4-QPAgjUAkA/profile-displayphoto-shrink_400_400/0/1580369272770?e=1618444800&v=beta&t=mgZHbnyCFTN2iY1-huTWITyFHe2u4xr19yh6N0NboPE";

function Comment(props) {
  return (
    <div className="Comment">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="comment-owner">{props.comment.owner}</h4>
          <p className="comment-text">{props.comment.text}</p>
          <p className="time-posted">{props.comment.time_posted}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Comment;
