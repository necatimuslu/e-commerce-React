import React, { useEffect, useState } from "react";
import UserNav from "../components/nav/UserNav";

import { getUserOrders } from "../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { BsFillFilePdfFill } from "react-icons/bs";
import { toast } from "react-toastify";
import ShowPaymenInfo from "../components/ShowPaymenInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPdf from "../components/OrderPdf";
const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  let { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    fetchOrder();

    return () => {
      setOrders([]);
    };
  }, []);

  const fetchOrder = () => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Ürün Adı</th>
          <th scope="col">Fiyat</th>
          <th scope="col">Marka</th>
          <th scope="col">Renk</th>
          <th scope="col">Adet</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p) => (
          <tr key={p._id}>
            <td>{p.product.title}</td>
            <td>{p.product.price} TL</td>
            <td>{p.product.brand.name}</td>
            <td>{p.product.color.name}</td>
            <td>{p.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.reverse().map((o, i) => (
      <div key={i} className="m-5 p-2 card">
        <ShowPaymenInfo o={o} />
        {showOrderInTable(o)}
        <div className="row">
          <div className="col">
            <p className="text-center">
              {" "}
              <BsFillFilePdfFill style={{ fontSize: "30px", color: "red" }} />
              {showDowloadLink(o)}
            </p>
          </div>
        </div>
      </div>
    ));
  const showDowloadLink = (order) => {
    return (
      <PDFDownloadLink
        document={<OrderPdf order={order} />}
        fileName="siparis.pdf"
        className="btn btn-sm btn-block btn-outline-light text-dark mt-2"
      >
        Pdf İndir
      </PDFDownloadLink>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <UserNav />
        </div>
        <div className="col-md-10 col-sm-12">
          {orders.length ? (
            <h4 className="p-3 text-center">Sipariş Geçmişi</h4>
          ) : (
            <h4 className="p-3 text-center">Sipariş bulunamadı</h4>
          )}
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
