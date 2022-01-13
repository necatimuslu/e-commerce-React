import axios from "axios";
import { baseUrl } from "../common/baseUrl";

export const createPayment = async (authtoken, coupon) =>
  await axios.post(
    `${baseUrl}/stripe/create-payment`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
