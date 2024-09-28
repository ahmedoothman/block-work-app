import { API_URL } from '../constants/global/api';
import { getToken, saveToken } from '../storage/tokenStorage';
import axios from 'axios';

// sign up
export const signUpService = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/signup`, data);
    return { status: 'success', data: response.data.message };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + 'Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
        // statusCode: error.response?.status || 'Unknown Error',
        // message: error.response?.data?.message || 'An unknown error occurred',
      };
    }
  }
};

// login
export const loginService = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, data);
    await saveToken(response.data.token);
    return { status: 'success', data: response.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
        // statusCode: error.response?.status || 'Unknown Error',
        // message: error.response?.data.message || 'An unknown error occurred',
      };
    }
  }
};
//getMe
export const getMeService = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

//forgotPasswordService

export const forgotPasswordService = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/forgotPassword`, {
      email,
    });
    return { status: 'success', data: response.data.message };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

// resetPasswordService
export const resetPasswordService = async (otp, password, passwordConfirm) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/users/resetPassword/${otp}`,
      {
        password,
        passwordConfirm,
      }
    );
    return { status: 'success', data: response.data.message };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

// change password
export const changePasswordService = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  const data = {
    passwordCurrent,
    password,
    passwordConfirm,
  };
  let token = await getToken();
  try {
    const response = await axios.patch(
      `${API_URL}/api/users/updateMyPassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

// update me

export const updateMeService = async (name, email, phoneNumber) => {
  const data = {
    name,
    email,
    phoneNumber,
  };
  let token = await getToken();
  try {
    const response = await axios.patch(`${API_URL}/api/users/updateMe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};
