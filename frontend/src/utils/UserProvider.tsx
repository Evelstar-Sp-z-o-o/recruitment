import React, { createContext, useContext, useState, type ReactNode,type ReactElement } from "react";

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [email, setEmailState] = useState<string>(() => localStorage.getItem("email") || "");

  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setEmailState("");
    localStorage.removeItem("email");
  };

  return (
    <UserContext.Provider value={{ email, setEmail, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
