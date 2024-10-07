import { API_URL } from '../constants/global/api';
import { getToken } from '../storage/tokenStorage';
import axios from 'axios';

const PATH = 'api/reviews';

//noran
export const getReviewsService = async (userId) => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/${userId}`, {
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
// not now

/* 
abdo
{
    "reviewee":"66f8837ef3d43d1de8fd4976",
    "comment":"good freelnacer, well organized , good communication skills",
    "rating":5
}
*/
export const addReviewService = async (review) => {
  let token = await getToken();
  try {
    const response = await axios.post(`${API_URL}/${PATH}`, review, {
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
