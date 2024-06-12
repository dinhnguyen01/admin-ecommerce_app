import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBcategory,
  resetState,
} from "../features/bcategory/bcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Cần nhập tên danh mục"),
});

const AddBlogCat = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newBcategory = useSelector((state) => state.bcategory);
  const { isSuccess, isError, isLoading, createdBcategory } = newBcategory;

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess && createdBcategory) {
        toast.success("Thêm mới danh mục thành công");
        setHasSubmitted(false);
      }
      if (isError) {
        toast.error("Gặp vấn đề khi thêm mới danh mục!");
        setHasSubmitted(false);
      }
    }
  }, [isSuccess, isError, isLoading, createdBcategory, hasSubmitted]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBcategory(values));
      setHasSubmitted(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Thêm danh mục tin tức</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên danh mục"
            i_id="blog-cat_title"
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

export default AddBlogCat;
