import React, { useEffect, useState } from "react";

import {
  createCoupon,
  listCoupon,
  removeCoupon,
} from "../../services/couponService";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DataPicker from "react-datepicker";
import AdminNav from "../../components/nav/AdminNav";
import { RiDeleteBin3Fill } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
const AdminCreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpriy] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchCoupons();
    return () => {
      setCoupons([]);
    };
  }, []);
  const fetchCoupons = () => {
    listCoupon()
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} başarıyla oluşturuldu`);
        setLoading(false);
        setName("");
        setDiscount("");
        setExpriy("");
        fetchCoupons();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const couponList = () => {
    return (
      <>
        {coupons.map((c) => (
          <tbody key={c._id}>
            <tr className="text-center">
              <td>{c.name}</td>
              <td>{c.discount} % </td>
              <td>{new Date(c.expiry).toLocaleDateString()}</td>
              <td>
                <RiDeleteBin3Fill
                  style={{
                    fontSize: "30px",
                    color: "#FF3D00",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    await removeCoupon(c._id, user.token)
                      .then((res) => toast.warning("Kupon silindi"))
                      .catch((err) => console.log(err));
                    fetchCoupons();
                  }}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 p-3">
          {loading ? (
            <h4 className="text-danger text-center"> Yükleniyor</h4>
          ) : (
            <h4 className="text-center">Hediye Kupon Kayıt </h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label id="name" className="text-muted">
                Kupon adı
              </label>
              <input
                type="text"
                placeholder="  Kupon adı"
                id="name"
                className="form-control form-check-inline"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                style={{ border: "none", borderBottom: "1px solid #ccc" }}
              />
            </div>
            <div className="form-group mt-1 mb-1">
              <label id="discount" className="text-muted">
                İndirim %
              </label>
              <input
                type="number"
                placeholder="Kupon indirimi "
                id="discount"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
                style={{ border: "none", borderBottom: "1px solid #ccc" }}
              />
            </div>
            <div className="form-group mt-1 mb-1">
              <label id="expiry" className="text-muted">
                Tarih
              </label>
              <DataPicker
                type="text"
                id="expiry"
                onChange={(date) => setExpriy(date)}
                value={expiry}
                selected={new Date()}
                required
                className="dateInput"
                placeholderText="Lütfen tarih seçiniz"
              />
            </div>
            <div className="form-group mt-3 mb-1">
              <button type="submit" className="btn btn-outline-primary">
                Kaydet
              </button>
            </div>
          </form>
          <div className="row">
            <div className="col-md-12">
              <h4
                style={{ fontWeight: "bold", color: "#1565C0" }}
                className="text-center"
              >
                Kupon Listesi{" "}
              </h4>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr className="text-center">
                    <th scope="col">Kupon adı</th>
                    <th scope="col">İndirim Tutarı % </th>
                    <th scope="col">Kupon Tarihi</th>
                    <th scope="col">Aksiyon</th>
                  </tr>
                </thead>
                {couponList()}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCoupon;
