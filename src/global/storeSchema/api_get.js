import { api } from '../helper/axiosInstance';

const n2nGetService = {
  getListMenu: async (kd_ref) => {
    try {
      const response = await api.get("/getListMenu", {
        params: {
          kd_ref,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPermissionCrud: async (kd_ref) => {
    try {
      const response = await api.get("/getPermissionCrud", {
        params: {
          jns_ref: 'acl_has_permissions',
          kd_ref,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatusProject: async () => {
    try {
      const response = await api.get("/getRefStatusProject");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProject: async ({ page, limit, status, tab_status, order = "DESC", keyword = "", project_type_id }) => {
    try {
      const response = await api.get("/getListProject", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          project_type_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForCostPersonil: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListProjectForCostPersonil", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForCostOperasional: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListProjectForCostOperasional", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForVendorProjectBilling: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListProjectForVendorProjectBilling", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForTagihanVendor: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListProjectForTagihanVendor", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingByTermin: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListBillingByTermin", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getReferensiByJenis: async (jns_ref, keyword = '') => {
    try {
      const response = await api.get("/getReferensiByJenis", {
        params: {
          jns_ref,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSubReferensiByJenis: async (jns_ref, kd_ref, keyword = '') => {
    try {
      const response = await api.get("/getSubReferensiByJenis", {
        params: {
          jns_ref,
          kd_ref,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPortofolio: async () => {
    try {
      const response = await api.get("/getPortofolio");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCustomers: async (keyword) => {
    try {
      const response = await api.get("/getCustomers", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProject: async (project_id) => {
    try {
      const response = await api.get("/getDetailProject", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProjectProfile: async (project_id) => {
    try {
      const response = await api.get("/getDetailProjectProfile", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostPersonil: async (project_id) => {
    try {
      const response = await api.get("/getDetailCostPersonil", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostOperational: async (project_id) => {
    try {
      const response = await api.get("/getDetailCostOperasional", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendorProjectBilling: async (billing_id) => {
    try {
      const response = await api.get("/getDetailVendorProjectBilling", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostOperationalWithDokumen: async (cost_id) => {
    try {
      const response = await api.get("/getDetailCostOperasionalWithDokumenByCostId", {
        params: {
          cost_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostPersonilDetail: async (personel_id) => {
    try {
      const response = await api.get("/getDetailCostPersonilDetail", {
        params: {
          personel_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingCollection: async (project_id) => {
    try {
      const response = await api.get("/getBillingCollection", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getVendorPlanning: async (project_id) => {
    try {
      const response = await api.get("/getVendorPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCBBPlanning: async (project_id) => {
    try {
      const response = await api.get("/getCBBPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCostPersonilPlanning: async (project_id) => {
    try {
      const response = await api.get("/getCostPersonilPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListVendor: async (keyword = "") => {
    try {
      const response = await api.get("/getListVendor", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatus: async (id_tab_status) => {
    try {
      const response = await api.get("/getRefStatus", {
        params: {
          id_tab_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getProjectByType: async (type, keyword = "") => {
    try {
      const response = await api.get("/getProjectByType", {
        params: {
          type,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectVendor: async () => {
    try {
      const response = await api.get("/getListProjectVendor");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProjectVendor: async (project_id) => {
    try {
      const response = await api.get("/getDetailProjectVendor", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendorRealization: async (project_vendor_id) => {
    try {
      const response = await api.get("/getDetailVendorRealization", {
        params: {
          project_vendor_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingRealization: async () => {
    try {
      const response = await api.get("/getBillingRealization");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingDocument: async (billing_id) => {
    try {
      const response = await api.get("/getBillingDocument", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingRevenue: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListBillingRevenue", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailBillingRevenue: async (billing_id) => {
    try {
      const response = await api.get("/getDetailBillingRevenue", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCustomer: async (customer_id) => {
    try {
      const response = await api.get("/getDetailCustomer", {
        params: {
          customer_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCustomer: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListCustomer", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nGetService;