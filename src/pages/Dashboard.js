import React from "react";
import { ImArrowUpRight2, ImArrowDownRight2 } from "react-icons/im";
import { Table, ConfigProvider } from "antd";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

const Dashboard = () => {
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

  const getOption = () => {
    return {
      title: {
        text: "Thống kê thu nhập",
        left: "center",
        textStyle: {
          fontFamily: "Roboto",
          fontSize: 23,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        axisLabel: {
          fontFamily: "Roboto",
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          fontFamily: "Roboto",
        },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 110, 130],
          type: "bar",
          barWidth: "50%", // Tăng khoảng cách giữa các cột
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
  };

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
        <div className="chart-profit_wrapper">
          <ReactEChartsCore
            style={{ width: "100%", height: "400px" }}
            echarts={echarts}
            option={getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            // onEvents={{ renderer: "canvas" }}
          />
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
