// import React, { useEffect } from "react";
// import { Table, ConfigProvider } from "antd";
// import { BiSolidEdit } from "react-icons/bi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { getBlogs } from "../features/blog/blogSlice";
// import { base_img_url } from "../utils/base_url";
// import moment from "moment";

// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//   },
//   {
//     title: "Tiêu đề",
//     dataIndex: "title",
//   },
//   {
//     title: "Hình ảnh",
//     dataIndex: "url_img_blog",
//     render: (url_img_blog) => (
//       <img src={url_img_blog} alt="Blog" style={{ width: "100px" }} />
//     ),
//   },
//   {
//     title: "Danh mục",
//     dataIndex: "category",
//   },
//   {
//     title: "Ngày tạo",
//     dataIndex: "created_at",
//     defaultSortOrder: "",
//     sorter: (a, b) => a.created_at_raw - b.created_at_raw,
//   },
//   {
//     title: "Hành động",
//     dataIndex: "actions",
//     align: "center",
//   },
// ];

// const Bloglist = () => {
//   const imageURLPrefix = base_img_url;

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getBlogs());
//   }, [dispatch]);

//   const blogState = useSelector((state) => state.blog.blogs);

//   const data = blogState.map((blog, index) => {
//     const url_img_blog = blog.primaryImage
//       ? `${imageURLPrefix}${blog.primaryImage}`
//       : null;
//     return {
//       key: index + 1,
//       title: blog.title,
//       url_img_blog: url_img_blog,
//       category: blog.category,
//       created_at: moment(blog.createdAt).format("HH:mm:ss - DD/MM/YYYY"),
//       created_at_raw: new Date(blog.createdAt).getTime(),
//       actions: (
//         <>
//           <button className="bg-transparent border-0 fs-5 text-primary">
//             <BiSolidEdit />
//           </button>
//           <button className="bg-transparent border-0 fs-5 text-primary ms-3">
//             <RiDeleteBin6Line />
//           </button>
//         </>
//       ),
//     };
//   });

//   return (
//     <div>
//       <h3 className="mb-4">Danh sách tin tức</h3>

//       <div>
//         <ConfigProvider
//           className="w-100"
//           theme={{
//             components: {
//               Table: {
//                 rowHoverBg: "transparent",
//                 fontFamily: "inherit",
//               },
//             },
//           }}
//         >
//           <Table columns={columns} dataSource={data} />
//         </ConfigProvider>
//       </div>
//     </div>
//   );
// };

// export default Bloglist;

import React, { useState, useEffect } from "react";
import {
  Table,
  ConfigProvider,
  Modal,
  Input,
  Button,
  Upload,
  Select,
} from "antd";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../features/blog/blogSlice";
import { base_img_url } from "../utils/base_url";
import moment from "moment";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  upload_primaryImg,
  delete_primaryImg,
} from "../features/upload/uploadSlice";
import { getBcategories } from "../features/bcategory/bcategorySlice";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});
  const [originalBlog, setOriginalBlog] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getBcategories());
  }, [dispatch]);

  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const options_category = bcategoryState.map((category) => {
    return {
      label: category.title,
      value: category.title,
    };
  });

  const blogState = useSelector((state) => state.blog.blogs);

  const handleEditClick = (id) => {
    dispatch(getBlog(id)).then((action) => {
      if (action.payload) {
        setCurrentBlog(action.payload);
        setOriginalBlog(action.payload);
        setIsModalOpen(true);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBlog({});
    setOriginalBlog({});
  };

  const handleUpdateBlog = () => {
    if (
      currentBlog.title === originalBlog.title &&
      currentBlog.category === originalBlog.category &&
      currentBlog.primaryImage === originalBlog.primaryImage
    ) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updateBlog({
        id: currentBlog._id,
        blogData: {
          title: currentBlog.title,
          category: currentBlog.category,
          primaryImage: currentBlog.primaryImage,
        },
      })
    ).then(() => {
      dispatch(getBlogs());
      handleCloseModal();
      toast.success("Cập nhật tin tức thành công!");
    });
  };

  const handleDeleteClick = (id) => {
    const blogToDelete = blogState.find((blog) => blog._id === id);

    if (blogToDelete && blogToDelete.title) {
      setBlogToDelete(blogToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBlog(blogToDelete._id)).then(() => {
      dispatch(getBlogs());
      toast.success("Xóa tin tức thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setBlogToDelete(null);
  };

  const extractFilename = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleImageRemove = (blog) => {
    const filename = extractFilename(blog.primaryImage);
    dispatch(delete_primaryImg(filename)).then(() => {
      dispatch(
        updateBlog({
          id: blog._id,
          blogData: { ...blog, primaryImage: "" },
        })
      ).then(() => {
        dispatch(getBlogs());
        toast.success("Xóa hình ảnh thành công!");
        if (currentBlog._id === blog._id) {
          setCurrentBlog({ ...currentBlog, primaryImage: "" });
        }
      });
    });
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      const uploadedImageUrl = info.file.response.url;
      dispatch(upload_primaryImg(uploadedImageUrl)).then((action) => {
        if (action.payload) {
          setCurrentBlog({ ...currentBlog, primaryImage: action.payload.url });
        }
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const data = blogState.map((blog, index) => {
    const url_img_blog = blog.primaryImage
      ? `${base_img_url}${blog.primaryImage}`
      : null;
    return {
      key: index + 1,
      title: blog.title,
      url_img_blog: url_img_blog,
      category: blog.category,
      created_at: moment(blog.createdAt).format("HH:mm:ss - DD/MM/YYYY"),
      created_at_raw: new Date(blog.createdAt).getTime(),
      actions: (
        <>
          <button
            onClick={() => handleEditClick(blog._id)}
            className="bg-transparent border-0 fs-5 text-primary"
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(blog._id)}
            className="bg-transparent border-0 fs-5 text-primary ms-3"
          >
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
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Roboto",
            fontSize: 17,
          },
        }}
      >
        <Modal
          title="Sửa tin tức"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateBlog}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            className="mb-3"
            id="edit_blog_title"
            value={currentBlog.title}
            onChange={(e) =>
              setCurrentBlog({ ...currentBlog, title: e.target.value })
            }
            placeholder="Sửa tiêu đề"
          />
          <Select
            className="mb-3 w-100"
            allowClear
            size="large"
            placeholder="Chọn danh mục tin tức"
            value={currentBlog.category}
            options={options_category}
            onChange={(value) =>
              setCurrentBlog({ ...currentBlog, category: value })
            }
          />
          <div className="mb-3">
            {currentBlog.primaryImage ? (
              <div>
                <img
                  src={`${base_img_url}${currentBlog.primaryImage}`}
                  alt="Blog"
                  style={{ width: "100px" }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleImageRemove(currentBlog)}
                  type="primary"
                  danger
                  style={{ marginLeft: "10px" }}
                >
                  Xóa
                </Button>
              </div>
            ) : (
              <Upload
                name="blogImage"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/upload"
                onChange={handleImageUpload}
              >
                {uploadButton}
              </Upload>
            )}
          </div>
        </Modal>

        <Modal
          title="Xác nhận xóa"
          open={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Xóa"
          okType="danger"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa tin tức "{blogToDelete?.title}"?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Bloglist;
