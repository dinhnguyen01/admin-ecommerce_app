import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const upload_preImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};

const delete_preImg = async (filename) => {
  const response = await axios.delete(
    `${base_url}upload/delete/${filename}`,
    config
  );
  return response.data;
};

const uploadService = {
  upload_preImg,
  delete_preImg,
};

export default uploadService;
