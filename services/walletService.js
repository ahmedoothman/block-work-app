import { API_URL } from '../constants/global/api';
import { getToken } from '../storage/tokenStorage';
import axios from 'axios';

const PATH = 'api/wallets';

// abdo
export const getWalletService = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return { status: 'success', data: response.data.data };
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

// abdo
// update wallet
export const chargeWalletService = async (wallet) => {
  let token = await getToken();
  try {
    const response = await axios.patch(
      `${API_URL}/${PATH}/chargeWallet`,
      wallet,
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
