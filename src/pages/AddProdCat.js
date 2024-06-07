import React from "react";
import CustomInput from "../components/CustomInput";

const AddProdCat = () => {
  return (
    <div>
      <h3 className="mb-4">Thêm danh mục sản phẩm</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            label="Nhập tên danh mục"
            i_id="prodcat-title"
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

export default AddProdCat;
