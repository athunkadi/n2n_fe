import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from 'global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import EditBillingRealization from './Form/EditBillingRealization';
import AddBillingRealization from './Form/AddBillingRealization';
import TabDokumen from 'views/Project/ListProject/components/TabDokumen';
import { IoIosArrowForward } from 'react-icons/io';

const AddEditBillingRealization = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, sub_project, menu, data, sub_data } = location?.state;

  const [dataDetail, setDataDetail] = useState({});
  const [detailBillingRealization, setDetailBillingRealization] = useState({});

  const getDetailProject = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProject(data?.project_id);
      if (res?.status === true) {
        setDataDetail(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getDetailBillingRealization = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailVendorRealization(sub_data?.project_vendor_id);
      if (res?.status === true) {
        setDetailBillingRealization(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Edit Billing Realization" && sub_project === "Add Vendor Billing") {
      getDetailProject();
      getDetailBillingRealization();
    } else {
      getDetailProject();
    };
    // eslint-disable-next-line
  }, [project, sub_project]);

  const handleChange = (e) => {
    const values = { ...detailBillingRealization };
    values[e.target.name] = e.target.value;
    setDetailBillingRealization(values);
  };

  const handleChangeCurrency = (value, name) => {
    const values = { ...detailBillingRealization };
    values[name] = value;
    setDetailBillingRealization(values);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const value = detailBillingRealization;
      const payload = {
        project_id: value?.PROJECT_ID,
        project_vendor_id: sub_data?.project_vendor_id,
        nilai_kontrak: value?.NILAI_KONTRAK,
        vendor_id: value?.VENDOR_ID,
        judul_kontrak: value?.JUDUL_KONTRAK,
        no_kontrak: value?.NO_KONTRAK,
        flag_final: value?.FLAG_FINAL,
      };

      const res = await storeSchema.actions.vendorPlanning(payload);
      if (res?.status === true) {
        await swal.success(res?.data);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      getDetailBillingRealization();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          {sub_project ? (
            <>
              <div className='flex items-center gap-4 cursor-pointer text-gray-500 hover:text-black' onClick={() => {
                const { sub_project, sub_data, ...locationState } = location?.state;
                navigation("/edit-billing-realization", { state: locationState })
              }}>
                <FaArrowLeft />
                <p className='text-lg font-semibold '>{project}</p>
              </div>
              <div className='flex items-center gap-4'>
                <IoIosArrowForward />
                <p className='text-lg font-bold'>{sub_project}</p>
              </div>
            </>
          ) : (
            <div className='flex items-center gap-4'>
              <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/billing-index", { state: { menu } })} />
              <p className='text-lg font-bold'>{project}</p>
            </div>
          )}
        </div>
        {/* FORM */}
        {sub_project ? (
          <AddBillingRealization
            detailBillingRealization={detailBillingRealization}
            getDetailBillingRealization={getDetailBillingRealization}
            handleChange={handleChange}
            handleChangeCurrency={handleChangeCurrency}
            handleUpdate={handleUpdate}
          />
        ) : (
          <EditBillingRealization dataDetail={dataDetail} getDetailProject={getDetailProject} />
        )}

        {/* TAB DOKUMEN */}
        <TabDokumen
          data={sub_project ? detailBillingRealization : dataDetail}
          getDetailProject={sub_project ? getDetailBillingRealization : getDetailProject}
          isBillingRealization={true}
        />
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditBillingRealization