import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, ConfigProvider, Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  getAColor,
  updateColor,
  deleteColor,
} from "../features/color/colorSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên màu sắc",
    dataIndex: "title",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Colorlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColorId, setCurrentColorId] = useState(null);
  const [colorTitle, setColorTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);
  const selectedColor = useSelector((state) => state.color.colorName);

  useEffect(() => {
    if (selectedColor) {
      setColorTitle(selectedColor);
      setOriginalTitle(selectedColor);
    }
  }, [selectedColor]);

  const handleEditClick = (id) => {
    setCurrentColorId(id);
    setIsModalOpen(true);
    dispatch(getAColor(id)).then((action) => {
      if (action.payload && action.payload.title) {
        setColorTitle(action.payload.title);
        setOriginalTitle(action.payload.title);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentColorId(null);
    setColorTitle("");
    setOriginalTitle("");
  };

  const handleUpdateColor = () => {
    if (colorTitle === originalTitle) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updateColor({ id: currentColorId, colorData: { title: colorTitle } })
    ).then(() => {
      dispatch(getColors());
      handleCloseModal();
      toast.success("Cập nhật màu sắc thành công!");
    });
  };

  const handleDeleteClick = (id) => {
    const colorToDelete = colorState.find((color) => color._id === id);

    if (colorToDelete && colorToDelete.title) {
      setColorToDelete(colorToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteColor(colorToDelete._id)).then(() => {
      dispatch(getColors());
      toast.success("Xóa màu sắc thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setColorToDelete(null);
  };

  const data = colorState.map((color, index) => {
    return {
      key: index + 1,
      title: color.title,
      actions: (
        <>
          <button
            onClick={() => handleEditClick(color._id)}
            className="bg-transparent border-0 fs-5 text-primary"
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(color._id)}
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
      <h3 className="mb-4">Danh sách màu sắc</h3>

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
          title="Sửa màu sắc"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateColor}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            id="new_brandname"
            value={colorTitle}
            onChange={(e) => setColorTitle(e.target.value)}
            placeholder="Sửa tên màu sắc"
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
          <p>Bạn có chắc chắn muốn xóa màu "{colorToDelete?.title}"?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Colorlist;
