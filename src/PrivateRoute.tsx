import React from "react";
import { useAuth } from "./hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./components/Header";

const PrivateRoute: React.FC = ({}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export { PrivateRoute };
