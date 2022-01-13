import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import { FolderViewOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import { bestProducts } from "../../services/productService";
import { Pagination } from "antd";
import { countProducts } from "../../services/productService";
import { ShowAverage } from "../../functions/rating";
import ProductCard from "./ProductCard";

const { Meta } = Card;
const BestSellersList = () => {
  const [best, setBest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    bestList();
    return () => {
      setBest([]);
    };
  }, []);
  const bestList = () => {
    setLoading(true);
    bestProducts("sold", "desc", page).then((res) => {
      setBest(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    countProducts().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      <h4
        style={{ height: "70px" }}
        className="text-center p-5 mt-3 mb-3 jumbotron "
      >
        Çok Satanlar
      </h4>
      <div className="container">
        <div className="row mt-2">
          {best.map((p) => {
            return (
              <div key={p._id} className="col-md-4">
                {p && p.ratings && p.ratings.length && ShowAverage(p)}
                {loading ? <Skeleton active></Skeleton> : <ProductCard p={p} />}
              </div>
            );
          })}
        </div>
        <div className="row p-4">
          <div className="col-md-4 offset-md-4 text-center pt-4 p-2">
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellersList;
