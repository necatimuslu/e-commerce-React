import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userCart } from "../services/userService";
import ProductCartCheckout from "../components/form/ProductCartCheckout";
const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("Cart save error", err));
  };

  const showProductTable = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Resim</th>
          <th scope="col">Ürün adı</th>
          <th scope="col">Fiyat</th>
          <th scope="col">Marka</th>
          <th scope="col">Renk</th>
          <th scope="col">Adet</th>

          <th scope="col">Sil</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((c) => {
          return <ProductCartCheckout key={c._id} c={c} />;
        })}
      </tbody>
    </table>
  );

  const saveCashOrderDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("Cart save error", err));
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-8 col-sm-12">
          <h5 className="text-center ">
            Sepet'de {cart.length} adet ürün bulunmaktadır.{" "}
          </h5>
          {!cart.length ? (
            <h6 className="p-5">
              Sepetiniz de ürün bulunmamaktadır.{" "}
              <Link className="text-success" to="/">
                Alışveriş'e devam etmek için tıklayınız.
              </Link>
            </h6>
          ) : (
            showProductTable()
          )}
        </div>
        <div className="col-md-4 col-sm-12">
          <h4>Sipariş Toplamı</h4>
          <hr />
          <p>Ürünler</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.price * c.count} TL
              </p>
            </div>
          ))}
          <hr />
          Toplam :{" "}
          <b style={{ fontWeight: "bold", fontSize: "18px" }}>
            {getTotal()} TL{" "}
          </b>
          <hr />
          {user ? (
            <>
              <button
                className="btn btn-sm btn-outline-primary mt-2"
                disabled={!cart.length}
                onClick={saveOrderDb}
              >
                Kart ile ödeme
              </button>
              <hr />

              <button
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
                onClick={saveCashOrderDb}
              >
                Nakit ödeme
              </button>
            </>
          ) : (
            <button className="btn  btn-success  mt-2">
              <Link
                className="text-white"
                to={{ pathname: "/login", state: { from: "cart" } }}
              >
                {" "}
                Siparişi tamamlamak için giriş yapınız.{" "}
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
