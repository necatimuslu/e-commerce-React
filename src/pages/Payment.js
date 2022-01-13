import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";

const promise = loadStripe(
  "pk_test_51K4MnGBsM8c0QW24clRPUbbbvtsFNIJGg2kOW3CQiysL0YQKS5RSBbxOnRfMS3RYMidzj5or1EYdvDPubWqJQZFG000iTS9rRi"
);

const Payment = ({ history }) => {
  return (
    <div className="container p-5 text-center">
      <h4>Ödeme</h4>{" "}
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          {" "}
          <StripeCheckout history={history} />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
