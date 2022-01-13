import React from "react";

import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpeg";
import { SET_VISIBLE } from "../../constants/drawerConstants";
const SideDrawer = ({ children }) => {
  let dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      className="text-center"
      title={`Sepet'de / ${cart.length} Ürün bulunmaktadır.`}
      onClose={() => {
        dispatch({
          type: SET_VISIBLE,
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.image ? (
              <>
                <img
                  src={p.image}
                  className="img-fluid"
                  style={{ height: "130px", objectFit: "cover" }}
                />
                <p className="text-center bg-secondary text-white">{p.title}</p>
              </>
            ) : (
              <>
                <img
                  src={laptop}
                  className="img-fluid"
                  style={{ height: "130px", objectFit: "cover" }}
                />
                <p className="text-center bg-secondary text-white">{p.title}</p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() => {
            dispatch({
              type: SET_VISIBLE,
              payload: false,
            });
          }}
          className="btn btn-success text-center btn-block mt-4"
        >
          {" "}
          Sepete git{" "}
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
