import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { deleteSub } from "../../services/subService";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../services/categoryService";
const SubList = ({ sub }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchSubs();

    return () => {
      setCategories([]);
    };
  }, []);

  const fetchSubs = () => {
    getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-0 ">
          <p className="alert alert-secondary">{sub.name}</p>
        </div>
        <div className="col-md-2 px-0">
          <p className="alert alert-info">{sub.parent?.name}</p>
        </div>
        <div className="col-md-2">
          <p className="alert alert-danger text-center">
            <RiDeleteBin5Fill
              size={25}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteSub(user.token, sub._id);
                toast.info("Alt kategori başarıyla silindi");
                fetchSubs();
              }}
            />
          </p>
        </div>
        <div className="col-md-2">
          <p className="alert alert-success text-center">
            <Link to={`/admin/sub-update/${sub._id}`}>
              <GrDocumentUpdate size={25} />
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SubList;
