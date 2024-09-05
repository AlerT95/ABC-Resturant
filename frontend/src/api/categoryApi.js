import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const createCategory = async (categoryObj) => {
  const categoryName = categoryObj.categoryName;
  const description = categoryObj.description;
    try {
      const response = await axios.post(`${apiUrl}categories`, {
        categoryName,
        description,
      });
      const category = response.data;
      return { ok: true, category };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getAllCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}categories`);
      const categories = response.data;
      return { ok: true, categories };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getCategoryById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}categories/${id}`);
      const category = response.data;
      return { ok: true, category };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getCategoryByName = async (categoryName) => {
    try {
      const response = await axios.get(`${apiUrl}categories/name/${categoryName}`);
      const category = response.data;
      return { ok: true, category };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const updateCategory = async (id,categoryObj) => {
    const categoryName = categoryObj.categoryName;
    const description = categoryObj.description;
    try {
      const response = await axios.put(`${apiUrl}categories/${id}`, {
        categoryName,
        description,
      });
      const category = response.data;
      return { ok: true, category };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const deleteCategory = async (id) => {
    try {
      await axios.delete(`${apiUrl}categories/${id}`);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };