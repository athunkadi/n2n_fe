import React, { useEffect, useState } from 'react'
import { Label } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'
import TabDokumen from '../../../../../views/Project/ListProject/components/TabDokumen'
import storeSchema from '@global/store'

const AddVendorRealization = ({ detailVendorRealization, getDetailVendorRealization, handleChange, handleChangeCurrency, handleUpdate }) => {

  // referensi
  const [optVendor, setOptVendor] = useState();

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

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Label
          label='ID Project'
          children={
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white"
              name='PROJECT_NO'
              value={detailVendorRealization?.PROJECT_NO}
              disabled
            />
          }
        />
        <Label
          label='Nama Project'
          children={
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white"
              name='PROJECT_NAME'
              value={detailVendorRealization?.PROJECT_NAME}
              disabled
            />
          }
        />
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Nama Vendor'
              children={
                // <input
                //   type="text"
                //   className="input input-bordered rounded-[25px] bg-white"
                //   name='NAMA_VENDOR'
                //   value={detailVendorRealization?.NAMA_VENDOR}
                // />
                <select
                  name="VENDOR_ID"
                  className='select select-md w-full input-bordered rounded-[25px] bg-white'
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled></option>
                  {optVendor?.map(data => {
                    return (
                      <option value={data?.value} selected={data?.value === detailVendorRealization?.VENDOR_ID}>{data?.label}</option>
                    )
                  })}
                </select>
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='No Kontrak Vendor'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='NO_KONTRAK'
                  onChange={(e) => handleChange(e)}
                  value={detailVendorRealization?.NO_KONTRAK}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Judul Kontrak'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='JUDUL_KONTRAK'
                  onChange={(e) => handleChange(e)}
                  value={detailVendorRealization?.JUDUL_KONTRAK}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Nominal Kontrak Vendor'
              children={
                <CurrencyInput
                  name='NILAI_KONTRAK'
                  onChange={(value, name) => handleChangeCurrency(value, name)}
                  value={detailVendorRealization?.NILAI_KONTRAK}
                />
              }
            />
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button className='btn btn-primary text-white rounded-[25px] px-5 my-5' onClick={handleUpdate}>
          Save
        </button>
      </div>
      <TabDokumen data={detailVendorRealization} getDetailProject={getDetailVendorRealization} isVendorRealization={true} />
    </>
  )
}

export default AddVendorRealization