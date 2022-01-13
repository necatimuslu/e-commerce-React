import React, { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { getAllColor } from "../../services/colorAndBrandService";
import { RiDeleteBin3Fill } from "react-icons/ri";
import _ from "lodash";
import laptop from "../../images/laptop.jpeg";
import { ADD_TO_CART } from "../../constants/cartConstants";
import { toast } from "react-toastify";
const ProductCartCheckout = ({ c }) => {
  const [colors, setColors] = useState([]);
  let dispatch = useDispatch();
  useEffect(() => {
    fetchColor();
    return () => {
      setColors([]);
    };
  }, []);

  const fetchColor = () => {
    getAllColor().then((res) => setColors(res.data));
  };

  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === c._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      });
    }
  };
  const handleCountChange = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > c.quantity) {
      toast.error(`Toplam Stok miktarı : ${c.quantity} adet`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((product, i) => {
      if (product._id === c._id) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };
  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === c._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      });
    }
  };
  return (
    <tr className="text-center ">
      <td>
        <div style={{ width: "70px", height: "auto" }} className="img-fluid">
          {c.image.length ? (
            <ModalImage small={c.image} large={c.image} alt="Ürün resmi" />
          ) : (
            <ModalImage small={laptop} large={laptop} alt="Ürün resmi" />
          )}
        </div>
      </td>
      <td>{c.title}</td>
      <td>{c.price}TL </td>
      <td>{c.brand.name}</td>
      <td>
        <select
          name="color"
          className="form-control"
          onChange={handleColorChange}
        >
          {c.color ? (
            <option value={c.color}>{c.color.name}</option>
          ) : (
            <option>Renk Seçiniz</option>
          )}
          {colors
            .filter((e) => e !== c.color)
            .map((co) => {
              return (
                <option key={co._id} value={co.name}>
                  {co.name}
                </option>
              );
            })}
        </select>
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          onChange={handleCountChange}
          value={c.count}
        />
      </td>

      <td>
        <RiDeleteBin3Fill
          onClick={handleRemove}
          style={{
            cursor: "pointer",
          }}
          size={28}
          color="red"
        />
      </td>
    </tr>
  );
};

export default ProductCartCheckout;
