import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const createOrder = async (orderData) => {
  const totalAmount = orderData.totalAmount;
  const subTotal = orderData.subTotal;
  const discount = orderData.discount;
  const status = orderData.status;
  const paymentMethod = orderData.paymentMethod;
  const orderType = orderData.orderType;
  const deliveryAddress = orderData.deliveryAddress;
  const userId = orderData.userId;
  try {
    const response = await axios.post(`${apiUrl}orders`, {
      totalAmount,
      subTotal,
      discount,
      status,
      paymentMethod,
      orderType,
      deliveryAddress,
      userId,
    });
    const { id } = response.data;
    return { ok: true, id };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}orders`);
    const orders = response.data;
    return { ok: true, orders };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}orders/${id}`);
    return { ok: true, order: response.data };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const updateOrder = async (id, updatedOrder) => {
  try {
    const response = await axios.put(`${apiUrl}orders/${id}`, updatedOrder);
    return { ok: true, order: response.data };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${apiUrl}orders/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const createOrderItem = async (orderItemData) => {
  const quantity = orderItemData.quantity;
  const unitPrice = orderItemData.unitPrice;
  const totalAmount = orderItemData.totalAmount;
  const orderId = orderItemData.orderId;
  const productId = orderItemData.productId;
  const serviceId = orderItemData.serviceId;
  const offerId = orderItemData.offerId;
  try {
    const response = await axios.post(`${apiUrl}order-items`, {
      quantity,
      unitPrice,
      totalAmount,
      orderId,
      productId,
      serviceId,
      offerId,
    });
    const { id } = response.data;
    return { ok: true, id };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteOrderItem = async (id) => {
  try {
    await axios.delete(`${apiUrl}order-items/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const getOrderItemsByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`${apiUrl}order-items/by-order/${orderId}`);
    const orderItems = response.data;
    return { ok: true, orderItems };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteOrderItemsByOrderId = async (orderId) => {
  try {
    await axios.delete(`${apiUrl}order-items/by-order/${orderId}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};