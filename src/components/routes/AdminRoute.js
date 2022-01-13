import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";
import { adminUser } from "../../actions/authActions";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      adminUser(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
