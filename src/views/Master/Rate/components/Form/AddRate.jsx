import React, { useEffect, useState } from 'react'
import { Label, Select } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen'
import storeSchema from '@global/store'
import { optionRefByJenis } from '@global/helper/functionOption';

const AddRate = ({ detailBillingRealization, getDetailBillingRealization, handleChange, handleChangeCurrency, handleUpdate }) => {
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
              label='ID Rate'
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
              label='Role'
              children={
                <Select
                  name='role'
                  className='pl-0 z-50'
                  options={optPosition}
                // onChange={(e, { name }) => handleChangeOpt(e, name)}
                // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Kualifikasi'
              children={
                <div className='flex flex-row gap-2'>
                  <div className="input input-bordered flex items-center gap-2 rounded-[25px] bg-white">
                    <input type="number" className="grow w-20" />
                    Year
                  </div>
                  <div className="input input-bordered flex items-center gap-2 rounded-[25px] bg-white">
                    <input type="number" className="grow w-20" />
                    Year
                  </div>
                </div>
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='COGS'
              children={
                <CurrencyInput
                  name='COGS'
                // onChange={handleChangeCurrency}
                // value={dataDetail?.COGS}
                // disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRate