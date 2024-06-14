import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import moment from "moment";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã đơn hàng",
    dataIndex: "order_id",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "created_at",
  },
  {
    title: "Khách hàng",
    dataIndex: "customer_info",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "method",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total_price",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const data = orderState.map((order, index) => {
    return {
      key: index + 1,
      order_id: order._id.substring(0, 6),
      created_at: moment(order.createdAt).format("HH:mm:ss - DD/MM/YYYY"),
      customer_info: (
        <>
          {order.orderby.firstname} {order.orderby.lastname} <br />
          {order.orderby.mobile}
        </>
      ),
      method: order.paymentIntent.method,
      total_price: formatPrice(order.paymentIntent.amount),
      status: order.orderStatus,
      actions: (
        <>
          <button className="bg-transparent border-0 fs-5 text-primary ">
            <FaEye />
          </button>
          <button className="bg-transparent border-0 fs-5 text-primary ms-3">
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
      <h3 className="mb-4">Đơn hàng</h3>

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

export default Orders;
