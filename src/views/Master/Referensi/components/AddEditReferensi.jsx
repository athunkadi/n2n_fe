import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from '@global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import FormCustomer from './Form/FormCustomer';
import { IoIosArrowForward } from 'react-icons/io';
import Contact from './Contact';

const AddEditReferensi = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, sub_project, menu, data, sub_data } = location?.state;

  const [dataDetail, setDataDetail] = useState({});
  const [detailCustomer, setDetailCustomer] = useState({
    customer_id: '',
    kode_akun: '',
    customer_name: '',
    npwp: '',
    address: '',
    email: '',
    fax: '',
    telp: '',
    description: '',
    flag_aktif: '',
  });

  const getDetailCustomer = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailCustomer(data?.customer_id);
      if (res?.status === true) {
        setDetailCustomer(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Edit Customer") {
      getDetailCustomer();
    }
    // eslint-disable-next-line
  }, [project, sub_project]);

  const handleChange = (e) => {
    const values = { ...detailCustomer };
    values[e.target.name] = e.target.value;
    setDetailCustomer(values);
  };

  const handleChangeOpt = (e, name) => {
    setDetailCustomer((prev) => {
      return {
        ...prev,
        [name]: e?.value,
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const value = detailCustomer;
      const payload = {
        customer_id: value?.customer_id,
        kode_akun: value?.kode_akun,
        customer_name: value?.customer_name,
        npwp: value?.npwp,
        address: value?.address,
        email: value?.email,
        fax: value?.fax,
        telp: value?.telp,
        description: value?.description,
        flag_aktif: value?.flag_aktif,
      };

      const res = await storeSchema.actions.insertCustomer(payload);
      if (res?.status === true) {
        await swal.success(res?.data);
      } else {
        await swal.error(res?.message);
      };
      getDetailCustomer();
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
                navigation("/customer-master", { state: locationState })
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
        <hr className='border-t-2 my-6' />
        {/* FORM */}
        <FormCustomer
          handleChange={handleChange}
          // handleChangeCurrency={handleChangeCurrency}
          handleChangeOpt={handleChangeOpt}
          data={detailCustomer}
          // handleUpdate={handleUpdate}
        />
        <hr className='mt-5 mb-1' />
        <div className='flex justify-end'>
          <button className='btn btn-primary text-white rounded-[25px] px-5 my-5'
          onClick={handleSave}
          >
            Save
          </button>
        </div>
        <hr className='mt-5 mb-1' />
        <Contact />
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditReferensi