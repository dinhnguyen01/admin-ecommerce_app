import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, ConfigProvider, Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getPcategories,
  getPcategory,
  updatePcategory,
  deletePcategory,
} from "../features/pcategory/pcategorySlice";

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

const Categorylist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPcategoryId, setCurrentPcategoryId] = useState(null);
  const [pcategoryTitle, setPcategoryTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [pcategoryToDelete, setPcategoryToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPcategories());
  }, [dispatch]);

  const pcategoryState = useSelector((state) => state.pcategory.pcategories);
  const selectedPcategory = useSelector(
    (state) => state.pcategory.pcategoryName
  );

  useEffect(() => {
    if (selectedPcategory) {
      setPcategoryTitle(selectedPcategory);
      setOriginalTitle(selectedPcategory);
    }
  }, [selectedPcategory]);

  const handleEditClick = (id) => {
    setCurrentPcategoryId(id);
    setIsModalOpen(true);
    dispatch(getPcategory(id)).then((action) => {
      if (action.payload && action.payload.title) {
        setPcategoryTitle(action.payload.title);
        setOriginalTitle(action.payload.title);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPcategoryId(null);
    setPcategoryTitle("");
    setOriginalTitle("");
  };

  const handleUpdatePcategory = () => {
    if (pcategoryTitle === originalTitle) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updatePcategory({
        id: currentPcategoryId,
        pcategoryData: { title: pcategoryTitle },
      })
    ).then(() => {
      dispatch(getPcategories());
      handleCloseModal();
      toast.success("Cập nhật danh mục thành công!");
    });
  };

  const handleDeleteClick = (id) => {
    const pcategoryToDelete = pcategoryState.find(
      (pcategory) => pcategory._id === id
    );

    if (pcategoryToDelete && pcategoryToDelete.title) {
      setPcategoryToDelete(pcategoryToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deletePcategory(pcategoryToDelete._id)).then(() => {
      dispatch(getPcategories());
      toast.success("Xóa danh mục thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setPcategoryToDelete(null);
  };

  const data = pcategoryState.map((pcategory, index) => {
    return {
      key: index + 1,
      title: pcategory.title,
      actions: (
        <>
          <button
            onClick={() => {
              handleEditClick(pcategory._id);
            }}
            className="bg-transparent border-0 fs-5 text-primary"
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(pcategory._id)}
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
      <h3 className="mb-4">Danh sách danh mục sản phẩm</h3>

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
          title="Sửa danh mục"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdatePcategory}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            id="new_pcategoryname"
            value={pcategoryTitle}
            onChange={(e) => setPcategoryTitle(e.target.value)}
            placeholder="Sửa tên danh mục"
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
            Bạn có chắc chắn muốn xóa danh mục "{pcategoryToDelete?.title}"?
          </p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Categorylist;
