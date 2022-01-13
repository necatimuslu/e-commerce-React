import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { createProduct } from "../../actions/productAction";
import { getAllCategory } from "../../services/categoryService";
import { getSubs } from "../../services/subService";
import { getAllColor, getAllBrand } from "../../services/colorAndBrandService";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  sub: "",
  quantity: 1,
  sold: 0,
  image: "",
  shipping: ["Yes", "No"],
  color: "",
  brand: "",
};
const AdminProductForm = () => {
  const [productForm, setProductForm] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    fetchCategory();
    fetchSub();
    allColors();
    allBrand();
    return () => {
      setCategories([]);
      setSubs([]);
      setColors([]);
      setBrands([]);
    };
  }, []);

  const fetchCategory = async () => {
    await getAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };
  const fetchSub = async () => {
    await getSubs()
      .then((res) => setSubs(res.data))
      .catch((err) => console.log(err));
  };
  const allColors = async () => {
    await getAllColor()
      .then((res) => setColors(res.data))
      .catch((err) => console.log(err));
  };

  const allBrand = async () => {
    await getAllBrand()
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(user.token, productForm, toast, history));
  };

  const formProduct = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-1">
          <input
            type="text"
            placeholder="Ürün başlığı giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, title: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Açıklama giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <input
            type="number"
            placeholder="Fiyat giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <select
            name="category"
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            className="form-control"
          >
            <option>Kategori seçiniz</option>
            {categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <select
            name="sub"
            onChange={(e) =>
              setProductForm({ ...productForm, sub: e.target.value })
            }
            className="form-control"
          >
            <option>Alt Kategori seçiniz</option>
            {subs.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <input
            type="number"
            placeholder="Adet giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, quantity: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <input
            type="number"
            placeholder="Satılan Adet giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, sold: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Kargo giriniz"
            onChange={(e) =>
              setProductForm({ ...productForm, shipping: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <select
            name="color"
            onChange={(e) =>
              setProductForm({ ...productForm, color: e.target.value })
            }
            className="form-control"
          >
            <option>Renk seçiniz</option>
            {colors.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <select
            name="brand"
            onChange={(e) =>
              setProductForm({ ...productForm, brand: e.target.value })
            }
            className="form-control"
          >
            <option>Marka seçiniz</option>
            {brands.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group pt-2">
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProductForm({ ...productForm, image: base64 })
            }
          />
        </div>
        <div className="form-group my-2 text-center">
          <button
            style={{ width: "30%", borderRadius: "10px" }}
            className="btn btn-primary "
          >
            Ekle
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Ürün Ekleme</h4>
          </div>
          <div className="card-body">{formProduct()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
