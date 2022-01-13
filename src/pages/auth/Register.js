import React from "react";
import RegisterForm from "../../components/form/RegisterForm";

const Register = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-sm-12 p-5">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
