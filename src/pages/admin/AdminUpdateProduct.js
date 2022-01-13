import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../actions/productAction";
import { getAllCategory } from "../../services/categoryService";
import { getSubs } from "../../services/subService";
import { getAllBrand, getAllColor } from "../../services/colorAndBrandService";

import { getProductById } from "../../services/productService";
import AdminNav from "../../components/nav/AdminNav";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";

const AdminUpdateProduct = ({ match, history }) => {
  const [values, setValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  useEffect(() => {
    fetchProduct();
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

  const fetchProduct = () => {
    getProductById(match.params.id).then((res) => {
      setValues({ ...values, ...res.data });
    });
  };

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

    await dispatch(
      updateProduct(user.token, values, match.params.id, history, toast)
    );
  };
  const productUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-1">
          <input
            type="text"
            placeholder="Ürün başlığı giriniz"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="form-control"
            value={values.title}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Açıklama giriniz"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            value={values.description}
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <input
            type="number"
            placeholder="Fiyat giriniz"
            onChange={(e) => setValues({ ...values, price: e.target.value })}
            className="form-control"
            value={values.price}
          />
        </div>
        <div className="form-group my-2">
          <select
            name="category"
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            className="form-control"
            value={values.category}
          >
            <option>Kategori seçiniz</option>
            {
              (categories.length > 0,
              categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              )))
            }
          </select>
        </div>
        <div className="form-group my-2">
          <select
            name="sub"
            onChange={(e) => setValues({ ...values, sub: e.target.value })}
            className="form-control"
            value={values.sub}
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
            onChange={(e) => setValues({ ...values, quantity: e.target.value })}
            className="form-control"
            value={values.quantity}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="number"
            placeholder="Satılan Adet giriniz"
            onChange={(e) => setValues({ ...values, sold: e.target.value })}
            className="form-control"
            value={values.sold}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Kargo giriniz"
            onChange={(e) => setValues({ ...values, shipping: e.target.value })}
            className="form-control"
            value={values.shipping}
          />
        </div>
        <div className="form-group my-2">
          <select
            name="color"
            onChange={(e) => setValues({ ...values, color: e.target.value })}
            className="form-control"
            value={values.color}
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
            onChange={(e) => setValues({ ...values, brand: e.target.value })}
            className="form-control"
            value={values.brand}
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
            onDone={({ base64 }) => setValues({ ...values, image: base64 })}
            value={values.image}
          />
        </div>
        <div className="form-group my-2 text-center">
          <button
            style={{ width: "30%", borderRadius: "10px" }}
            className="btn btn-primary "
          >
            Güncelle
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2 ">
          <AdminNav />
        </div>

        <div className="col-md-10 ">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Ürün Güncelle</h4>
            </div>
            <div className="card-body">{productUpdateForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
