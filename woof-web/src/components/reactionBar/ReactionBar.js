import React, { useState } from "react";
import "./ReactionBar.css";

/**
 * This component houses the "makes sense" and "confused"
 * reaction bar.
 *
 * Currently is not stored in anything other than local state
 */
function ReactionBar() {
  let [numMakesSense, updateNumMakesSense] = useState(0);
  let [numConfused, updateNumConfused] = useState(0);
  return (
    <div className="ReactionBar">
      <button
        className="makes-sense-react"
        onClick={() => updateNumMakesSense(numMakesSense + 1)}
      >
        😍
      </button>
      {numMakesSense}
      <button
        className="confused-react"
        onClick={() => updateNumConfused(numConfused + 1)}
      >
        🧐
      </button>
      {numConfused}
    </div>
  );
}

export default ReactionBar;
