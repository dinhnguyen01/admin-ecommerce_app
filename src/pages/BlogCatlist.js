import React, { useState, useEffect } from "react";
import { Table, ConfigProvider, Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getBcategories,
  getABcategory,
  updateBcategory,
  deleteBcategory,
} from "../features/bcategory/bcategorySlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên danh mục",
    dataIndex: "title",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const BlogCatlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBcategoryId, setCurrentBcategoryId] = useState(null);
  const [bcategoryTitle, setBcategoryTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [bcategoryToDelete, setBcategoryToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);

  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const selectedBcategory = useSelector((state) => state.brand.bcategoryName);

  useEffect(() => {
    if (selectedBcategory) {
      setBcategoryTitle(selectedBcategory);
      setOriginalTitle(selectedBcategory);
    }
  }, [selectedBcategory]);

  const handleEditClick = (id) => {
    setCurrentBcategoryId(id);
    setIsModalOpen(true);
    dispatch(getABcategory(id)).then((action) => {
      if (action.payload && action.payload.title) {
        setBcategoryTitle(action.payload.title);
        setOriginalTitle(action.payload.title);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBcategoryId(null);
    setBcategoryTitle("");
    setOriginalTitle("");
  };

  const handleUpdateBcategory = () => {
    if (bcategoryTitle === originalTitle) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updateBcategory({
        id: currentBcategoryId,
        bcategoryData: { title: bcategoryTitle },
      })
    ).then(() => {
      dispatch(getBcategories());
      handleCloseModal();
      toast.success("Cập nhật danh mục tin tức thành công!");
    });
  };

  const handleDeleteClick = (id) => {
    const bcategoryToDelete = bcategoryState.find(
      (bcategory) => bcategory._id === id
    );

    if (bcategoryToDelete && bcategoryToDelete.title) {
      setBcategoryToDelete(bcategoryToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBcategory(bcategoryToDelete._id)).then(() => {
      dispatch(getBcategories());
      toast.success("Xóa danh mục tin tức thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setBcategoryToDelete(null);
  };

  const data = bcategoryState.map((bcategory, index) => {
    return {
      key: index + 1,
      title: bcategory.title,
      actions: (
        <>
          <button
            onClick={() => handleEditClick(bcategory._id)}
            className="bg-transparent border-0 fs-5 text-primary"
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(bcategory._id)}
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
      <h3 className="mb-4">Danh sách danh mục tin tức</h3>

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
          title="Sửa danh mục tin tức"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateBcategory}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            id="new_bcategoryname"
            value={bcategoryTitle}
            onChange={(e) => setBcategoryTitle(e.target.value)}
            placeholder="Sửa tên danh mục tin tức"
          />
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
          <p>
            Bạn có chắc chắn muốn xóa thương hiệu "{bcategoryToDelete?.title}"?
          </p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default BlogCatlist;
