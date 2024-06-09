import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
  },
  {
    title: "Hình ảnh",
    dataIndex: "url_img_blog",
    render: (url_img_blog) => (
      <img src={url_img_blog} alt="Blog" style={{ width: "100px" }} />
    ),
  },
  {
    title: "Danh mục",
    dataIndex: "category",
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

const Bloglist = () => {
  const imageURLPrefix = process.env.REACT_APP_IMAGE_URL_PREFIX;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const data = blogState.map((blog, index) => {
    const url_img_blog =
      Array.isArray(blog.images) && blog.images.length > 0
        ? `${imageURLPrefix}${blog.images[0].url}`
        : null;
    return {
      key: index + 1,
      title: blog.title,
      url_img_blog: url_img_blog,
      category: blog.category,
      created_at: new Date(blog.createdAt)
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
      created_at_raw: new Date(blog.createdAt).getTime(),
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
      <h3 className="mb-4">Danh sách tin tức</h3>

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

export default Bloglist;
