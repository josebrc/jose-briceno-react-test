import React from "react";

import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./navigation/Login";
import { Page401 } from "./navigation/Page401";
import { Page404 } from "./navigation/Page404";
import { Products } from "./navigation/admin/Products";
import { Product } from "./navigation/admin/Product";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { RedirectRoot } from "./RedirectRoot";
import { User } from "./navigation/admin/User";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectRoot />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/401" element={<Page401 />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<User />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<Product />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
