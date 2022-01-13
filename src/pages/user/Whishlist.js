import React, { useState, useEffect } from "react";

import { getWhishlist, deleteWhishlist } from "../../services/userService";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Whishlist = () => {
  const [whislists, setWhishlist] = useState([]);
  let { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    fetchWhistlists();
    return () => {
      setWhishlist([]);
    };
  }, []);
  whislists.map((w) => console.log(w));
  const fetchWhistlists = () =>
    getWhishlist(user?.token)
      .then((res) => setWhishlist(res.data.wishlist))
      .catch((err) => console.log(err));

  const handleRemove = (id) =>
    deleteWhishlist(id, user?.token)
      .then((res) => toast.success("Beğeni silindi"))
      .catch((err) => console.log(err));
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2 col-sm-12">
          <UserNav />
        </div>
        <div className="col-md-8">
          <h4 className="text-center">Beğeni Listesi</h4>

          {whislists.map((w) => (
            <div key={w._id} className="row">
              <div className="col-md-8">
                <div className="alert alert-secondary">
                  <Link to={`/product-detail/${w._id}`}> {w.title} </Link>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  onClick={async () => {
                    await handleRemove(w._id);
                    fetchWhistlists();
                  }}
                  className="btn btn-outline-light"
                >
                  <DeleteOutlined
                    style={{
                      fontSize: "40px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whishlist;
