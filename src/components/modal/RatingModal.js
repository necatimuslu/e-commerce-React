import React, { useState } from "react";
import { Modal } from "antd";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let history = useHistory();
  let params = useParams();
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product-detail/${params.id}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        {user ? "Değerlendir" : "Lütfen giriş yapınız"}
        <br />
        <StarOutlined style={{ fontSize: "30px", color: "#FFA726" }} />
      </div>
      <Modal
        title="Ürün değerlendir"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.dark("Değerlendirme işlemi başarıyla gerçekleştirildi");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
