import React, { useState } from "react";
import { Avatar, Card, Tooltip } from "antd";
import { FolderViewOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { ADD_TO_CART } from "../../constants/cartConstants";

import { SET_VISIBLE } from "../../constants/drawerConstants";
const { Meta } = Card;
const ProductCard = ({ p }) => {
  const [tooltip, setTooltip] = useState(
    p.quantity < 1 ? "Stokda Yok" : "Sepete Ekle"
  );
  let dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const handleAddToCart = () => {
    if (p.quantity < 1) {
      return;
    } else {
      setTooltip("Sepete Eklendi");
      let cart = [];

      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({
          ...p,
          count: 1,
        });

        let unique = _.uniqWith(cart, _.isEqual);

        localStorage.setItem("cart", JSON.stringify(unique));
        setTooltip(p.quantity < 1 ? "Stokda Yok" : "Sepete Eklendi");
        dispatch({
          type: ADD_TO_CART,
          payload: unique,
        });
        dispatch({
          type: SET_VISIBLE,
          payload: true,
        });
      }
    }
  };

  return (
    <Card
      cover={
        <img
          src={p.image}
          style={{
            height: "300px",
            objectFit: "cover",
          }}
          className="img-fluid"
        />
      }
      actions={[
        <Link to={`/product-detail/${p._id}`}>
          <FolderViewOutlined
            key="Ürün detay"
            style={{ fontSize: 30, color: "#009688" }}
          />{" "}
          <br />
          <strong> Ürün detayı</strong>
        </Link>,
        <Tooltip title={tooltip}>
          {" "}
          <a onClick={handleAddToCart} disabled={p.quantity < 1}>
            {p.quantity < 1 ? (
              <MdDoNotDisturbAlt style={{ fontSize: 30, color: "#03A9F4" }} />
            ) : (
              <>
                {" "}
                <ShoppingCartOutlined
                  key="Sepete ekle"
                  style={{ fontSize: 30, color: "#03A9F4" }}
                />
              </>
            )}
            <br />
            <strong>
              {p.quantity < 1 ? "Stokda Yok" : "Sepete Ekle"}
            </strong>{" "}
          </a>
        </Tooltip>,
      ]}
    >
      <Meta
        avatar={<Avatar src={p.image} />}
        title={p.title}
        description={
          p.description ? p.description.substring(0, 80) + "..." : p.description
        }
      />
    </Card>
  );
};

export default ProductCard;
