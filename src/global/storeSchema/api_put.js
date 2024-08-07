import { api } from '../helper/axiosInstance';

const n2nPutService = {
  updateProject: async (data) => {
    try {
      const response = await api.put("/updateProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateCustomer: async (data) => {
    try {
      const response = await api.put("/updateCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nPutService;