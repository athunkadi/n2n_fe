import { api } from '../helper/axiosInstance';

const n2nPostService = {
  login: async (data) => {
    try {
      const response = await api.post("/users/login", {}, {
        headers: {
          authorization: data,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertNewProject: async (data) => {
    try {
      const response = await api.post("/insertNewProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertContactCustomer: async (data) => {
    try {
      const response = await api.post("/insertContactCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsAcceleration: async (data) => {
    try {
      const response = await api.post("/markAsAcceleration", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsActualID: async (data) => {
    try {
      const response = await api.post("/markAsActualID", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsProject: async (data) => {
    try {
      const response = await api.post("/markAsProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsArchive: async (data) => {
    try {
      const response = await api.post("/markAsArchive", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsUnarchive: async (data) => {
    try {
      const response = await api.post("/markAsUnarchive", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  uploadDokumen: async (data) => {
    try {
      const response = await api.post("/uploadDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  uploadDokumenBAMK: async (data) => {
    try {
      const response = await api.post("/uploadDokumenBAMK", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  billingCollection: async (data) => {
    try {
      const response = await api.post("/billingCollection", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  vendorPlanning: async (data) => {
    try {
      const response = await api.post("/vendorPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  CBBPlanning: async (data) => {
    try {
      const response = await api.post("/CBBPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costPersonilPlanning: async (data) => {
    try {
      const response = await api.post("/costPersonilPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costPersonilDetail: async (data) => {
    try {
      const response = await api.post("/insertPersonilDetail", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costOperationalDetail: async (data) => {
    try {
      const response = await api.post("/insertOperationalDetail", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costOperationalDetailDokumen: async (data) => {
    try {
      const response = await api.post("/insertOperationalDetailDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertProjectStatus: async (data) => {
    try {
      const response = await api.post("/insertProjectStatus", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertBillingDokumen: async (data) => {
    try {
      const response = await api.post("/insertBillingDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertCustomer: async (data) => {
    try {
      const response = await api.post("/insertCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  dataRevenueStream: async (data) => {
    try {
      const response = await api.post("/dataRevenueStream", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nPostService;