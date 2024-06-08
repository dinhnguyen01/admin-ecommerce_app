import React from "react";
import { ImArrowUpRight2, ImArrowDownRight2 } from "react-icons/im";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table, ConfigProvider } from "antd";

const Dashboard = () => {
  const data = [
    {
      month: "Jan",
      profit: 40,
    },
    {
      month: "Feb",
      profit: 30,
    },
    {
      month: "Mar",
      profit: 20,
    },
    {
      month: "Apr",
      profit: 27,
    },
    {
      month: "May",
      profit: 18,
    },
    {
      month: "Jun",
      profit: 23,
    },
    {
      month: "Jul",
      profit: 34,
    },
    {
      month: "Aug",
      profit: 20,
    },
    {
      month: "Sep",
      profit: 27,
    },
    {
      month: "Oct",
      profit: 89,
    },
    {
      month: "Nov",
      profit: 23,
    },
    {
      month: "Dec",
      profit: 34,
    },
  ];

  const monthMapping = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const monthNumber = monthMapping[label];
      return (
        <div className="custom-tooltip">
          <p className="label">{`Tháng ${monthNumber}: ${payload[0].value} triệu`}</p>
        </div>
      );
    }
    return null;
  };

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

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-end justify-content-between flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng doanh thu</p>
            <h4 className="mb-0">100.000.000đ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="text-success">
              <ImArrowUpRight2 /> 23%
            </h6>
            <p className="mb-0">So với tháng 5 năm 2024</p>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-between flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Giá trị đơn hàng trung bình</p>
            <h4 className="mb-0">10.000.000đ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="text-danger">
              <ImArrowDownRight2 /> 23%
            </h6>
            <p className="mb-0">So với tháng 5 năm 2024</p>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-between flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Tổng số đơn hàng</p>
            <h4 className="mb-0">234</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="text-success">
              <ImArrowUpRight2 /> 23%
            </h6>
            <p className="mb-0">So với tháng 5 năm 2024</p>
          </div>
        </div>
      </div>
      <div className="mt-4 chart-profit">
        <h3 className="mb-4">Thống kê thu nhập</h3>
        <p className="ms-4 mb-2">Triệu đồng</p>
        <div className="chart-profit_wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickSize={10} axisLine={false} />
              <YAxis tickCount={5} axisLine={false} tickSize={0} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="profit"
                fill="#8884d8"
                isAnimationActive={false}
                barSize={35}
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-4">Đơn đặt hàng gần đây</h3>
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
            <Table
              bordered
              columns={columns}
              dataSource={data1}
              pagination={{ pageSize: 7 }}
            />
          </ConfigProvider>
        </div>
      </div>
      {/* <div className="d-flex gap-3 justify-content-between"></div> */}
    </div>
  );
};

export default Dashboard;
