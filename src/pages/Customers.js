import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import moment from "moment";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "mobile",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    defaultSortOrder: "",
    sorter: (a, b) => a.created_at_raw - b.created_at_raw,
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const customerstate = useSelector((state) => state.customer.customers);

  const data = customerstate
    .filter((customer) => customer.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      name: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      mobile: customer.mobile,
      created_at: moment(customer.createdAt).format("HH:mm:ss - DD/MM/YYYY"),
      created_at_raw: new Date(customer.createdAt).getTime(),
    }));

  return (
    <div>
      <h3 className="mb-4">Khách hàng</h3>
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

export default Customers;
