import React, { useState, useEffect } from "react";

import { BiAddToQueue, BiCommentAdd } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  getAllColor,
  getAllBrand,
  createBrand,
  createColor,
  deleteBrand,
  deleteColor,
} from "../../services/colorAndBrandService";
import AdminNav from "../../components/nav/AdminNav";
const AdminColorAndBrand = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  const [colorList, setColorList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    fetchColorAndBrand();
    return () => {
      setColorList([]);
      setBrand([]);
    };
  }, []);

  const fetchColorAndBrand = () => {
    getAllColor()
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err));
    getAllBrand()
      .then((res) => setBrandList(res.data))
      .catch((err) => console.log(err));
  };

  const handleColorSubmit = async (e) => {
    e.preventDefault();

    await createColor({ name })
      .then((res) => toast.dark("Renk Başarıyla Eklendi"))
      .catch((err) => console.log(err));
    fetchColorAndBrand();
    setName("");
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    await createBrand({ name: brand })
      .then((res) => toast.info("Marka Başarıyla Eklendi"))
      .catch((err) => console.log(err));
    setBrand("");
    fetchColorAndBrand();
  };

  const colorForm = () => (
    <form onSubmit={handleColorSubmit}>
      <div className="form-group">
        <label id="name">Renk Adı</label>
        <input
          id="name"
          type="text"
          placeholder="Lütfen renk adı giriniz"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-info btn-block">
          <BiCommentAdd size={25} />
          Ekle
        </button>
      </div>
    </form>
  );

  const brandForm = () => (
    <form onSubmit={handleBrandSubmit}>
      <div className="form-group">
        <label id="name">Marka Adı</label>
        <input
          id="name"
          type="text"
          placeholder="Lütfen marka adı giriniz"
          onChange={(e) => setBrand(e.target.value)}
          className="form-control"
          value={brand}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success btn-block">
          <BiAddToQueue size={25} />
          Ekle
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2 col-sm-12">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <h4 className="text-center">Renk Ekle</h4>
              {colorForm()}
            </div>
            <div className="col-md-6">
              <h4 className="text-center">Marka Ekle</h4>
              {brandForm()}
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="text-center text-danger">Renk Listesi</h5>
                </div>
                <div className="card-body">
                  {colorList.map((c) => (
                    <div className="row">
                      <div className="col-md-10">
                        <p className="alert alert-success">{c.name}</p>
                      </div>
                      <div className="col-md-2 alert alert-warning text-center ">
                        <RiDeleteBinFill
                          size={25}
                          color={"red"}
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            await deleteColor(c._id).then(() => {
                              toast.error("Renk Silindi");
                            });
                            fetchColorAndBrand();
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="text-center text-warning">Marka Listesi</h5>
                </div>
                <div className="card-body">
                  {brandList.map((b) => (
                    <div className="row">
                      <div className="col-md-10">
                        {" "}
                        <p className="alert alert-info">{b.name}</p>
                      </div>
                      <div className="col-md-2 alert alert-success text-center ">
                        <RiDeleteBinFill
                          size={25}
                          color={"purple"}
                          style={{ cursor: "pointer" }}
                          onClick={async () => {
                            await deleteBrand(b._id).then(() => {
                              toast.warn("Marka Silindi");
                            });
                            fetchColorAndBrand();
                          }}
                        />
                      </div>
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

export default AdminColorAndBrand;
