import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ADD_TO_CART, REMOVE_TO_CART } from "../constants/cartConstants";
import {
  getUserCart,
  emptyUserCart,
  userAddress,
  applyCoupon,
  createOrderCash,
} from "../services/userService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { COUPON_APPLIED } from "../constants/couponConstants";
const Checkout = ({ history }) => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupont, setCoupont] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [totalAfterError, setTotalAfterError] = useState("");
  const { user, COD, coupon } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchUserCart();
    return () => {
      setProducts([]);
      setCartTotal();
    };
  }, []);
  const fetchUserCart = () => {
    getUserCart(user?.token).then((res) => {
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: REMOVE_TO_CART,
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setCartTotal(0);
      toast.dark("Sepet temizlendi");
      setCoupont("");
    });
  };

  const saveAddressToDB = () => {
    userAddress(user.token, { address }).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Adres Kaydedildi Siparişi tamamlayabilirsiniz");
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: COUPON_APPLIED,
          payload: true,
        });
      }

      if (res.data.err) {
        setTotalAfterError(res.data.err);
        dispatch({
          type: COUPON_APPLIED,
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      {" "}
      <input
        type="text"
        value={coupont}
        className="form-control "
        onChange={(e) => {
          setCoupont(e.target.value);
          setTotalAfterError("");
        }}
      />{" "}
      <button onClick={applyDiscountCoupon} className="btn btn-success mt-2">
        Onayla
      </button>{" "}
    </>
  );
  const createCashOrder = () => {
    createOrderCash(user?.token, COD, coupon).then((res) => {
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
        dispatch({
          type: "COD",
          payload: false,
        });
        emptyUserCart(user?.token);

        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="row mt-4 ml-2 mr-2">
      <div className="col-md-6">
        <h4>Gönderi Adresi</h4>
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-info mt-2 " onClick={saveAddressToDB}>
          Kaydet
        </button>
        <hr />
        <h4>Kupon</h4>
        {showApplyCoupon()}
        <br />
        {totalAfterError && (
          <p
            style={{ borderRadius: "10px", height: "25px" }}
            className="text-white bg-danger mt-2 text-center"
          >
            {totalAfterError}
          </p>
        )}
        <br />
      </div>
      <div className="col-md-6">
        <h4>Sipariş durumu</h4>
        <hr />
        <p style={{ fontSize: "20px" }}>{products.length} adet Ürün </p>
        {products &&
          products.map((p, i) => {
            return (
              <div key={p._id}>
                <p style={{ fontSize: "20px" }}>
                  {p.product.title} - {p.count} = {p.product.price * p.count}TL
                </p>
              </div>
            );
          })}
        <p style={{ fontSize: "20px" }}>Toplam :{cartTotal} TL</p>
        {totalAfterDiscount > 0 && products.length && (
          <>
            <span
              style={{
                backgroundColor: "#FF8A65",
                borderRadius: "5px",
                fontSize: "20px",
              }}
              className="text-white p-2"
            >
              Toplam İndirim : {cartTotal - totalAfterDiscount} TL
            </span>
            <hr />
            <br />
            <span
              style={{ borderRadius: "5px", fontSize: "20px" }}
              className="bg-success p-2 text-white"
            >
              İndirimli Toplam : {totalAfterDiscount} TL{" "}
            </span>
          </>
        )}
        <div className="row mt-3">
          <div className="col-md-6">
            {COD ? (
              <button
                style={{ fontSize: "20px" }}
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Siparişi tamamla
              </button>
            ) : (
              <button
                style={{ fontSize: "20px" }}
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Siparişi tamamla
              </button>
            )}
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-danger"
            >
              Sepeti sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
