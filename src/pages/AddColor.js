import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor, resetState } from "../features/color/colorSlice";

let schema = Yup.object({
  title: Yup.string().required("Cần nhập tên màu sắc"),
});

const AddColor = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess && createdColor) {
        toast.success("Thêm mới màu sắc thành công");
        setHasSubmitted(false);
      }
      if (isError) {
        toast.error("Gặp vấn đề khi thêm mới màu sắc!");
        setHasSubmitted(false);
      }
    }
  }, [isSuccess, isError, isLoading, createdColor, hasSubmitted]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      setHasSubmitted(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/color-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Thêm màu sắc</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên màu sắc"
            i_id="color-title"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <button
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

export default AddColor;
