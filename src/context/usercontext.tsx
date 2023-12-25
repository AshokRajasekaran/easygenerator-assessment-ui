import React, { createContext, useContext, useState } from "react";

type UserContext = {
  isLoggedIn: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext({} as UserContext);
export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  return (
    <UserContext.Provider value={{ isLoggedIn: Boolean(user), user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
