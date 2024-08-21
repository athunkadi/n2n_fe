import React, { useEffect, useState } from 'react'
import { swal } from '@global/helper/swal';
import storeSchema from '@global/store';
import { FaArrowLeft } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import EditVendorRealization from './Form/EditVendorRealization';
import { IoIosArrowForward } from 'react-icons/io';
import AddVendorRealization from './Form/AddVendorRealization';

const AddEditVendorRealization = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, sub_project, menu, data, sub_data } = location?.state;

  const [dataDetail, setDataDetail] = useState({});
  const [detailVendorRealization, setDetailVendorRealization] = useState({});

  const getDetailProjectVendor = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProjectVendor(data?.project_id);
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

  const getDetailVendorRealization = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailVendorRealization(sub_data?.project_vendor_id);
      if (res?.status === true) {
        setDetailVendorRealization(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Edit Vendor Realization" && sub_project === "Add Vendor Realization") {
      getDetailProjectVendor();
      getDetailVendorRealization();
    } else {
      getDetailProjectVendor();
    };
    // eslint-disable-next-line
  }, [project, sub_project]);

  const handleChange = (e) => {
    const values = { ...detailVendorRealization };
    values[e.target.name] = e.target.value;
    setDetailVendorRealization(values);
  };

  const handleChangeCurrency = (value, name) => {
    const values = { ...detailVendorRealization };
    values[name] = value;
    setDetailVendorRealization(values);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = detailVendorRealization;
      const payload = {
        project_id: value?.PROJECT_ID,
        project_vendor_id: sub_data?.project_vendor_id,
        nilai_kontrak: value?.NILAI_KONTRAK.replace(",", "."),
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
      getDetailProjectVendor();
      getDetailVendorRealization();
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
                navigation("/edit-vendor-realization", { state: locationState })
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
              <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/vendor-index", { state: { menu } })} />
              <p className='text-lg font-bold'>{project}</p>
            </div>
          )}
        </div>
        {/* FORM */}
        {sub_project ? (
          <AddVendorRealization
            detailVendorRealization={detailVendorRealization}
            getDetailVendorRealization={getDetailVendorRealization}
            handleChange={handleChange}
            handleChangeCurrency={handleChangeCurrency}
            handleUpdate={handleUpdate}
          />
        ) : (
          <EditVendorRealization dataDetail={dataDetail} getDetailProjectVendor={getDetailProjectVendor} />
        )}
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditVendorRealization