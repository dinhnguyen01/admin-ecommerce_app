import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddProduct = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <h3 className="mb-4">Thêm sản phẩm</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            label="Nhập tên sản phẩm"
            i_id="product-title"
          />
          <div className="editor mb-3">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          <CustomInput type="text" label="Nhập giá tiền" i_id="product-price" />
          <select name="" id="" className="form-control py-3 mb-3">
            <option value="">Chọn thương hiệu</option>
          </select>
          <select name="" id="" className="form-control py-3 mb-3">
            <option value="">Chọn danh mục</option>
          </select>
          <select name="" id="" className="form-control py-3 mb-3">
            <option value="">Chọn màu sắc</option>
          </select>
          <CustomInput type="text" label="Nhập số lượng" i_id="product-qty" />
          <div className="upload-img mb-3">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Nhấp hoặc kéo tệp vào khu vực này để tải lên
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ
                liệu công ty hoặc các tập tin bị cấm khác.
              </p>
            </Dragger>
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

export default AddProduct;
