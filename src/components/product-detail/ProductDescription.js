import React from "react";
import { Card, Tooltip } from "antd";
import StarRating from "react-star-ratings";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import RatingModal from "../modal/RatingModal";
import { ShowAverage } from "../../functions/rating";
import { createWhishlist } from "../../services/userService";
import { toast } from "react-toastify";
const ProductDescription = ({
  product,
  onStarClick,
  star,
  handleAddToCart,
  tooltip,
  history,
  user,
}) => {
  const handleWhishList = (e) => {
    e.preventDefault();
    createWhishlist(product._id, user?.token)
      .then((res) => {
        toast.success("Beğeni listesine eklendi");
        history.push("/user/whishlist");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h4
            style={{ fontSize: 40, backgroundColor: "#FBE9E7" }}
            className="text-center"
          >
            {product.title}
          </h4>
          {product && product.ratings && product.ratings.length ? (
            ShowAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">Değerlendirme yok</div>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Card
            actions={[
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <span style={{ color: "#1976D2" }}>Sepete Ekle </span> <br />
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px", color: "#388E3C" }}
                  />
                </a>
              </Tooltip>,
              <a onClick={handleWhishList}>
                <span style={{ color: "#1976D2" }}>Beğeni Listesine Ekle </span>{" "}
                <br />
                <HeartOutlined style={{ fontSize: "30px", color: "red" }} />
              </a>,
              <RatingModal>
                <StarRating
                  name={product._id}
                  rating={star}
                  numberOfStars={5}
                  starRatedColor="red"
                  changeRating={onStarClick}
                  isSelectable={true}
                />
              </RatingModal>,
            ]}
          >
            {product && (
              <ul className="list-group">
                <li className="list-group-item">
                  Fiyat{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong> {product.price} TL</strong>
                  </span>
                </li>

                <li className="list-group-item mt-3">
                  Kategori{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong>
                      <Link to={`/category/${product?.category?._id}`}>
                        {" "}
                        {product?.category?.name}
                      </Link>
                    </strong>
                  </span>
                </li>

                <li className="list-group-item mt-3">
                  Alt Kategori{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong>
                      <Link to={`/sub/${product?.sub?._id}`}>
                        {" "}
                        {product?.sub?.name}
                      </Link>
                    </strong>
                  </span>
                </li>

                <li className="list-group-item mt-3">
                  Renk{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong> {product?.color?.name}</strong>
                  </span>
                </li>

                <li className="list-group-item mt-3">
                  Brand{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong> {product?.brand?.name}</strong>
                  </span>
                </li>
                <li className="list-group-item mt-3">
                  Stok{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong> {product.quantity} Adet</strong>
                  </span>
                </li>
                <li className="list-group-item mt-3">
                  Satılan{" "}
                  <span className="label label-pill float-right">
                    {" "}
                    <strong> {product.sold} Adet</strong>
                  </span>
                </li>
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
