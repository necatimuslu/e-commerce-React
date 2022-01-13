import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${baseUrl}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(`${baseUrl}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const userAddress = async (authtoken, address) => {
  return await axios.post(
    `${baseUrl}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const applyCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${baseUrl}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const emptyUserCart = async (authtoken) => {
  return await axios.delete(
    `${baseUrl}/user/cart`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(`${baseUrl}/order`, stripeResponse, {
    headers: {
      authtoken,
    },
  });

export const getUserOrders = async (authtoken) =>
  await axios.get(`${baseUrl}/order`, {
    headers: {
      authtoken,
    },
  });

export const getWhishlist = async (authtoken) =>
  await axios.get(`${baseUrl}/user/whishlist`, {
    headers: {
      authtoken,
    },
  });

export const createWhishlist = async (productId, authtoken) =>
  await axios.post(
    `${baseUrl}/user/whishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const deleteWhishlist = async (productId, authtoken) =>
  await axios.put(
    `${baseUrl}/user/whishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );

export const createOrderCash = async (authtoken, COD, coupon) =>
  await axios.post(
    `${baseUrl}/user/cash-order`,
    { couponApplied: coupon, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
