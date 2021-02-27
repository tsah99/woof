import React, { useCallback, useMemo, useState } from "react";

const LectureContext = React.createContext();

/**
 * Lecture Context
 *
 * Handles state between different components of lecture page
 *
 * */

export function LectureProvider(props) {
  const [currentRef, _setCurrentRef] = useState(null);
  const setCurrentRef = useCallback(_setCurrentRef, []);

  const getMemoizedSetters = useMemo(() => {
    return {
      setCurrentRef,
    };
  }, []);

  // Merge memoized setters with non-memoable vars
  const getApi = () => {
    return {
      currentRef,
      ...getMemoizedSetters,
    };
  };

  return (
    <LectureContext.Provider value={getApi()}>
      {props.children}
    </LectureContext.Provider>
  );
}

export default LectureContext;
