import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getBcategories } from "../features/bcategory/bcategorySlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên danh mục",
    dataIndex: "title",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const BlogCatlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);

  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const data = bcategoryState.map((bcategory, index) => {
    return {
      key: index + 1,
      title: bcategory.title,
      actions: (
        <>
          <button className="bg-transparent border-0 fs-5 text-primary">
            <BiSolidEdit />
          </button>
          <button className="bg-transparent border-0 fs-5 text-primary ms-3">
            <RiDeleteBin6Line />
          </button>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4">Danh sách danh mục tin tức</h3>

      <div>
        <ConfigProvider
          className="w-100"
          theme={{
            components: {
              Table: {
                rowHoverBg: "transparent",
                fontFamily: "inherit",
              },
            },
          }}
        >
          <Table columns={columns} dataSource={data} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default BlogCatlist;
