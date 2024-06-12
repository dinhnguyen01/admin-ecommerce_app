import React, { useEffect, useState, useCallback } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomInput from "../components/CustomInput";
import { Select, ConfigProvider } from "antd";
import { getBcategories } from "../features/bcategory/bcategorySlice";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { base_img_url } from "../utils/base_url";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_primaryImg,
  upload_primaryImg,
} from "../features/upload/uploadSlice";
import { createBlog, resetState } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

let schema = Yup.object({
  title: Yup.string().required("Cần nhập tiêu đề tin tức"),
  category: Yup.string().required("Cần chọn danh mục tin tức"),
  description: Yup.string().required("Cần nhập nội dung tin tức"),
});

const AddBlog = () => {
  const imageURLPrefix = base_img_url;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);

  const primary_imageState = useSelector((state) => state.upload.primaryImage);

  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const options_category = bcategoryState.map((category) => {
    return {
      label: category.title,
      value: category.title,
    };
  });

  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess && createdBlog) {
        toast.success("Thêm mới tin tức thành công");
        setHasSubmitted(false);
      }
      if (isError) {
        toast.error("Gặp vấn đề khi thêm mới tin tức!");
        setHasSubmitted(false);
      }
    }
  }, [isSuccess, isError, isLoading, createdBlog, hasSubmitted]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      // images: [],
      primaryImage: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      setHasSubmitted(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 2000);
    },
  });

  const updateImagesField = useCallback(() => {
    formik.setFieldValue("primaryImage", primary_imageState);
  }, [formik, primary_imageState]);

  useEffect(() => {
    if (formik.values.primaryImage.length !== primary_imageState.length) {
      updateImagesField();
    }
  }, [
    updateImagesField,
    formik.values.primaryImage.length,
    primary_imageState.length,
  ]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const text = rawContentState.blocks.map((block) => block.text).join("\n");
    formik.setFieldValue("description", text);
  };

  const handlePrimaryImageUpload = (acceptedFiles) => {
    dispatch(upload_primaryImg(acceptedFiles));
  };

  const handleDeletePrimaryImage = (imageUrl) => {
    const filename = extractFilename(imageUrl);
    dispatch(delete_primaryImg(filename));
  };

  const extractFilename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div>
      <h3 className="mb-4 w-100">Thêm tin tức</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div className="bg-white border-1 rounded-2">
            <Dropzone
              onDrop={(acceptedFiles) =>
                handlePrimaryImageUpload(acceptedFiles)
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="p-5 text-center">
                    <input {...getInputProps()} />
                    <p className="mb-0">
                      Kéo thả file vào đây hoặc click để chọn ảnh chính
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {primary_imageState && (
            <div className="show-images d-flex align-items-center gap-3">
              <div
                className="image-item position-relative"
                style={{ width: "200px" }}
              >
                <button
                  type="button"
                  onClick={() => handleDeletePrimaryImage(primary_imageState)}
                  className="btn-close position-absolute"
                  style={{ top: "5px", right: "5px", color: "Highlight" }}
                ></button>
                <img
                  className="img-fluid"
                  src={imageURLPrefix + primary_imageState}
                  alt=""
                />
              </div>
            </div>
          )}
          <div>
            <CustomInput
              type="text"
              label="Nhập tiêu đề tin tức"
              i_id="title-blog"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <div>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorTextPlaceholder: "rgba(0, 0, 0, 0.6)",
                    fontFamily: "Roboto",
                  },
                },
              }}
            >
              <Select
                allowClear
                size="large"
                style={{
                  width: "100%",
                }}
                placeholder="Chọn danh mục tin tức"
                options={options_category}
                onChange={(value) => {
                  formik.setFieldValue("category", value);
                }}
              />
            </ConfigProvider>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>

          <div className="editor">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <button
            style={{ width: "100px" }}
            className="btn btn-success border-0 rounded-3 my-4"
            type="submit"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
