import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const createProfile = async (
    firstName,
    lastName,
    phoneNumber,
    profilePicture,
    bio,
    userId
  ) => {
    try {
      const response = await axios.post(`${apiUrl}profiles/user/${userId}`, {
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
        bio,
        userId,
      });
      const profile = response.data;
      return { ok: true, profile };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getAllProfiles = async () => {
    try {
      const response = await axios.get(`${apiUrl}profiles`);
      const profiles = response.data;
      return { ok: true, profiles };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getProfileById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}profiles/${id}`);
      const profile = response.data;
      return { ok: true, profile };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const getFirstProfileByUserId = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}profiles/user/${userId}`);
      const profiles = response.data;
      if (profiles.length > 0) {
        return { ok: true, profile: profiles[0] };
      } else {
        return { ok: false, message: "No profiles found for the user" };
      }
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const updateProfile = async (
    id,
    userId,
    firstName,
    lastName,
    phoneNumber,
    profilePicture,
    bio
  ) => {
    try {
      const response = await axios.put(`${apiUrl}profiles/${id}/user/${userId}`, {
        id,
        userId,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
        bio,
      });
      const profile = response.data;
      return { ok: true, profile };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };

  export const deleteProfileByUserId = async (userId) => {
    try {
      await axios.delete(`${apiUrl}profiles/user/${userId}`);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };