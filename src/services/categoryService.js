import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const getAllCategory = async () =>
  await axios.get(`${baseUrl}/category`);

export const getCategoryById = async (id) =>
  await axios.get(`${baseUrl}/category/${id}`);

export const createCategory = async (authtoken, category) => {
  return await axios.post(`${baseUrl}/category`, category, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (authtoken, id, category) => {
  return await axios.put(`${baseUrl}/category/${id}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken, id) => {
  return await axios.delete(`${baseUrl}/category/${id}`, {
    headers: {
      authtoken,
    },
  });
};
