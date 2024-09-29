import { API_URL } from '../constants/global/api';
import { getToken, saveToken } from '../storage/tokenStorage';
import axios from 'axios';

const PATH = 'api/proposals';

/* 
role : client
*/
export const getAllProposalsService = async (jobId) => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/${jobId}/proposals`, {
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

/* 
role : freelancer
*/
// noran
export const getFreelancerProposalsService = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(
      `${API_URL}/${PATH}/freelancer/my-proposals`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
/* 
role : freelancer
*/
// fatma
export const submitProposalService = async (jobId, data) => {
  let token = await getToken();
  try {
    const response = await axios.post(
      `${API_URL}/${PATH}/${jobId}/proposals`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
/* 
role : freelancer
*/
export const updateProposalService = async (proposalId, data) => {
  let token = await getToken();
  try {
    const response = await axios.put(`${API_URL}/${PATH}/${proposalId}`, data, {
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
/* 
role: freelancer
*/
export const deleteProposalService = async (proposalId) => {
  let token = await getToken();
  try {
    const response = await axios.delete(`${API_URL}/${PATH}/${proposalId}`, {
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
/* 
role: client
status: "accepted" or "rejected", "pending"
*/
export const updateProposalStatusService = async (proposalId, status) => {
  let token = await getToken();
  try {
    const response = await axios.patch(
      `${API_URL}/${PATH}/${proposalId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
