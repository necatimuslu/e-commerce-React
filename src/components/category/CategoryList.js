import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllCategory } from "../../services/categoryService";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchCategories();
    return () => {
      setCategories([]);
    };
  }, []);

  const fetchCategories = () => {
    getAllCategory().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <h4 className="text-danger text-center">Yükleniyor...</h4>
        ) : (
          <h4 className="text-center ">Kategori Listesi</h4>
        )}
        <div className="row ">
          {categories &&
            categories.map((c) => (
              <div
                key={c._id}
                className="col btn btn-outline-primary btn-lg btn-raised btn-block m-3"
                style={{ height: "40px", fontSize: "15px" }}
              >
                <Link to={`/category-detail/${c._id}`}> {c.name}</Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
