import React, { useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPcategories } from "../features/pcategory/pcategorySlice";

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

const Categorylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPcategories());
  }, [dispatch]);
  const pcategoryState = useSelector((state) => state.pcategory.pcategories);
  const data = pcategoryState.map((pcategory, index) => {
    return {
      key: index + 1,
      title: pcategory.title,
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
      <h3 className="mb-4">Danh sách danh mục sản phẩm</h3>

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

export default Categorylist;
