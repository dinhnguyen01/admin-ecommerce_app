import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object({
    email: Yup.string()
      .email("Địa chỉ email không hợp lệ")
      .required("Cần nhập email"),
    password: Yup.string().required("Cần nhập mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading, navigate]);

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
                <div className="error text-center">
                  {message.message === "Rejected"
                    ? "Bạn không phải quản trị viên"
                    : ""}
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <CustomerInput
                    i_class="mt-3"
                    name="email"
                    type="text"
                    label="Email"
                    i_id="email"
                    val={formik.values.email}
                    onCh={formik.handleChange("email")}
                    // onBl={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}

                  <CustomerInput
                    i_class="mt-3"
                    name="password"
                    type="password"
                    label="Mật khẩu"
                    i_id="pass"
                    val={formik.values.password}
                    onCh={formik.handleChange("password")}
                    // onBl={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}

                  <div className="mb-3 text-end">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none"
                    >
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
