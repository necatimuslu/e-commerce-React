import React from "react";
import LoginForm from "../../components/form/LoginForm";

const Login = () => {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
