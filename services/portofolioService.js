import { API_URL } from '../constants/global/api';
import { getToken } from '../storage/tokenStorage';
import axios from 'axios';

const PATH = 'api/portfolio';

export const getPortfolioService = async (userId) => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/${userId}/explore`, {
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

export const createPortfolioService = async (data) => {
  let token = await getToken();
  try {
    const response = await axios.post(`${API_URL}/${PATH}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

// updatePortfolioService

export const updatePortfolioService = async (id, data) => {
  let token = await getToken();
  try {
    const response = await axios.patch(`${API_URL}/${PATH}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

//deletePortfolioService
export const deletePortfolioService = async (id) => {
  let token = await getToken();
  try {
    const response = await axios.delete(`${API_URL}/${PATH}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
