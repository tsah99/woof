import React, { useCallback, useMemo, useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  // change this when auth is actually set up
  const [user, _setUser] = useState(true);
  const setUser = useCallback(_setUser, []);

  const getMemoizedSetters = useMemo(() => {
    return {
      setUser,
    };
  }, []);

  // Merge memoized setters with non-memoable vars
  const getApi = () => {
    return {
      user,
      ...getMemoizedSetters,
    };
  };

  return (
    <AuthContext.Provider value={getApi()}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
