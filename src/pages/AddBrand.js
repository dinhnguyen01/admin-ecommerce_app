import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4">Thêm thương hiệu</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            label="Nhập tên thương hiệu"
            i_id="brand-title"
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

export default AddBrand;
