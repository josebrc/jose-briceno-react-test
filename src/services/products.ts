import { api } from "../api";

import { Product, ProductFormValues } from "../interfaces/products";

export const getProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await api.get("/products");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (
  product: Product
): Promise<Product | undefined> => {
  try {
    const response = await api.put(`/products/${product.id}`, product);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (
  product: ProductFormValues
): Promise<Product | undefined> => {
  try {
    const response = await api.post("/products", product);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const destroyProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(error);
  }
};
