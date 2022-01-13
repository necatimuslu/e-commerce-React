import React from "react";

const ShowPaymenInfo = ({ o, showStatus = true }) => {
  return (
    <div className="text-center">
      <p>
        <span>
          <strong>Sipariş No : </strong>
          {o.paymentIntent.id}
        </span>{" "}
        <span>
          <strong>Sipariş Toplam : </strong>{" "}
          {o.paymentIntent.amount.toLocaleString("tr-TR", {
            style: "currency",
            currency: "TRY",
          })}{" "}
        </span>{" "}
        <span>
          {" "}
          <strong>Sipariş :</strong> {o.paymentIntent.status.toUpperCase()}
        </span>{" "}
        <span>
          <strong> Sipariş Tarihi : </strong>{" "}
          {new Date(o.paymentIntent.created * 100).toLocaleString()}
        </span>{" "}
        <br />
        {showStatus && (
          <span>
            <strong
              style={{ fontSize: "14px" }}
              className="badge badge-success"
            >
              {" "}
              Sipariş Durumu :{" "}
            </strong>{" "}
            <span style={{ fontSize: "14px" }} className="badge badge-info">
              {o.orderStatus}{" "}
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

export default ShowPaymenInfo;
