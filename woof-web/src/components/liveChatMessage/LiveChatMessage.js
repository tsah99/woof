import { Avatar, Grid } from "@material-ui/core";
import "./LiveChatMessage.css";

const imgLink =
  "https://media-exp1.licdn.com/dms/image/C5603AQF4-QPAgjUAkA/profile-displayphoto-shrink_400_400/0/1580369272770?e=1618444800&v=beta&t=mgZHbnyCFTN2iY1-huTWITyFHe2u4xr19yh6N0NboPE";

/**
 * This component renders a single message and should be used as a
 * child component to LiveChat.
 * @param props is an object that contains these properties
 *    LiveChatMessage - an object that contains these properties
 *      text - a string containing the message's text
 *      time - a timestamp containing the time the message was sent
 *      username - a string containing the comment owner's username
 */
function LiveChatMessage(props) {
  return (
    <div className="LiveChatMessage">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="message-owner">{props.liveChatMessage.username}</h4>
          <p className="message-text">{props.liveChatMessage.text}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default LiveChatMessage;
