import React, { useState, useEffect } from "react";
import { Card, Pagination } from "antd";

import { limitProducts, countProducts } from "../../services/productService";

import { Skeleton } from "antd";
import { ShowAverage } from "../../functions/rating";
import ProductCard from "./ProductCard";

const UserProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    countProduct();

    return () => {
      setLoading(false);
      setProducts([]);
    };
  }, [page]);

  useEffect(() => {
    countProducts().then((res) => setProductsCount(res.data));
  }, []);

  const countProduct = () => {
    setLoading(true);
    limitProducts("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <h4
        style={{ height: "70px" }}
        className="text-center p-5 mt-3 mb-3 jumbotron "
      >
        Yeni Ürünler
      </h4>
      <div className="container">
        <div className="row">
          {products.map((p) => {
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

export default UserProductList;
