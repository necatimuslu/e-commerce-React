import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Skeleton, Avatar, Checkbox, Radio } from "antd";
import {
  FolderViewOutlined,
  ShoppingCartOutlined,
  SortAscendingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { VscTypeHierarchySub } from "react-icons/vsc";
import {
  getProductCount,
  fetchProdutsByFilter,
} from "../services/productService";
import { Link } from "react-router-dom";
import { ShowAverage } from "../functions/rating";
import { Menu, Slider } from "antd";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { SEARCH_QUERY } from "../constants/searchConstants";
import { getAllCategory } from "../services/categoryService";
import { getSubs } from "../services/subService";
import { MdCategory } from "react-icons/md";
import Star from "../components/form/Star";
import { SiBrandfolder } from "react-icons/si";
import { getAllBrand, getAllColor } from "../services/colorAndBrandService";
import { IoColorPaletteOutline } from "react-icons/io5";
import ProductCard from "../components/list/ProductCard";
const { Meta } = Card;
const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [star, setStar] = useState("");
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    fetchProductCount();
    fetchCategory();
    fetchSubs();
    fetchBrandsAndColor();
    return () => {
      setProducts([]);
      setCategories([]);
      fetchSubs([]);
      setColors([]);
      setBrands([]);
    };
  }, []);

  const fetchProductCount = () => {
    setLoading(true);
    getProductCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchCategory = () => {
    getAllCategory().then((res) => setCategories(res.data));
  };
  const fetchSubs = () => {
    getSubs().then((res) => setSubs(res.data));
  };
  const fetchBrandsAndColor = () => {
    getAllBrand().then((res) => setBrands(res.data));
    getAllColor().then((res) => setColors(res.data));
  };
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProductSearch({ query: text });
      if (!text) {
        fetchProductCount();
      }
    }, 300);

    return () => {
      clearTimeout(delayed);
    };
  }, [text]);

  const fetchProductSearch = (arg) => {
    fetchProdutsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  useEffect(() => {
    fetchProductSearch({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setPrice(value);
    setCategoryIds([]);
    setStar("");
    setSubIds([]);
    setSub("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  const showCategories = () =>
    categories.map((c) => (
      <div className="mt-2" key={c._id}>
        <Checkbox
          onChange={handleChange}
          className="pb-3 pl-4 pr-4 "
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));
  const handleChange = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setPrice([0, 0]);
    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInThState = inTheState.indexOf(justChecked);

    if (foundInThState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInThState, 1);
    }

    setCategoryIds(inTheState);
    fetchProductSearch({ category: inTheState });
  };

  const showSubs2 = () =>
    subs.map((s) => (
      <div className="mt-2" key={s._id}>
        <Checkbox
          onChange={handleSubs}
          className="pb-3 pl-4 pr-4 "
          value={s._id}
          name="sub"
          checked={subIds.includes(s._id)}
        >
          {s.name ? s.name.substring(0, 20) + "..." : s.name}
        </Checkbox>
      </div>
    ));
  const handleSubs = (e) => {
    const subState = [...subIds];
    const checkedSub = e.target.value;
    const foundSubState = subState.indexOf(checkedSub);

    if (foundSubState === -1) {
      subState.push(checkedSub);
    } else {
      subState.splice(foundSubState, 1);
    }

    setSubIds(subState);
    fetchProductSearch({ sub: subState });
  };

  const handleStarClick = (num) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    fetchProductSearch({ stars: num });
  };

  const showStars = () => {
    return (
      <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    );
  };

  const handleSub = (s) => {
    console.log(s);
    setSub(s);
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    fetchProductSearch({ sub: s });
  };

  const showSubs1 = () =>
    subs.map((s) => (
      <div
        onClick={() => handleSub(s)}
        style={{ cursor: "pointer" }}
        key={s._id}
        className="p-1 m-1 badge badge-secondary"
      >
        {s.name}
      </div>
    ));

  const showBrand = () =>
    brands.map((b) => (
      <Radio
        className="pb-2 pl-5 pr-5"
        name="brand"
        checked={b === brand}
        onChange={handleBrand}
        key={b._id}
        value={b}
      >
        {b.name}
      </Radio>
    ));
  const handleBrand = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setSubIds([]);
    setBrand(e.target.value);
    fetchProductSearch({ brand });
  };

  const showColor = () =>
    colors.map((c) => (
      <Radio
        className="pb-2 pr-5 pl-5"
        name="color"
        checked={c === color}
        value={c}
        key={c._id}
        onChange={handleColor}
      >
        {c.name}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setSubIds([]);
    setBrand("");
    setColor(e.target.value);
    fetchProductSearch({ color });
  };
  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-3">
          <h4 className="text-center mt-2">Filtre</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <AiOutlineDollarCircle
                    style={{ fontSize: "25px" }}
                    className="mr-2"
                  />
                  Fiyat
                </span>
              }
            >
              <div>
                <Slider
                  max="99000"
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `TL${v}`}
                  value={price}
                  onChange={handleSlider}
                  range
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <MdCategory className="mr-2" style={{ fontSize: "25px" }} />
                  Kategoriler
                </span>
              }
            >
              {showCategories()}
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined className="mr-2" style={{ fontSize: "25px" }} />
                  Değerlendirme
                </span>
              }
            >
              {showStars()}
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <VscTypeHierarchySub
                    className="mr-2"
                    style={{ fontSize: "25px" }}
                  />
                  Alt Kategoriler
                </span>
              }
            >
              {showSubs1()}
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <SiBrandfolder
                    className="mr-2"
                    style={{ fontSize: "25px" }}
                  />
                  Markalar
                </span>
              }
            >
              {showBrand()}
              <br />
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <IoColorPaletteOutline
                    className="mr-2"
                    style={{ fontSize: "25px" }}
                  />
                  Renkler
                </span>
              }
            >
              {showColor()}
              <br />
            </SubMenu>
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <SortAscendingOutlined
                    className="mr-2"
                    style={{ fontSize: "25px" }}
                  />
                  Alt Kategoriler
                </span>
              }
            >
              {showSubs2()}
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-center text-danger">Yükleniyor...</h4>
          ) : (
            <h4 className="text-center">Ürünler</h4>
          )}
          <div className="row">
            {products && products.length < 1 ? (
              <div className="text-danger">Ürün bulunamadı</div>
            ) : (
              products.map((p) => {
                return (
                  <div key={p._id} className="col-md-4 mb-4">
                    {p && p.ratings && p.ratings.length === 0 ? (
                      <div
                        style={{ fontSize: "14px" }}
                        className="p-3 text-danger text-center"
                      >
                        Değerlendirilmedi
                      </div>
                    ) : (
                      ShowAverage(p)
                    )}
                    {loading ? (
                      <Skeleton active></Skeleton>
                    ) : (
                      <ProductCard p={p} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
