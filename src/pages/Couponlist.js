import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons } from "../features/coupons/couponSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã giảm giá",
    dataIndex: "name",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiry",
    defaultSortOrder: "",
    sorter: (a, b) => a.expiry_raw - b.expiry_raw,
  },
  {
    title: "Giảm giá",
    dataIndex: "discount",
    defaultSortOrder: "",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const data = couponState.map((coupon, index) => {
    return {
      key: index + 1,
      name: coupon.name,
      expiry: new Date(coupon.expiry)
        .toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(" ", " - "),
      expiry_raw: new Date(coupon.expiry).getTime(),
      discount: coupon.discount,
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
      <h3 className="mb-4">Danh sách mã giảm giá</h3>

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

export default Couponlist;
