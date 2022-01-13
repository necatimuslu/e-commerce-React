import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { BiBookAdd } from "react-icons/bi";

import { getAllCategory } from "../../services/categoryService";
import { createSub } from "../../services/subService";
import { toast } from "react-toastify";
const SubAddCategoryForm = ({ fetchSubs }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createSub(user.token, { name, parent })
      .then((res) => {
        setName("");
        setParent("");
        toast.success("Alt kategori başarıyla eklendi");
        fetchSubs();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const subAddForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id="name">Alt kategori adı</label>
          <input
            type="text"
            placeholder="Lütfen alt kategori adını giriniz"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <select
            name="category"
            className="form-control"
            onChange={(e) => setParent(e.target.value)}
            value={parent}
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
          <button type="submit" className="btn btn-primary btn-block">
            {" "}
            <BiBookAdd size={25} /> Ekle
          </button>
        </div>
      </form>
    );
  };

  return <>{subAddForm()}</>;
};

export default SubAddCategoryForm;
