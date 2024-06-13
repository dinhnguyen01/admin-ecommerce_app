import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getPcategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createPcategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};

const getPcategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const updatePcategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.pcategoryData.title },
    config
  );
  return response.data;
};

const deletePcategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const pcategoryService = {
  getPcategories,
  createPcategory,
  getPcategory,
  updatePcategory,
  deletePcategory,
};

export default pcategoryService;
