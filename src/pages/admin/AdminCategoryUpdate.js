import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  getCategoryById,
  updateCategory,
} from "../../services/categoryService";
import { toast } from "react-toastify";
const AdminCategoryUpdate = ({ match, history }) => {
  const [name, setName] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    fetchCategory();

    return () => {
      setName([]);
    };
  }, []);
  const fetchCategory = () => {
    getCategoryById(match.params.id).then((res) => {
      setName(res.data.name);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCategory(user.token, match.params.id, { name });
    toast.success("Kategori başarıyla güncellendi");
    history.push("/admin/category");
  };

  const updateCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id="name">Kategori adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-warning btn-block">
            Güncelle
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>

        <div className="col-md-10 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Kategori Güncelle</h4>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3 col-sm-12">
                <div className="card-body">{updateCategoryForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryUpdate;
