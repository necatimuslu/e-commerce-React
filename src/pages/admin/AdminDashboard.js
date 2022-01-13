import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";

import { useDispatch, useSelector } from "react-redux";
import { getOrders, orderStatusChange } from "../../services/adminService";
import { toast } from "react-toastify";
import Orders from "../../components/Orders";
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchOrders();

    return () => {
      setOrders([]);
    };
  }, []);
  const fetchOrders = () => {
    getOrders(user?.token).then((res) => setOrders(res.data));
  };
  const handleStatusChange = (orderId, orderStatus) => {
    orderStatusChange(orderId, orderStatus, user?.token)
      .then((res) => {
        toast.success("Sipariş durumu güncellendi");
        fetchOrders();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>
        <div className="col-md-10 col-sm-12">
          <h4 className="text-center mt-3">Admin paneli</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
