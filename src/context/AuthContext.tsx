import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../interfaces/user";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  user: User | undefined;
}
const demoUser = {
  id: 1,
  fullName: "Jose Briceño",
  email: "jose@mail.com",
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  const login = async () => {
    localStorage.setItem("token", "authtoken");
    localStorage.setItem("user", JSON.stringify(demoUser));
    setIsAuthenticated(true);
    setUser(demoUser);
  };

  const logout = () => setIsAuthenticated(false);

  const updateUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, setUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
