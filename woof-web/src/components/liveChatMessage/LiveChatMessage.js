import React from "react";
import { Grid } from "@material-ui/core";
import "./LiveChatMessage.css";

/**
 * Converts a timestring into seconds and returns it.
 *
 * @param timestring - a string of the format HH:MM:SS, H:MM:SS, MM:SS,
 *                     or M:SS
 */
function convertTimestringFormatToSeconds(timestring) {
  let hms = timestring.split(":"); // split it at the colons

  let seconds = 0;
  for (let i = hms.length - 1; i >= 0; --i) {
    seconds += 60 ** (hms.length - i - 1) * hms[i];
  }

  return seconds;
}

/**
 * Given a message, finds all timestamp strings in the message
 * text and links them such that clicking on the timestamp will
 * change the playerhead on the current video to that timestamp.
 *
 * For example, in the message "3:33 was helpful for learning
 * regression and 33:22 was helpful for learning parameter tuning",
 * clicking on 3:33 or 33:22 should change the video's player head
 * to 3:33 and 33:22 respectively
 *
 * @param message - a message object as explained in the LiveChatMessage component
 * @param player - a handle on the current video's player
 */
function linkTimestampsInComment(message, player) {
  let timestampReg = new RegExp(
    /([0-9]?[0-9]:[0-5][0-9]:[0-5][0-9])|([0-5]?[0-9]:[0-5][0-9])/
  );

  let parts = message.text.split(timestampReg);

  for (let i = 0; i < parts.length; ++i) {
    let timestampStr = parts[i];
    if (timestampStr !== undefined && timestampReg.test(timestampStr)) {
      parts[i] = (
        <span
          onClick={() =>
            player.current.seekTo(
              convertTimestringFormatToSeconds(timestampStr)
            )
          }
          style={{ cursor: "pointer", color: "#2d3edc" }}
          className="match"
          key={i}
        >
          {parts[i]}
        </span>
      );
    }
  }
  return <div>{parts}</div>;
}

/**
 * Converts a UNIX timestamp seconds into a "... time ago" format.
 *
 * @param seconds - UNIX timestamp seconds
 */
function timeSince(seconds) {
  var secondsSince = Math.floor((new Date() - new Date(seconds * 1000)) / 1000);

  var interval = secondsSince / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " year ago";
    } else {
      return Math.floor(interval) + " years ago";
    }
  }
  interval = secondsSince / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " month ago";
    } else {
      return Math.floor(interval) + " months ago";
    }
  }
  interval = secondsSince / 86400;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " day ago";
    } else {
      return Math.floor(interval) + " days ago";
    }
  }
  interval = secondsSince / 3600;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " hour ago";
    } else {
      return Math.floor(interval) + " hours ago";
    }
  }
  interval = secondsSince / 60;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " minute ago";
    } else {
      return Math.floor(interval) + " minutes ago";
    }
  }
  if (Math.floor(secondsSince) == 1) {
    return Math.floor(secondsSince) + " second ago";
  } else {
    return Math.floor(secondsSince) + " seconds ago";
  }
}

/**
 * This component renders a single message and should be used as a
 * child component to LiveChat.
 * @param props is an object that contains these properties
 *    LiveChatMessage - an object that contains these properties
 *      username - a string containing the comment owner's username
 *      text - a string containing the message's text
 *      time_posted - an object containing these properties
 *          seconds - time posted in UNIX timestamp seconds
 *      firebase - a handle on the Firebase API
 *      videoId - a string containing the current video's id
 *      player - a handle on the player for the current video
 */

function LiveChatMessage(props) {
  return (
    <div className="LiveChatMessage">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 className="message-owner">{props.liveChatMessage.username}</h4>
          <div className="UserAndText">
            <p className="message-text">
              {linkTimestampsInComment(props.liveChatMessage, props.player)}
            </p>
            {/* <p className="message-time">
              {timeSince(props.liveChatMessage.time_sent.seconds)}
            </p> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default LiveChatMessage;
