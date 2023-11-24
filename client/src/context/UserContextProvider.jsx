import React, { useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("data") || "[]")
  );

  const userValue = useMemo(
    () => ({
      user,
      updateUser: (userDetails) => {
        setUser(userDetails);
      },
    }),
    [user]
  );
  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
