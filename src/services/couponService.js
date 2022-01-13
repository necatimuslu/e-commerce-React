import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const listCoupon = async () => await axios.get(`${baseUrl}/coupon`);

export const createCoupon = async (couponForm, authtoken) =>
  await axios.post(`${baseUrl}/coupon`, couponForm, {
    headers: {
      authtoken,
    },
  });

export const removeCoupon = async (id, authtoken) =>
  await axios.delete(`${baseUrl}/coupon/${id}`, {
    headers: {
      authtoken,
    },
  });
