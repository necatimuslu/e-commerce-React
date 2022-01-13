import axios from "axios";

import { baseUrl } from "../common/baseUrl";

export const getAllColor = async () => await axios.get(`${baseUrl}/color`);

export const createColor = async (color) =>
  await axios.post(`${baseUrl}/color`, color);

export const deleteColor = async (id) =>
  await axios.delete(`${baseUrl}/color/${id}`);

export const getAllBrand = async () => await axios.get(`${baseUrl}/brand`);

export const createBrand = async (brand) =>
  await axios.post(`${baseUrl}/brand`, brand);

export const deleteBrand = async (id) =>
  await axios.delete(`${baseUrl}/brand/${id}`);
