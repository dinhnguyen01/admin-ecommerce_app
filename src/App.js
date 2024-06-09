import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import BlogCatlist from "./pages/BlogCatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Brandlist from "./pages/Brandlist";
import Categorylist from "./pages/Categorylist";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddProdCat from "./pages/AddProdCat";
import Productlist from "./pages/Productlist";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="enquiries" element={<Enquiries />}></Route>
          <Route path="add-blog" element={<AddBlog />}></Route>
          <Route path="blog-list" element={<Bloglist />}></Route>
          <Route path="add-blog-category" element={<AddBlogCat />}></Route>
          <Route path="blog-category-list" element={<BlogCatlist />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="customers" element={<Customers />}></Route>
          <Route path="add-color" element={<AddColor />}></Route>
          <Route path="color-list" element={<Colorlist />}></Route>
          <Route path="add-brand" element={<AddBrand />}></Route>
          <Route path="brand-list" element={<Brandlist />}></Route>
          <Route path="add-product-category" element={<AddProdCat />}></Route>
          <Route
            path="product-category-list"
            element={<Categorylist />}
          ></Route>
          <Route path="product-list" element={<Productlist />}></Route>
          <Route path="add-product" element={<AddProduct />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
