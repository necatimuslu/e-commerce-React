import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const getSubs = async () => await axios.get(`${baseUrl}/sub`);

export const getSubById = async (id) => await axios.get(`${baseUrl}/sub/${id}`);

export const createSub = async (authtoken, subForm) => {
  return await axios.post(`${baseUrl}/sub`, subForm, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (authtoken, subForm, id) => {
  return await axios.put(`${baseUrl}/sub/${id}`, subForm, {
    headers: {
      authtoken,
    },
  });
};

export const deleteSub = async (authtoken, id) => {
  return await axios.delete(`${baseUrl}/sub/${id}`, {
    headers: {
      authtoken,
    },
  });
};
