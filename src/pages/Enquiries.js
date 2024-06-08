import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Họ tên",
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
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    defaultSortOrder: "",
    sorter: (a, b) => a.created_at_raw - b.created_at_raw,
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data = enquiryState.map((enquiry, index) => {
    return {
      key: index + 1,
      name: enquiry.name,
      email: enquiry.email,
      mobile: enquiry.mobile,
      status: enquiry.status,
      created_at: new Date(enquiry.createdAt).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      created_at_raw: new Date(enquiry.createdAt).getTime(),
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
      <h3 className="mb-4">Thắc mắc</h3>

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

export default Enquiries;
