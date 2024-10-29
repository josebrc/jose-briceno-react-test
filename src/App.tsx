import React from "react";

import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./navigation/Login";
import { Page401 } from "./navigation/Page401";
import { Page404 } from "./navigation/Page404";
import { Products } from "./navigation/admin/Products";
import { Product } from "./navigation/admin/Product";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/401" element={<Page401 />} />
        {/* Protected Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
