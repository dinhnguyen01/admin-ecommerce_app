import React from "react";
import { Link } from "react-router-dom";
import CustomerInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-2">Đăng Nhập</h2>
                <p className="text-muted text-center mb-5">
                  Đăng nhập vào tài khoản của bạn để tiếp tục
                </p>
                <form>
                  <div className="mb-3">
                    <CustomerInput type="text" label="Email" id="email" />
                  </div>
                  <div className="mb-3">
                    <CustomerInput type="password" label="Mật khẩu" id="pass" />
                  </div>
                  <div className="mb-3 text-end">
                    <Link to="/reset-password" className="text-decoration-none">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="mb-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
