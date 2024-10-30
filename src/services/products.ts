import { api } from "../api";

import { Product } from "../interfaces/products";

export const getProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await api.get("/products");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
