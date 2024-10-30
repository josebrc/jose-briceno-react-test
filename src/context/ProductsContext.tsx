import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../interfaces/products";
import { getProducts } from "../services/products";

interface ProductContextType {
  allProducts: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchProducts: (query: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      if (response) {
        setAllProducts(response);
        setFilteredProducts(response);
      }
    } catch (err) {
      setError("Error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (query: string) => {
    const filtered = query
      ? allProducts.filter((product) =>
          `${product.title} ${product.description} ${product.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : allProducts;
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ allProducts, filteredProducts, loading, error, searchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
