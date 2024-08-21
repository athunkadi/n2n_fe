import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from '@global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import FormCustomer from './Form/FormCustomer';
import { IoIosArrowForward } from 'react-icons/io';
import Contact from './Contact';

const AddEditCustomer = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, sub_project, menu, data } = location?.state;

  const [dataDetail, setDataDetail] = useState({});
  const [detailCustomer, setDetailCustomer] = useState();

  const getDetailCustomer = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailCustomer(data?.customer_id);
      if (res?.status === true) {
        setDetailCustomer(res?.data);
      } else {
        swal.error(res?.message);
      }
      swal.close();
    } catch (error) {
      swal.close();
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Edit Customer") {
      getDetailCustomer();
    }
    // eslint-disable-next-line
  }, [project]);

  const handleChange = (e) => {
    const values = { ...detailCustomer };
    values[e.target.name] = e.target.name === 'KODE_AKUN' ? (e.target.value).substring(0,3) : e.target.value;
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
        customer_id: value?.CUSTOMER_ID === undefined ? '' : value?.CUSTOMER_ID,
        kode_akun: value?.KODE_AKUN,
        customer_name: value?.CUSTOMER_NAME,
        npwp: value?.NPWP,
        address: value?.ADDRESS,
        email: value?.EMAIL,
        fax: value?.FAX,
        telp: value?.TELP,
        description: value?.DESCRIPTION,
        flag_aktif: value?.FLAG_AKTIF,
      };

      const res = project === 'Edit Customer' ? await storeSchema.actions.updateCustomer(payload) : await storeSchema.actions.insertCustomer(payload);
      if (res?.status === true) {
        await swal.success(res?.message);
        if (project !== 'Edit Customer') {
          navigation('/edit-customer-master', {
            state: {
              ...location.state,
              project: 'Edit Customer',
              data: {
                customer_id: res?.data?.customer_id,
              },
            },
          });
        }
        getDetailCustomer();
      } else {
        await swal.error(res?.message);
      };
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
          handleChangeOpt={handleChangeOpt}
          data={detailCustomer}
        />
        <hr className='mt-5 mb-1' />
        <div className='flex justify-end'>
          <button className='btn btn-primary text-white rounded-[25px] px-5 my-5'
            onClick={handleSave}
          >
            {project === 'Edit Customer' ? 'Update' : 'Save'}
          </button>
        </div>
        <hr className='mt-5 mb-1' />
        {data && (
          <Contact
            getDetailCustomer={getDetailCustomer}
            data={detailCustomer}
            location={location}
          />
        )}
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditCustomer