import React, { useState, useEffect } from "react";
import { Table, ConfigProvider, Modal, Input, Button, DatePicker } from "antd";
import { toast } from "react-toastify";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "../features/coupons/couponSlice";
import moment from "moment";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã giảm giá",
    dataIndex: "name",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiry",
    defaultSortOrder: "",
    sorter: (a, b) => a.expiry_raw - b.expiry_raw,
  },
  {
    title: "Giảm giá",
    dataIndex: "discount",
    defaultSortOrder: "",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Hành động",
    dataIndex: "actions",
    align: "center",
  },
];

const Couponlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({});
  const [originalCoupon, setOriginalCoupon] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const handleEditClick = (id) => {
    dispatch(getCoupon(id)).then((action) => {
      if (action.payload) {
        setCurrentCoupon(action.payload);
        setOriginalCoupon(action.payload);
        setIsModalOpen(true);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCoupon({});
    setOriginalCoupon({});
  };

  const handleUpdateCoupon = () => {
    if (
      currentCoupon.name === originalCoupon.name &&
      currentCoupon.expiry === originalCoupon.expiry &&
      currentCoupon.discount === originalCoupon.discount
    ) {
      toast.info("Không có thay đổi nào được thực hiện.");
      handleCloseModal();
      return;
    }

    dispatch(
      updateCoupon({
        id: currentCoupon._id,
        couponData: {
          name: currentCoupon.name,
          expiry: currentCoupon.expiry,
          discount: currentCoupon.discount,
        },
      })
    ).then(() => {
      dispatch(getCoupons());
      handleCloseModal();
      toast.success("Cập nhật mã giảm giá thành công!");
    });
  };

  const handleDeleteClick = (id) => {
    const couponToDelete = couponState.find((coupon) => coupon._id === id);

    if (couponToDelete && couponToDelete.name) {
      setCouponToDelete(couponToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCoupon(couponToDelete._id)).then(() => {
      dispatch(getCoupons());
      toast.success("Xóa mã giảm giá thành công!");
      setIsDeleteModalVisible(false);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setCouponToDelete(null);
  };

  const data = couponState.map((coupon, index) => {
    return {
      key: index + 1,
      name: coupon.name,
      expiry: moment(coupon.expiry).format("HH:mm:ss - DD/MM/YYYY"),
      expiry_raw: new Date(coupon.expiry).getTime(),
      discount: coupon.discount,
      actions: (
        <>
          <button
            onClick={() => handleEditClick(coupon._id)}
            className="bg-transparent border-0 fs-5 text-primary"
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDeleteClick(coupon._id)}
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
      <h3 className="mb-4">Danh sách mã giảm giá</h3>

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
          title="Sửa mã giảm giá"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpdateCoupon}>
              Cập nhật
            </Button>,
          ]}
        >
          <Input
            className="mb-3"
            id="edit_coupon_name"
            value={currentCoupon.name}
            onChange={(e) =>
              setCurrentCoupon({ ...currentCoupon, name: e.target.value })
            }
            placeholder="Sửa mã giảm giá"
          />
          <DatePicker
            className="mb-3"
            showTime
            format="HH:mm:ss DD/MM/YYYY"
            // value={currentCoupon.expiry ? moment(currentCoupon.expiry) : null}
            onChange={(value) => {
              setCurrentCoupon({
                ...currentCoupon,
                expiry: value ? value.toISOString() : null,
              });
            }}
            placeholder="Sửa ngày hết hạn"
          />
          <Input
            className="mb-3"
            id="edit_coupon_discount"
            value={currentCoupon.discount}
            onChange={(e) =>
              setCurrentCoupon({ ...currentCoupon, discount: e.target.value })
            }
            placeholder="Sửa giảm giá"
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
          <p>Bạn có chắc chắn muốn xóa mã giảm giá "{couponToDelete?.name}"?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Couponlist;
