import React, { createContext, useContext, useState } from "react";

type UserContext = {
  isLoggedIn: boolean;
  user: any;
  setUser:  (data: any) => void;
};

const UserContext = createContext({} as UserContext);
export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const setUserHandler = (data:any) => {
    if(data) {
      sessionStorage.setItem("user", data)
      setUser(data)
    } else {
      sessionStorage.clear()
      setUser(null)
    }
  }
  return (
    <UserContext.Provider value={{ isLoggedIn: Boolean(user), user, setUser: setUserHandler }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
