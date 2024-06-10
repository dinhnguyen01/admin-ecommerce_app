import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Select, ConfigProvider } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getPcategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { uploadImg } from "../features/upload/uploadSlice";
import { base_img_url } from "../utils/base_url";

let schema = Yup.object({
  title: Yup.string().required("Cần nhập tên sản phẩm"),
  description: Yup.string().required("Cần nhập mô tả về sản phẩm"),
  price: Yup.number().required("Cần nhập giá của sản phẩm"),
  brand: Yup.string().required("Cần chọn thương hiệu"),
  category: Yup.string().required("Cần chọn danh mục"),
  color: Yup.array().required("Cần chọn màu sắc"),
  quantity: Yup.number().required("Cần nhập số lượng của sản phẩm"),
});

const AddProduct = () => {
  const imageURLPrefix = base_img_url;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPcategories());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  const pcategoryState = useSelector((state) => state.pcategory.pcategories);
  const colorState = useSelector((state) => state.color.colors);
  const imageState = useSelector((state) => state.upload.images.resultFiles);

  const options_brand = brandState.map((brand) => {
    return {
      label: brand.title,
      value: brand.title,
    };
  });

  const options_category = pcategoryState.map((category) => {
    return {
      label: category.title,
      value: category.title,
    };
  });

  const options_color = colorState.map((color) => {
    return {
      label: color.title,
      value: color.title,
    };
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: [],
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      console.log(values);
    },
  });

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const text = rawContentState.blocks.map((block) => block.text).join("\n");
    formik.setFieldValue("description", text);
  };

  return (
    <div>
      <h3 className="mb-4">Thêm sản phẩm</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div>
            <CustomInput
              type="text"
              label="Nhập tên sản phẩm"
              i_id="product-title"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
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

          <div>
            <CustomInput
              type="text"
              label="Nhập giá tiền"
              i_id="product-price"
              name="price"
              onCh={formik.handleChange("price")}
              value={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
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
                placeholder="Chọn thương hiệu"
                options={options_brand}
                onChange={(value) => {
                  formik.setFieldValue("brand", value);
                }}
              />
            </ConfigProvider>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
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
                placeholder="Chọn danh mục"
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
                name="color"
                mode="multiple"
                allowClear
                size="large"
                style={{
                  width: "100%",
                }}
                placeholder="Chọn màu sắc"
                options={options_color}
                onChange={(value) => {
                  formik.setFieldValue("color", value);
                }}
              />
            </ConfigProvider>
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>
          </div>
          <div>
            <CustomInput
              type="text"
              label="Nhập số lượng"
              i_id="product-qty"
              name="quantity"
              onCh={formik.handleChange("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="bg-white border-1 rounded-2">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="p-5 text-center">
                    <input {...getInputProps()} />
                    <p>Kéo thả file vào đây hoặc click để chọn file</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex align-items-center gap-3">
            {imageState.map((img, index) => (
              <div
                key={index}
                className="image-item"
                style={{ width: "200px" }}
              >
                <img
                  className="img-fluid"
                  src={imageURLPrefix + img.url}
                  alt=""
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-2"
            style={{ width: "100px" }}
            type="submit"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
