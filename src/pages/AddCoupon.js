import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupon, resetState } from "../features/coupons/couponSlice";

let schema = Yup.object({
  name: Yup.string().required("Cần nhập tên thuơng hiệu"),
  expiry: Yup.date().required("Cần nhập ngày tháng hết hạn").nullable(),
  discount: Yup.number()
    .required("Cần nhập số giảm giá")
    .typeError("Giảm giá phải là số"),
});

const AddCoupon = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess && createdCoupon) {
        toast.success("Thêm mới mã giảm giá thành công");
        setHasSubmitted(false);
      }
      if (isError) {
        toast.error("Gặp vấn đề khi thêm mới mã giảm giá!");
        setHasSubmitted(false);
      }
    }
  }, [isSuccess, isError, isLoading, createdCoupon, hasSubmitted]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values.expiry = new Date(values.expiry);
      dispatch(createCoupon(values));
      setHasSubmitted(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupons-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Thêm thẻ giảm giá</h3>
      <div>
        <form
          action=""
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <CustomInput
              type="text"
              label="Nhập mã giảm giá"
              i_id="coupon-name"
              name="name"
              onCh={formik.handleChange("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div>
            <CustomInput
              type="datetime-local"
              label="Nhập ngày hết hạn"
              i_id="coupon-expiry"
              name="expiry"
              onCh={formik.handleChange("expiry")}
              val={formik.values.expiry}
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>
          <div>
            <CustomInput
              type="text"
              label="Nhập giá trị giảm giá"
              i_id="coupon-discount"
              name="discount"
              onCh={formik.handleChange("discount")}
              val={formik.values.discount}
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
          </div>
          <button
            style={{ width: "100px" }}
            className="btn btn-success border-0 rounded-3 my-2"
            type="submit"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
