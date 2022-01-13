import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProduct } from "../../actions/productAction";
import { BiCategoryAlt } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { RiNumbersFill, RiDeleteBin4Fill } from "react-icons/ri";
import { FaCertificate } from "react-icons/fa";
import { VscSymbolColor } from "react-icons/vsc";
import { HiSortDescending } from "react-icons/hi";
import { MdOutlineSubtitles, MdOutlineUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AdminProductList = ({ p }) => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-center">
          <MdOutlineSubtitles size={30} className="mr-1" color={"#607D8B"} />
          {p.title}
        </h4>
        <div className="card-img text-center">
          <img
            src={p.image}
            className="img-fluid "
            style={{
              height: "250px",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          <HiSortDescending size={20} className="mr-2" />
          <strong>Açıklama : </strong>
          {p.description
            ? p.description.substring(0, 100) + "..."
            : p.description}
        </p>
        <p className="card-text">
          Kategori Adı:{" "}
          <strong>
            <BiCategoryAlt size={20} color={"#4FC3F7"} className="mr-2" />{" "}
            {p.category.name}
          </strong>{" "}
        </p>
        <p className="card-text">
          Fiyat :{" "}
          <strong>
            <ImPriceTag size={20} color={"red"} className="mr-2" />
            {p.price + " " + "TL"}
          </strong>
        </p>
        <p className="card-text">
          Adet :
          <strong>
            <RiNumbersFill size={20} color={"#1565C0"} className="mr-2" />
            {p.quantity}
          </strong>
        </p>
        <p className="card-text">
          Alt Kategori :{" "}
          <strong>
            <FaCertificate size={20} color={"#512DA8"} className="mr-2" />
            {p.sub.name}
          </strong>
        </p>
        <p className="card-text">
          Renk :{" "}
          <strong>
            <VscSymbolColor size={20} color={"#FF9800"} className="mr-2" />
            {p.color.name}
          </strong>
        </p>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <button className="btn btn-outline-success btn-block">
              <Link to={`/admin/product-update/${p._id}`}>
                {" "}
                <MdOutlineUpdate size={25} /> Güncelle{" "}
              </Link>
            </button>
          </div>
          <div className="col-md-6 col-sm-12">
            <button
              className="btn btn-outline-danger float-right btn-block"
              onClick={async () => {
                await dispatch(deleteProduct(user.token, p._id, toast));
                await dispatch(fetchAllProduct());
              }}
            >
              <RiDeleteBin4Fill size={25} />
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
