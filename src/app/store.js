import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import couponReducer from "../features/coupons/couponSlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcategory: pcategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    coupon: couponReducer,
    bcategory: bcategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
  },
});
