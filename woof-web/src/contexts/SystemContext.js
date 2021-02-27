import React, { useCallback, useMemo, useState } from "react";

const SystemContext = React.createContext();

/**
 * System Context
 *
 * Handles anything system related, so dark/light mode + other factors
 */
export function SystemProvider(props) {
  // change this when auth is actually set up
  const [darkMode, _setDarkMode] = useState(false);
  const setDarkMode = useCallback(_setDarkMode, []);

  const getMemoizedSetters = useMemo(() => {
    return {
      setDarkMode,
    };
  }, []);

  // Merge memoized setters with non-memoable vars
  const getApi = () => {
    return {
      darkMode,
      ...getMemoizedSetters,
    };
  };

  return (
    <SystemContext.Provider value={getApi()}>
      {props.children}
    </SystemContext.Provider>
  );
}

export default SystemContext;
