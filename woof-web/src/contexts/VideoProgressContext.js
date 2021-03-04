import React, { useCallback, useMemo, useState } from "react";

const VideoProgressContext = React.createContext();

/**
 * VideoProgressContext
 *
 * Handles video progress context.
 */
export function VideoProgressProvider(props) {
  // change this when auth is actually set up
  const [progress, setProgress] = useState({});

  return (
    <VideoProgressContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </VideoProgressContext.Provider>
  );
}

export default VideoProgressContext;
