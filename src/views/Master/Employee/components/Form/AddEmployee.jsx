import React, { useEffect, useState } from 'react'
import { Label, Select } from '../../../../../components/atoms'
// import CurrencyInput from 'components/atoms/CurrencyInput'
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen'
import storeSchema from '@global/store'
import { optionRefByJenis } from '@global/helper/functionOption';

const AddEmployee = ({ detailBillingRealization, getDetailBillingRealization, handleChange, handleChangeCurrency, handleUpdate }) => {
  // console.log('detailBillingRealization', detailBillingRealization);
  // referensi
  const [optVendor, setOptVendor] = useState();
  const [optPosition, setOptPosition] = useState();

  useEffect(() => {
    const getOptvendor = async () => {
      try {
        const res = await storeSchema.actions.getListVendor();
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.nama_perusahaan,
              value: item?.vendor_id,
            }
          })
          setOptVendor(option);
        } else {
          setOptVendor([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    getOptvendor();
  }, []);

  useEffect(() => {
    const fetchOption = async () => {
      setOptPosition(await optionRefByJenis('position_id'));
    };
    fetchOption();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='NIK'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='name'
                // value={dataDetail?.TERMIN}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Nama'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='name'
                // value={dataDetail?.TERMIN}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Role'
              children={
                <Select
                  name='role'
                  className='pl-0'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Divisi'
              children={
                <Select
                  name='role'
                  className='pl-0'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Department'
              children={
                <Select
                  name='role'
                  className='pl-0'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Tipe Pekerja'
              children={
                <Select
                  name='role'
                  className='pl-0'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Start Date'
              children={
                <input
                  type="date"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='name'
                // value={dataDetail?.TERMIN}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='End Date'
              children={
                <input
                  type="date"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='name'
                // value={dataDetail?.TERMIN}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Lama Kerja'
              children={
                <input
                  type="number"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='name'
                // value={dataDetail?.TERMIN}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Status'
              children={
                <Select
                  name='role'
                  className='pl-0'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default AddEmployee