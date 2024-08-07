import storeSchema from "global/store";

const optionRefByJenis = async (kd_jns, keyword) => {
  try {
    const res = await storeSchema.actions.getReferensiByJenis(kd_jns, keyword);
    if (res?.status === true) {
      const option = res?.data?.map((item) => {
        return {
          label: item?.ur_ref,
          value: item?.kd_ref,
          data: item,
        }
      })
      return (option);
    } else {
      return ([]);
    };
  } catch (error) {
    console.error(error);
  }
};

const optionPortofolio = async () => {
  try {
    const res = await storeSchema.actions.getPortofolio();
    if (res?.status === true) {
      const option = res?.data?.map((item) => {
        return {
          label: item?.portofolio,
          value: item?.portofolio_id,
          data: item,
        }
      })
      return (option);
    } else {
      return ([]);
    };
  } catch (error) {
    console.error(error);
  }
};

export { optionRefByJenis, optionPortofolio };