import React, { useEffect, useState } from "react";
import { Table, ConfigProvider, Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getABrand,
  updateBrand,
  deleteBrand,
} from "../features/brand/brandSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên thương hiệu",
    dataIndex: "title",
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Brandlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBrandId, setCurrentBrandId] = useState(null);
  const [brandTitle, setBrandTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const selectedBrand = useSelector((state) => state.brand.brandName);

  useEffect(() => {
    if (selectedBrand) {
      setBrandTitle(selectedBrand);
      setOriginalTitle(selectedBrand);
    }
  }, [selectedBrand]);

  const handleEditClick = (id) => {
    setCurrentBrandId(id);
    setIsModalOpen(true);
    dispatch(getABrand(id)).then((action) => {
      if (action.payload && action.payload.title) {
        setBrandTitle(action.payload.title);
        setOriginalTitle(action.payload.title);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBrandId(null);
    setBrandTitle("");
    setOriginalTitle("");
  };

  const handleUpdateBrand = () => {
    if (brandTitle === originalTitle) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updateBrand({ id: currentBrandId, brandData: { title: brandTitle } })
    ).then(() => {
      dispatch(getBrands());
      handleCloseModal();
      toast.success("Cập nhật thương hiệu thành công!");
    });
  };

  // const handleDeleteClick = (id) => {
  //   const brandToDelete = brandState.find((brand) => brand._id === id);

  //   if (brandToDelete && brandToDelete.title) {
  //     Modal.confirm({
  //       title: "Xác nhận xóa",
  //       content: `Bạn có chắc chắn muốn xóa thương hiệu "${brandToDelete.title}"?`,
  //       okText: "Xóa",
  //       okType: "danger",
  //       cancelText: "Hủy",
  //       onOk() {
  //         dispatch(deleteBrand(id)).then(() => {
  //           dispatch(getBrands());
  //           toast.success("Xóa thương hiệu thành công!");
  //         });
  //       },
  //     });
  //   }
  // };

  const handleDeleteClick = (id) => {
    const brandToDelete = brandState.find((brand) => brand._id === id);

    if (brandToDelete && brandToDelete.title) {
      setBrandToDelete(brandToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBrand(brandToDelete._id)).then(() => {
      dispatch(getBrands());
      toast.success("Xóa thương hiệu thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setBrandToDelete(null);
  };

  const data = brandState.map((brand, index) => ({
    key: index + 1,
    title: brand.title,
    actions: (
      <>
        <button
          onClick={() => handleEditClick(brand._id)}
          className="bg-transparent border-0 fs-5 text-primary"
        >
          <BiSolidEdit />
        </button>
        <button
          onClick={() => handleDeleteClick(brand._id)}
          className="bg-transparent border-0 fs-5 text-primary ms-3"
        >
          <RiDeleteBin6Line />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4">Danh sách thương hiệu</h3>
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
          title="Sửa thương hiệu"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateBrand}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            id="new_brandname"
            value={brandTitle}
            onChange={(e) => setBrandTitle(e.target.value)}
            placeholder="Sửa tên thương hiệu"
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
          <p>Bạn có chắc chắn muốn xóa thương hiệu "{brandToDelete?.title}"?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Brandlist;
