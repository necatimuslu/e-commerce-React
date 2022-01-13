import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const getOrders = async (authtoken) =>
  await axios.get(`${baseUrl}/admin/order`, {
    headers: {
      authtoken,
    },
  });

export const orderStatusChange = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${baseUrl}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
