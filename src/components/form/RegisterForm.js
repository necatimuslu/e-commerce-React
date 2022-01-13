import React, { useState, useEffect } from "react";
import { auth } from "../../firabase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth
      .sendSignInLinkToEmail(email, config)
      .then((res) => {
        toast.success(
          `Kayıt linki ${email} adresinize gönderilmiştir.Lütfen linke tıklayıp üye olmalı işlemini tamamlayınız`
        );
        window.localStorage.setItem("emailForRegistration", email);
        setEmail("");
      })
      .catch((err) => toast.error(err.message));
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Kayıt için lütfen mail adresinizi giriniz"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-outline-secondary btn-block">
            Kayıt ol
          </button>
        </div>
      </form>
    );
  };
  return (
    <>
      <h4>Kayıt ol</h4>
      {registerForm()}
    </>
  );
};

export default RegisterForm;
