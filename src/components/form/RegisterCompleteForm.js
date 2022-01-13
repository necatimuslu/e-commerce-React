import React, { useState, useEffect } from "react";
import { auth } from "../../firabase";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../constants/authConstants";
import { createOrUpdateUser } from "../../actions/authActions";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));

    return () => {
      setEmail("");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGIN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Kayıt için lütfen şifrenizi giriniz"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-outline-secondary btn-block">
            Kayıt Tamamla
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

export default RegisterComplete;
