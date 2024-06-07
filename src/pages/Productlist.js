import React from "react";
import { Table } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên KH",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 1; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Productlist = () => {
  return (
    <div>
      <h3 className="mb-4">Danh sách sản phẩm</h3>
      <Table columns={columns} dataSource={data1} />
      <div></div>
    </div>
  );
};

export default Productlist;
