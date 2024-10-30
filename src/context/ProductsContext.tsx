import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../interfaces/products";
import { getProducts } from "../services/products";

interface ProductContextType {
  allProducts: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchProducts: (query: string) => void;
  deleteProduct: (id: number) => void;
  editProduct: (updatedProduct: Product) => void;
  getProductById: (id: number) => Product | undefined;
  addProduct: (newProduct: Omit<Product, "id">) => void;
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

  const deleteProduct = (id: number) => {
    const updatedProducts = allProducts.filter((product) => product.id !== id);
    setAllProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const editProduct = (updatedProduct: Product) => {
    const updatedProducts = allProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setAllProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const getProductById = (id: number): Product | undefined => {
    return allProducts.find((product) => product.id === id);
  };

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const newId =
      allProducts.length > 0
        ? Math.max(...allProducts.map((p) => p.id)) + 1
        : 1; // Genera un nuevo ID
    const productWithId: Product = { id: newId, ...newProduct };

    console.log("🚀 ~ addProduct ~ productWithId:", productWithId);
    const updatedProducts = [...allProducts, productWithId];
    setAllProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        loading,
        error,
        searchProducts,
        deleteProduct,
        editProduct,
        getProductById,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
