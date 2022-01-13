import React from "react";
import AdminProductForm from "../../components/form/AdminProductForm";

import AdminNav from "../../components/nav/AdminNav";

const AdminProduct = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>
        <div className="col-md-10 col-sm-12">
          <AdminProductForm />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
