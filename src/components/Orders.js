import React from "react";

import ShowPaymentInfo from "./ShowPaymenInfo";
const Orders = ({ orders, handleStatusChange }) => {
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
  return (
    <>
      {orders.map((o) => (
        <div key={o._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo o={o} showStatus={false} />
            <div className="row">
              <div className="col-md-4">Teslimat Durumu</div>
              <div className="col-md-8">
                <select
                  defaultValue={o.orderStatus}
                  className="form-control"
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                  name="status"
                >
                  <option value="İşlem aşamasında">İşlem aşamasında</option>
                  <option value="İşleme alındı">İşleme alındı</option>
                  <option value="Sevk edildi">Sevk edildi </option>
                  <option value="İptal edildi">İptal edildi</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                  <option value="Kapıda ödeme">Kapıda ödeme</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(o)}
        </div>
      ))}
    </>
  );
};

export default Orders;
