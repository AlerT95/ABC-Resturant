import axios from "axios";
import config from "../utils/config.json";

const apiUrl = config.API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}users/login`, {
      email,
      password,
    });
    const { message, user } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return { ok: true, message };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const updateUser = async (id, userObj) => {
  const userType = userObj.userType;
  const status = userObj.status;
  try {
    const response = await axios.post(`${apiUrl}users/update-user`, {
      id,
      userType,
      status,
    });
    const { message, data } = response.data;
    return { ok: true, message, data };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}users/register`, {
      email,
      password,
    });
    const { message, user } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return { ok: true, message };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}users/request-password-reset`, {
      email,
    });
    const { message } = response.data;
    return { ok: true, message };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(`${apiUrl}users/reset-password`, {
      email,
      verificationCode,
      newPassword,
    });
    const { message, user } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return { ok: true, message };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const verifyUser = async (verificationCode) => {
  try {
    const localStorageUser = localStorage.getItem("user");
    const storedUser = JSON.parse(localStorageUser);
    const email = storedUser.email;

    const response = await axios.post(`${apiUrl}users/verify`, {
      email,
      verificationCode,
    });
    const { message, user } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return { ok: true, message };
  } catch (error) {
    return { ok: false, message: error.response.data.message };
  }
};

export const deleteUser = async (email) => {
    try {
      const response = await axios.delete(`${apiUrl}users/delete/${email}`);
      const { message } = response.data;
      return { ok: true, message };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };
  export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}users/all`);
      const users = response.data.users;
      return { ok: true, users };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };


  export const updatePassword = async (email, currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${apiUrl}users/update-password`, {
        email,
        currentPassword,
        newPassword,
      });
      const { message } = response.data;
      return { ok: true, message };
    } catch (error) {
      return { ok: false, message: error.response.data.message };
    }
  };
