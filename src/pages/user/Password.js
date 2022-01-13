import React, { useState } from "react";

import { auth } from "../../firabase";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Şifreniz yenilenmiştir");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };

  const passwordResetForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id="resetPassword">Şifre</label>
          <input
            type="password"
            placeholder="Lütfen yeni şifrenizi giriniz"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            value={password}
          />
        </div>
        <div className="form-group">
          <button
            disabled={!password || password.length < 6}
            type="submit"
            className="btn btn-primary"
          >
            Gönder
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-2 col-sm-12">
          <UserNav />
        </div>
        <div className="col-md-10 col-sm-12 mt-4">
          <div className="row">
            <div className="col-md-9 offset-md-1 col-sm-12">
              <div className="card">
                <div className="card-header">
                  {loading ? (
                    <h4 className="text-danger">Yükleniyor...</h4>
                  ) : (
                    <h4>Şifre yenileme</h4>
                  )}
                </div>
                <div className="card-body">{passwordResetForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
