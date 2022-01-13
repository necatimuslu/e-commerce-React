import React, { useEffect, useState } from "react";
import { getSubById } from "../../services/subService";
import { Card, Skeleton, Avatar } from "antd";
import { ShowAverage } from "../../functions/rating";
import { FolderViewOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;
const SubDetail = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSub();
    return () => {
      setSub([]);
    };
  }, []);

  const fetchSub = () => {
    setLoading(true);
    getSubById(match.params.id).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center text-danger jumbotron p-3 mt-1 mb-5 display-4">
              Yükleniyor...
            </h4>
          ) : (
            <h4 className="text-center  jumbotron p-3 mt-1 mb-5 display-4">
              {products.length} adet "{sub.name}" listelendi
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => {
          return (
            <>
              <div key={p._id} className="col-md-4 mt-2 mb-2">
                {loading ? null : p && p.ratings && p.ratings.length === 0 ? (
                  <div className="text-danger text-center mt-4 pb-4">
                    Değerlendirilmedi
                  </div>
                ) : (
                  ShowAverage(p)
                )}
                {loading ? (
                  <Skeleton active></Skeleton>
                ) : (
                  <Card
                    cover={
                      <img
                        src={p.image}
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                        className="img-fluid"
                      />
                    }
                    actions={[
                      <Link to={`/product-detail/${p._id}`}>
                        <FolderViewOutlined
                          key="Ürün detay"
                          style={{ fontSize: 30, color: "#009688" }}
                        />{" "}
                        <br />
                        <strong> Ürün detayı</strong>
                      </Link>,
                      <>
                        <ShoppingCartOutlined
                          key="Sepete ekle"
                          style={{ fontSize: 30, color: "#03A9F4" }}
                        />{" "}
                        <strong>Sepete Ekle</strong>
                      </>,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={p.image} />}
                      title={p.title}
                      description={
                        p.description
                          ? p.description.substring(0, 80) + "..."
                          : p.description
                      }
                    />
                  </Card>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SubDetail;
