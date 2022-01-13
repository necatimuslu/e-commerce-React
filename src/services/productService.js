import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const getAllProduct = async () => await axios.get(`${baseUrl}/product`);

export const getProductCount = async (count) =>
  await axios.get(`${baseUrl}/product/get/${count}`);

export const getProductById = async (id) =>
  await axios.get(`${baseUrl}/product/${id}`);

export const limitProducts = async (sort, order, page) =>
  await axios.post(`${baseUrl}/product/limits`, { sort, order, page });

export const bestProducts = async (sold, order, page) =>
  await axios.post(`${baseUrl}/product/best`, { sold, order, page });

export const createProduct = async (authtoken, productForm) => {
  return await axios.post(`${baseUrl}/product`, productForm, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (authtoken, productForm, id) => {
  return await axios.put(`${baseUrl}/product/${id}`, productForm, {
    headers: {
      authtoken,
    },
  });
};

export const deleteProduct = async (authtoken, id) => {
  return await axios.delete(`${baseUrl}/product/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const countProducts = async () =>
  await axios.get(`${baseUrl}/product/get/total`);

export const ratingStar = async (productId, star, authtoken) => {
  return await axios.put(
    `${baseUrl}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const releatedProduct = async (productId) =>
  await axios.get(`${baseUrl}/product/get/releated/${productId}`);

export const fetchProdutsByFilter = async (arg) =>
  await axios.post(`${baseUrl}/product/search/filters`, arg);
