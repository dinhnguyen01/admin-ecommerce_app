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

const pcategoryService = {
  getPcategories,
  createPcategory,
};

export default pcategoryService;
