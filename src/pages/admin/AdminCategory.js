import React, { useState, useEffect } from "react";
import AddCategoryForm from "../../components/form/AddCategoryForm";
import CategoryList from "../../components/list/CategoryList";
import AdminNav from "../../components/nav/AdminNav";
import { getAllCategory } from "../../services/categoryService";
const AdminCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategory();
    return () => {
      setCategories([]);
    };
  }, []);

  const fetchAllCategory = () => {
    getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>
        <div className="col-md-10 col-sm-12">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center ">Kategori Ekle</h4>
                </div>
                <div className="card-body">
                  <AddCategoryForm />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 col-sm-12">
              <CategoryList
                fetchAllCategory={fetchAllCategory}
                categories={categories}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
