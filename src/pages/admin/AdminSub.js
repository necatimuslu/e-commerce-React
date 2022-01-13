import React, { useState, useEffect } from "react";
import SubAddCategoryForm from "../../components/form/SubAddCategoryForm";
import SubList from "../../components/list/SubList";

import { getSubs } from "../../services/subService";
import AdminNav from "../../components/nav/AdminNav";
const AdminSub = () => {
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    fetchSubs();

    return () => {
      setSubs([]);
    };
  }, []);

  const fetchSubs = () => {
    getSubs()
      .then((res) => setSubs(res.data))
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
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
              <h4 className="text-center">Alt Kategori Ekle Sil Güncelle </h4>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3 col-sm-12">
                <div className="card-body">
                  <SubAddCategoryForm fetchSubs={fetchSubs} />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <input
                    type="search"
                    className="form-control  my-2"
                    placeholder="arama..."
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="card-body">
                  {subs
                    .filter((x) => x.name.toLowerCase().includes(keyword))
                    .map((sub) => (
                      <div key={sub._id} className="col-md-12">
                        <SubList sub={sub} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSub;
