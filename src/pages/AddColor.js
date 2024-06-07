import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4">Thêm màu sắc</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            label="Nhập tên màu sắc"
            i_id="color-title"
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
