import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomInput from "../components/CustomInput";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddBlog = () => {
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
      <h3 className="mb-4 w-100">Thêm tin tức</h3>
      <div>
        <form action="">
          <div className="upload-img mb-4">
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
          <CustomInput
            type="text"
            label="Nhập tiêu đề tin tức"
            i_id="title-blog"
          />
          <select name="" id="" className="form-control py-1 mb-3">
            <option value="">Chọn danh mục tin tức</option>
          </select>
          <div className="editor">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          <button
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
