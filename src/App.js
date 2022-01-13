import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import SideDrawer from "./components/drawer/SideDrawer";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { auth } from "./firabase";
import { LOGIN_USER } from "./constants/authConstants";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./actions/authActions";
import UserHistory from "./pages/UserHistory";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminCategoryUpdate from "./pages/admin/AdminCategoryUpdate";
import AdminSub from "./pages/admin/AdminSub";
import AdminSubUpdate from "./pages/admin/AdminSubUpdate";
import AdminColorAndBrand from "./pages/admin/AdminColorAndBrand";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUpdateProduct from "./pages/admin/AdminUpdateProduct";
import ProductDetail from "./pages/ProductDetail";

import CategoryHome from "./pages/category/CategoryHome";
import SubDetail from "./pages/category/SubDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminCreateCoupon from "./pages/admin/AdminCreateCoupon";
import Payment from "./pages/Payment";
import Whishlist from "./pages/user/Whishlist";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGIN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <SideDrawer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product-detail/:id" exact component={ProductDetail} />
        <Route path="/category-detail/:id" exact component={CategoryHome} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/sub-detail/:id" exact component={SubDetail} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserRoute path="/user/history" exact component={UserHistory} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/whishlist" exact component={Whishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={AdminCategory} />
        <AdminRoute path="/admin/sub" exact component={AdminSub} />
        <AdminRoute path="/admin/coupon" exact component={AdminCreateCoupon} />
        <AdminRoute
          path="/admin/color-brand"
          exact
          component={AdminColorAndBrand}
        />
        <AdminRoute
          path="/admin/sub-update/:id"
          exact
          component={AdminSubUpdate}
        />
        <AdminRoute
          path="/admin/category-update/:id"
          exact
          component={AdminCategoryUpdate}
        />
        <AdminRoute path="/admin/product" exact component={AdminProduct} />
        <AdminRoute
          path="/admin/product-update/:id"
          exact
          component={AdminUpdateProduct}
        />
        <AdminRoute path="/admin/products" exact component={AdminProducts} />
      </Switch>
    </>
  );
};

export default App;
