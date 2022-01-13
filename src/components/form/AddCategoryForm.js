import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCategory, getAllCategory } from "../../services/categoryService";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategory();

    return () => {
      setCategories([]);
    };
  }, []);

  const fetchCategory = () => {
    getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory(user.token, { name })
      .then(() => {
        setName("");

        toast.success("Kategori başarıyla eklendi");
        fetchCategory();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label id="name">Kategori adı</label>
              <input
                type="text"
                placeholder="Lütfen kategori adı giriniz"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-block">
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
