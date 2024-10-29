import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../interfaces/user";
import { requestLogin } from "../services/auth";
import { decrypt, encrypt } from "../helpers";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  const login = async () => {
    try {
      const loginData = requestLogin();
      const encryptedUser = await encrypt(JSON.stringify(loginData.user));
      const encryptedToken = await encrypt(loginData.token);
      localStorage.setItem("token", encryptedToken);
      localStorage.setItem("user", encryptedUser);
      setIsAuthenticated(true);
      setUser(loginData.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const encryptedUser = localStorage.getItem("user");

    if (token && encryptedUser) {
      decrypt(encryptedUser).then((decryptedUser) => {
        setUser(JSON.parse(decryptedUser));
        setIsAuthenticated(true);
      });
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
