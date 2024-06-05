import React from "react";
import CustomerInput from "../components/CustomInput";
// import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-2">Đặt lại mật khẩu</h2>
                <p className="text-muted text-center mb-5">
                  Vui lòng nhập mật khẩu mới của bạn.
                </p>
                <form>
                  <div className="mb-3">
                    <CustomerInput type="text" label="Mật khẩu" id="pass" />
                  </div>
                  <div className="mb-3">
                    <CustomerInput
                      type="password"
                      label="Nhập lại mật khẩu"
                      id="re-pass"
                    />
                  </div>
                  <div className="mb-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mt-4">
                      Xác nhận
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

export default ResetPassword;
