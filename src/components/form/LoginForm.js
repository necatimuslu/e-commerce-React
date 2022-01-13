import React, { useState, useEffect } from "react";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firabase";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_USER } from "../../constants/authConstants";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../actions/authActions";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
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
          roleBasedRedirect(res);
          toast.success("giriş işlemi başarıyla gerçekleşti");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token).then((res) => {
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
          roleBasedRedirect(res);
          toast.success("Google ile giriş başarılı şekilde gerçekleştirildi.");
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Lütfen email adresinizi giriniz"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="password">Şifre</label>
          <input
            type="password"
            id="password"
            placeholder="Lütfen şifrenizi  giriniz"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3 from-group">
          <button
            disabled={!email && password.length < 6}
            type="submit"
            className="btn btn-outline-primary btn-block "
          >
            <MailOutlined
              style={{
                marginRight: "10px",
                fontSize: 20,
                justifyContent: "center",
                textAlign: "center",
                justifyItems: "center",
              }}
            />
            Giriş yap
          </button>
        </div>
      </form>
    );
  };
  return (
    <div>
      {loading ? (
        <h4 className="text-danger">Yükleniyor..</h4>
      ) : (
        <h4>Giriş yap</h4>
      )}
      {loginForm()}

      <div className="mt-3 from-group">
        <button
          className="btn btn-outline-danger btn-block "
          onClick={googleLogin}
        >
          <GoogleOutlined
            style={{
              marginRight: "10px",
              fontSize: 20,
              justifyContent: "center",
              textAlign: "center",
              justifyItems: "center",
            }}
          />
          Google ile giriş yap
        </button>
      </div>

      <Link to="/forgot/password" className="text-success float-right mt-3">
        Şifre yenileme
      </Link>
    </div>
  );
};

export default LoginForm;
