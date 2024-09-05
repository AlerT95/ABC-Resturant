import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;


export const createOffer = async (offerObj) => {
    const offerName = offerObj.offerName;
    const description = offerObj.description;
    const discountPercentage = offerObj.discountPercentage;
    const startDate = offerObj.startDate[0];
    const endDate = offerObj.endDate[0];
    const productId = offerObj.productId;

    try {
      const response = await axios.post(`${apiUrl}offers`, {
        offerName,
        description,
        discountPercentage,
        startDate,
        endDate,
        productId
      });
      const { id } = response.data;
      return { ok: true, id };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getAllOffers = async () => {
    try {
      const response = await axios.get(`${apiUrl}offers`);
      const offers = response.data;
      return { ok: true, offers };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getOfferById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}offers/${id}`);
      return { ok: true, offer: response.data };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const updateOffer = async (id, offerObj) => {
    const offerName = offerObj.offerName;
    const description = offerObj.description;
    const discountPercentage = offerObj.discountPercentage;
    const startDate = offerObj.startDate[0] ;
    const endDate = offerObj.endDate[0] ;
    const productId = offerObj.productId;
    try {
      const response = await axios.put(`${apiUrl}offers/${id}`,{
        offerName,
        description,
        discountPercentage,
        startDate,
        endDate,
        productId
      } );
      return { ok: true, offer: response.data };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const deleteOffer = async (id) => {
    try {
      await axios.delete(`${apiUrl}offers/${id}`);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };