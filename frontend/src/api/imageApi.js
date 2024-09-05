import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post(`${apiUrl}images/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const uploadedFilename = response.data;
    return { ok: true, uploadedFilename };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const retrieveImage = async (fileName) => {
    try {
      const response = await axios.get(`${apiUrl}images/retrieve/${fileName}`, {
        responseType: 'arraybuffer'
      });
  
      const imageData = response.data;
      return { ok: true, imageData };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };