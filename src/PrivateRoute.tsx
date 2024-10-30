import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ProductProvider } from "./context/ProductsContext";
import { useAuth } from "./hooks/useAuth";

const PrivateRoute: React.FC = ({}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <ProductProvider>
        <Header />
        <Outlet />
      </ProductProvider>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export { PrivateRoute };
