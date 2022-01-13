import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../components/nav/AdminNav";
import { getSubById, updateSub } from "../../services/subService";
import { getAllCategory } from "../../services/categoryService";
import { toast } from "react-toastify";
const AdminSubUpdate = ({ match, history }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    fetchSub();
    fethcCategories();

    return () => {
      setName("");
      setParent("");
      setCategories([]);
    };
  }, []);

  const fetchSub = () => {
    getSubById(match.params.id)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent.name);
      })
      .catch((err) => console.log(err));
  };

  const fethcCategories = () => {
    getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateSub(user.token, { name, parent }, match.params.id)
      .then((res) => {
        toast.success("Alt kategori başarıyla güncellendi");
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const updateSubForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            name="category"
            className="form-control"
            onChange={(e) => setParent(e.target.value)}
          >
            <option>Lütfen alt kategori seçiniz</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
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
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-2 col-sm-12">
            <AdminNav />
          </div>
          <div className="col-md-10 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4>Alt Kategori Güncelle</h4>
              </div>
              <div className="row">
                <div className="col-md-6 offset-sm-3 col-sm-12">
                  <div className="card-body">{updateSubForm()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSubUpdate;
