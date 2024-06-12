import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createPcategory,
  resetState,
} from "../features/pcategory/pcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Cần nhập tên danh mục"),
});

const AddProdCat = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newPcategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdPcategory } = newPcategory;

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess && createdPcategory) {
        toast.success("Thêm mới danh mục thành công");
        setHasSubmitted(false);
      }
      if (isError) {
        toast.error("Gặp vấn đề khi thêm mới danh mục!");
        setHasSubmitted(false);
      }
    }
  }, [isSuccess, isError, isLoading, createdPcategory, hasSubmitted]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createPcategory(values));
      setHasSubmitted(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/product-category-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Thêm danh mục sản phẩm</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên danh mục"
            i_id="prodcat-title"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
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

export default AddProdCat;
