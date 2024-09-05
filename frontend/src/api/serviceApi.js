import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const createService = async (serviceObj) => {
  const serviceName = serviceObj.serviceName;
  const description = serviceObj.description;
  const price = serviceObj.price;
  const categoryId = serviceObj.categoryId;
  try {
    const response = await axios.post(`${apiUrl}services`, {
      serviceName,
      description,
      price,
      categoryId,
    });
    const service = response.data;
    return { ok: true, service };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${apiUrl}services`);
    const services = response.data;
    return { ok: true, services };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}services/${id}`);
    const service = response.data;
    return { ok: true, service };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const updateService = async (id, serviceObj) => {
  const serviceName = serviceObj.serviceName;
  const description = serviceObj.description;
  const price = serviceObj.price;
  const categoryId = serviceObj.categoryId;
  try {
    const response = await axios.put(`${apiUrl}services/${id}`, {
      serviceName,
      description,
      price,
      categoryId,
    });
    const updatedServiceData = response.data;
    return { ok: true, updatedServiceData };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getServicesByCategory = async (categoryName) => {
  try {
    const response = await axios.get(
      `${apiUrl}services/category/${categoryName}`
    );
    const services = response.data;
    return { ok: true, services };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteService = async (id) => {
  try {
    await axios.delete(`${apiUrl}services/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};
