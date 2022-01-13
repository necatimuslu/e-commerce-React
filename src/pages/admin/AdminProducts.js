import React, { useState, useEffect } from "react";

import AdminNav from "../../components/nav/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../actions/productAction";
import AdminProductList from "../../components/list/AdminProductList";
const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-1 ">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>
        <div className="col-md-10 col-sm-12">
          <div className="row ">
            {products.length > 0 &&
              products.map((p) => (
                <div key={p._id} className="col-md-4 mb-2">
                  {" "}
                  <AdminProductList p={p} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
