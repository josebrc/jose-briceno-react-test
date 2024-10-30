import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./navigation/Login";

import { Page404 } from "./navigation/Page404";
import { Products } from "./navigation/admin/Products";
import { Product } from "./navigation/admin/Product";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { RedirectRoot } from "./RedirectRoot";
import { User } from "./navigation/admin/User";
import { AddProduct } from "./navigation/admin/AddProduct";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectRoot />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<Page404 />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<User />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
