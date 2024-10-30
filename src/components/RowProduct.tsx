import React from "react";
import { Product } from "../interfaces/products";

interface RowProductProps {
  product: Product;
}

const RowProduct: React.FC<RowProductProps> = ({ product }) => {
  return (
    <tr key={product.id} className="cursor-pointer">
      <td>
        <img src={product.image} alt={product.title} />
      </td>
      <td>{product.title}</td>
      <td>{product.category}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        {product.rating.rate} / 5 ({product.rating.count})
      </td>
      {/* {currentPageData.map((product) => (
            <tr
              className="cursor-pointer"
              key={product.id}
              onClick={() => {
                console.log(
                  "🚀 ~ file: ProductTable.tsx ~ line 92 ~ ProductTable ~ product",
                  product
                );
              }}
            >
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                {product.rating.rate} / 5 ({product.rating.count})
              </td>
              <td>
                <div className="accion-container">
                  <button
                    onClick={() => {
                      console.log("Editar producto");
                    }}
                  >
                    <GoPencil size={20} fill="#5471d6" />
                  </button>
                  <button
                    onClick={() => {
                      console.log("Delete producto");
                    }}
                  >
                    <GoTrash size={20} fill="tomato" />
                  </button>
                </div>
              </td>
            </tr>
          ))} */}
    </tr>
  );
};
export { RowProduct };
