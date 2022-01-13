import React, { useState } from "react";
import { Menu, Tooltip } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import firebase from "firebase";
import { LOGOUT } from "../../constants/authConstants";
import Search from "../form/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    history.push("/login");
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined style={{ fontSize: "18px" }} />}>
          <Link to="/"> Anasayfa</Link>
        </Item>

        <Item key="shop" icon={<ShopOutlined style={{ fontSize: "18px" }} />}>
          <Link to="/shop"> Mağaza</Link>
        </Item>
        <Tooltip title="Sepete git">
          <Item
            key="cart"
            icon={<AiOutlineShoppingCart style={{ fontSize: "18px" }} />}
          >
            <Link to="/cart">
              Sepet{" "}
              <span style={{ fontSize: "13px" }} className="badge badge-danger">
                {cart.length !== 0 && cart.length}
              </span>
            </Link>
          </Item>
        </Tooltip>

        <Item className="p-1 ml-auto">
          <Search />
        </Item>

        {user && (
          <SubMenu
            key="username"
            className="ml-auto"
            icon={<SettingOutlined />}
            title={user.email.split("@")[0]}
          >
            <Item key="dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>

            <Item icon={<LoginOutlined />} onClick={logout}>
              Çıkış
            </Item>
          </SubMenu>
        )}

        {!user && (
          <Item className="ml-auto" key="login" icon={<UserOutlined />}>
            <Link to="/login"> Giriş</Link>
          </Item>
        )}
        {!user && (
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register"> Kayıt ol</Link>
          </Item>
        )}
      </Menu>
    </>
  );
};

export default Header;
