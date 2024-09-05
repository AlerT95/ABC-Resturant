import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const createProduct = async (productObj) => {
  const productName = productObj.productName;
  const imageUrl = productObj.imageUrl;
  const price = productObj.price;
  const description = productObj.description;
  const status = productObj.status;
  const categoryId = productObj.categoryId;
  try {
    const response = await axios.post(`${apiUrl}products`, {
      productName,
      imageUrl,
      price,
      description,
      status,
      categoryId,
    });
    const { id } = response.data;
    return { ok: true, id };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}products`);
    const products = response.data;
    return { ok: true, products };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}products/${id}`);
    return { ok: true, product: response.data };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const updateProduct = async (
  id,
productObj
) => {
  const productName = productObj.productName;
  const imageUrl = productObj.imageUrl;
  const price = productObj.price;
  const description = productObj.description;
  const status = productObj.status;
  const categoryId= productObj.categoryId;
  try {
    const response = await axios.put(`${apiUrl}products/${id}`, {
      productName,
      imageUrl,
      price,
      description,
      status,
      categoryId,
    });
    return { ok: true, product: response.data };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(
      `${apiUrl}products/category/${categoryName}`
    );
    const products = response.data;
    return { ok: true, products };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiUrl}products/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};
