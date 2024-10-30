import React from "react";
import { Product } from "../interfaces/products";

interface RowProductProps {
  product: Product;
  onClick: (product: Product) => void;
}

const RowProduct: React.FC<RowProductProps> = ({ product, onClick }) => {
  return (
    <>
      <tr
        key={product.id}
        className="cursor-pointer"
        onClick={() => onClick(product)}
      >
        <td>
          <img src={product.image} alt={product.title} />
        </td>
        <td>{product.title}</td>
        <td>{product.category}</td>
        <td>${product.price.toFixed(2)}</td>
        {product.rating && (
          <td>
            {product.rating.rate} / 5 ({product.rating.count})
          </td>
        )}
      </tr>
    </>
  );
};

export { RowProduct };
