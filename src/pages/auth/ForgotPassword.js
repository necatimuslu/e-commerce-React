import React, { useState } from "react";
import { auth } from "../../firabase";

import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const form = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const config = {
        url: "http://localhost:3000/login",
        handleCodeInApp: true,
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          setEmail("");
          setLoading(false);
          toast.success(
            `Şifre yenileme linki ${email} adresinize gönderilmiştir.`
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Lütfen şifresini yenilemek istediğiniz email adresini giriniz"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={!email} className="btn btn-danger">
            Gönder
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          {loading ? (
            <h4 className="text-danger">Yükleniyor...</h4>
          ) : (
            <h4>Şifre Yenileme</h4>
          )}
          {form()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
