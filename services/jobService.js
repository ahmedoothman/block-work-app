import { API_URL } from '../constants/global/api';
import { getToken, saveToken } from '../storage/tokenStorage';
import axios from 'axios';

const PATH = 'api/jobPosts';

// will be removed
(async () => {
  (
    await saveToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjZmNDcwNGUyNDhkNzI0MDdjZjU2MSIsImlhdCI6MTcyNzUxNTMwOSwiZXhwIjoxNzM1MjkxMzA5fQ.NSlFRXZjGku8v6LDvpy3cIBRMgtga1jzlbr-u3v64fw'
    )
  )();
})();

export const getAllJobsService = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}`, {
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

export const getJobService = async (id) => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/${id}`, {
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

export const createJobService = async (data) => {
  let token = await getToken();
  try {
    const response = await axios.post(`${API_URL}/${PATH}`, data, {
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

export const updateJobService = async (id, data) => {
  let token = await getToken();
  try {
    const response = await axios.put(`${API_URL}/${PATH}/${id}`, data, {
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

export const getMyJobsService = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/client/my-posts`, {
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
