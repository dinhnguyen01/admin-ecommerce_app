import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBcategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBcategory = async (bcategory) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    bcategory,
    config
  );
  return response.data;
};

const bcategoryService = {
  getBcategories,
  createBcategory,
};

export default bcategoryService;
