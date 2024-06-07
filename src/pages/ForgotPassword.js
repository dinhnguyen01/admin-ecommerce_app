import React from "react";
import CustomerInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-2">Quên mật khẩu</h2>
                <p className="text-muted text-center mb-5">
                  Nhập địa chỉ email của bạn để đặt lại mật khẩu
                </p>
                <form>
                  <div className="mb-3">
                    <CustomerInput type="text" label="Email" i_id="email" />
                  </div>
                  <div className="mb-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mt-4">
                      Gửi yêu cầu
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

export default ForgotPassword;
