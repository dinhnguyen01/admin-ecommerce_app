import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUser, FaMicroblog, FaRegQuestionCircle } from "react-icons/fa";
import { FaDatabase, FaCartPlus, FaCartShopping } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TbCategoryPlus, TbCategory, TbLogs } from "react-icons/tb";
import { IoIosColorPalette, IoMdColorFill } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical d-flex align-items-center justify-content-center">
          <h1 style={{ display: collapsed ? "block" : "none" }}>T-S</h1>
          <h2
            style={{ display: collapsed ? "none" : "block" }}
            className="mb-0 fs-5 text-uppercase"
          >
            TechStore - Admin
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdOutlineSpaceDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaUser className="fs-5" />,
              label: "Khách hàng",
            },
            {
              key: "catalog",
              icon: <FaDatabase className="fs-5" />,
              label: "Mục lục ",
              children: [
                {
                  key: "product",
                  icon: <FaCartPlus className="fs-5" />,
                  label: "Thêm sản phẩm",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineProduct className="fs-5" />,
                  label: "Danh sách sản phẩm",
                },
                {
                  key: "brand",
                  icon: <SlBadge className="fs-5" />,
                  label: "Thêm thương hiệu",
                },
                {
                  key: "brand-list",
                  icon: <RiVerifiedBadgeFill className="fs-5" />,
                  label: "Danh sách thương hiệu",
                },
                {
                  key: "category",
                  icon: <TbCategoryPlus className="fs-5" />,
                  label: "Thêm danh mục",
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-5" />,
                  label: "Danh sách danh mục",
                },
                {
                  key: "color",
                  icon: <IoMdColorFill className="fs-5" />,
                  label: "Thêm màu sắc",
                },
                {
                  key: "color-list",
                  icon: <IoIosColorPalette className="fs-5" />,
                  label: "Danh sách màu sắc",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaCartShopping className="fs-5" />,
              label: "Đơn hàng",
            },
            {
              key: "blogs",
              icon: <CiChat1 className="fs-5" />,
              label: "Tin tức",
              children: [
                {
                  key: "add-blog",
                  icon: <FaMicroblog className="fs-5" />,
                  label: "Thêm tin tức",
                },
                {
                  key: "blog-list",
                  icon: <TbLogs className="fs-5" />,
                  label: "Danh sách tin tức",
                },
                {
                  key: "blog-category",
                  // icon: <FaMicroblog className="fs-5" />,
                  label: "Thêm danh mục tin tức",
                },
                {
                  key: "blog-category-list",
                  // icon: <FaMicroblog className="fs-5" />,
                  label: "Danh sách danh mục tin tức",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaRegQuestionCircle className="fs-5" />,
              label: "Thắc mắc",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => toggleCollapsed()}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="toolbar_right d-flex align-items-center justify-content-center">
            <div className="toolbar-notify d-flex align-items-center justify-content-center">
              <button className="btn btn-notify d-flex align-items-center justify-content-center me-2">
                <IoNotifications className="fs-5" />
                <span className="d-flex align-items-center justify-content-center">
                  7
                </span>
              </button>
            </div>
            <div className="toolbar-user d-flex align-items-center justify-content-center">
              <button className="d-flex align-items-center btn px-2 me-4">
                <div className="d-flex gap-2 align-items-center">
                  <div className="toolbar-user_avatar d-flex justify-content-center">
                    <img
                      className="img-fluid"
                      src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="text-start">
                    <h5 className="toolbar-user_title mb-0">DinhZing</h5>
                    <p className="toolbar-user_subtitle mb-0">
                      nguyencongdinhnhb@gmail.com
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;