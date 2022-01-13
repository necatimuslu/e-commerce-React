import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../services/stripeService";
import { Card } from "antd";
import "../stripe.css";
import { Link } from "react-router-dom";
import laptop from "../images/laptop.jpeg";
import { BsCurrencyPound } from "react-icons/bs";
import { MdPointOfSale } from "react-icons/md";
import { createOrder, emptyUserCart } from "../services/userService";
import { ADD_TO_CART } from "../constants/cartConstants";
import { COUPON_APPLIED } from "../constants/couponConstants";

const StripeCheckout = ({ history }) => {
  const { user, coupon } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPayment(user.token, coupon).then((res) => {
      setClientSecret(res.data.clientSecret);

      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Ödeme hatalı ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user?.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          dispatch({
            type: ADD_TO_CART,
            payload: [],
          });
          dispatch({
            type: COUPON_APPLIED,
            payload: false,
          });
          emptyUserCart(user?.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  console.log(clientSecret);
  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== "undefined" ? (
            <p className="alert alert-success">{`Toplam İndirim ${totalAfterDiscount} TL`}</p>
          ) : (
            <p className="alert alert-danger">İndirim kuponu uygulanmadı</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={laptop}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <BsCurrencyPound
                style={{ fontSize: "28px" }}
                className="text-info"
              />{" "}
              <br />
              <br />
              <span style={{ fontSize: "18px" }}>
                Toplam : <strong>{cartTotal} TL</strong>
              </span>
            </>,

            <>
              <MdPointOfSale
                style={{ fontSize: "28px" }}
                className="text-info"
              />{" "}
              <br />
              <br />
              <span style={{ fontSize: "18px" }}>
                {" "}
                Toplam Ödenecek :{" "}
                <strong>{(payable / 100).toFixed(2)} TL</strong>
              </span>
            </>,
          ]}
        ></Card>
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={succeeded || processing || disabled}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Ödeme Tamamla"
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message-hidden"}>
          Ödeme Başarılı.{" "}
          <Link to="/user/history">Satınalma geçmişi için tıklayınız.</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
