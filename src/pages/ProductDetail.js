import React, { useState, useEffect } from "react";
import ProductCarousel from "../components/product-detail/ProductCarousel";
import ProductDescription from "../components/product-detail/ProductDescription";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductById,
  ratingStar,
  releatedProduct,
} from "../services/productService";
import { Link } from "react-router-dom";
import { Card, Avatar, Tooltip } from "antd";
import { FolderViewOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import _ from "lodash";
import { ADD_TO_CART } from "../constants/cartConstants";
const { Meta } = Card;
const ProductDetail = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [releated, setReletated] = useState([]);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [star, setStar] = useState(0);
  const [tooltip, setTooltip] = useState("Sepete Ekle");
  let dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();

    return () => {
      setProduct({});
    };
  }, []);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (p) => p.postedBy.toString() === user._id.toString()
      );

      existingRatingObject && setStar(existingRatingObject.star);
    }

    return () => {
      setReletated([]);
    };
  }, []);

  const fetchProduct = async () => {
    await getProductById(match.params.id).then((res) => {
      setProduct(res.data);

      releatedProduct(res.data._id).then((res) => setReletated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    ratingStar(name, star, user.token).then((res) => {
      console.log(res.data);
      fetchProduct();
    });
  };
  const handleAddToCart = () => {
    setTooltip("Sepete Eklendi");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Sepete Eklendi");
      dispatch({
        type: ADD_TO_CART,
        payload: unique,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-7">
          <ProductCarousel product={product} />
        </div>
        <div className="col-md-5">
          <ProductDescription
            product={product}
            onStarClick={onStarClick}
            star={star}
            handleAddToCart={handleAddToCart}
            tooltip={tooltip}
            history={history}
            user={user}
          />
        </div>
      </div>
      <div className="row mt-2 pb-5">
        <div className="col-md-12">
          <h4 className="text-center">Benzer Ürünler</h4>
        </div>
        {releated &&
          releated.map((r) => {
            return (
              <div key={r._id} className="col-md-4">
                <Card
                  cover={
                    <img
                      src={r.image}
                      style={{ height: "300px", objectFit: "cover" }}
                      className="img-fluid"
                    />
                  }
                  actions={[
                    <Link to={`/product-detail/${r._id}`}>
                      <FolderViewOutlined
                        key="Ürün detay"
                        style={{ fontSize: 30, color: "#009688" }}
                      />{" "}
                      <br />
                      <strong> Ürün detayı</strong>
                    </Link>,
                    <Tooltip title={tooltip}>
                      <a onClick={handleAddToCart}>
                        <ShoppingCartOutlined
                          key="Sepete ekle"
                          style={{ fontSize: 30, color: "#03A9F4" }}
                        />{" "}
                        <strong>Sepete Ekle</strong>
                      </a>
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={r.image} />}
                    title={r.title}
                    description={
                      r.description
                        ? r.description.substring(0, 80) + "..."
                        : r.description
                    }
                  />
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductDetail;
