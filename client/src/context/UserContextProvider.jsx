import React, { useMemo, useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    room: "",
    userName: "",
  });
  

  const userValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
