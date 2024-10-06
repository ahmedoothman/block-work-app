import { API_URL } from "../constants/global/api";
import { getToken } from "../storage/tokenStorage";
import axios from "axios";

const PATH = "api/contracts";

// abdo
export const getAllFreelancerContract = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(
      `${API_URL}/${PATH}/freelancer/my-contracts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "success", data: response.data.data };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: "error",
        statusCode: error.code,
        message: error.message + " Please check your internet connection",
      };
    } else {
      return {
        status: "error",
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

//! Abdo / get-All-Client-Contract
export const getAllClientContract = async () => {
  let token = await getToken();
  try {
    const response = await axios.get(`${API_URL}/${PATH}/client/my-contracts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: "success", data: response.data.data };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: "error",
        statusCode: error.code,
        message: error.message + " Please check your internet connection",
      };
    } else {
      return {
        status: "error",
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

// not now
export const addContractService = async (contract) => {
  let token = await getToken();
  try {
    const response = await axios.post(`${API_URL}/${PATH}`, contract, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: "success", data: response.data.data };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: "error",
        statusCode: error.code,
        message: error.message + " Please check your internet connection",
      };
    } else {
      return {
        status: "error",
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

//! Abdo / update-Contract-Status-Service
/* //' body  
  {
      "status":1 ; //' --> { 0 pending , 1 completed, 2 cancelled}
  }
*/
export const updateContractStatusService = async (id, data) => {
  let token = await getToken();
  try {
    const response = await axios.patch(`${API_URL}/${PATH}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: "success", data: response.data.data };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        status: "error",
        statusCode: error.code,
        message: error.message + " Please check your internet connection",
      };
    } else {
      return {
        status: "error",
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};
