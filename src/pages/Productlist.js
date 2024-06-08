import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { base_img_url } from "../utils/base_url";

const Productlist = () => {
  const imageURLPrefix = base_img_url;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const uniqueBrand = [
    ...new Set(productState.map((product) => product.brand)),
  ].map((brand) => ({ text: brand, value: brand }));
  const uniqueCategory = [
    ...new Set(productState.map((product) => product.category)),
  ].map((category) => ({ text: category, value: category }));

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
    },
    {
      title: "Hình ảnh",
      dataIndex: "url_img_product",
      render: (url_img_product) => (
        <img src={url_img_product} alt="Product" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "formattedPrice",
      defaultSortOrder: "",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      filters: uniqueBrand,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      filters: uniqueCategory,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      defaultSortOrder: "",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      align: "center",
    },
  ];

  const data = productState.map((product, index) => {
    const url_img_product =
      Array.isArray(product.images) && product.images.length > 0
        ? `${imageURLPrefix}${product.images[0].url}`
        : null;
    return {
      key: index + 1,
      title: product.title,
      url_img_product: url_img_product,
      price: product.price,
      formattedPrice: formatPrice(product.price),
      brand: product.brand,
      category: product.category,
      quantity: product.quantity,
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
      <h3 className="mb-4">Danh sách sản phẩm</h3>

      <div>
        <ConfigProvider
          className="w-100"
          theme={{
            components: {
              Table: {
                rowHoverBg: "transparent",
                fontFamily: "Roboto",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            locale={{
              filterConfirm: "Xác nhận",
              filterReset: "Đặt lại",
              filterSearchPlaceholder: "Lọc",
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Productlist;
