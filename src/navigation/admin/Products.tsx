import React, { useState } from "react";
import { ProductTable } from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = ({}) => {
  const { searchProducts, loading } = useProducts();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1>Productos</h1>

      {!loading && (
        <div className="">
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

          <div className="add-product">
            <button
              className="button-alt"
              onClick={() => navigate("/add-product")}
            >
              Agregar producto
              <GoPlusCircle size={20} />
            </button>
          </div>
        </div>
      )}
      <ProductTable />
    </div>
  );
};
export { Products };
