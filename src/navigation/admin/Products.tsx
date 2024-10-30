import React, { useState } from "react";
import { ProductTable } from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = ({}) => {
  const { searchProducts, loading } = useProducts();
  const [search, setSearch] = useState("");
  return (
    <div>
      <h1>Productos</h1>
      <hr />
      {!loading && (
        <div className="search">
          <label htmlFor="name">Buscar producto</label>
          <input
            name="search"
            type="text"
            placeholder="Buscar producto"
            className="input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchProducts(e.target.value);
            }}
          />
        </div>
      )}
      <ProductTable />
    </div>
  );
};
export { Products };
