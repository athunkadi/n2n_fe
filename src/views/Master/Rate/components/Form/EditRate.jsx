import React from 'react'
import { Label, Select } from 'components/atoms'
import CurrencyInput from 'components/atoms/CurrencyInput'

const EditRate = ({ dataDetail, getDetailProject }) => {

  return (
    <div className='flex flex-col gap-2'>
      <Label
        label='ID Project'
        children={
          <input
            type="text"
            className="input input-bordered rounded-[25px] bg-white"
            name='PROJECT_NO'
            value={dataDetail?.PROJECT_NO}
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
            value={dataDetail?.PROJECT_NAME}
            disabled
          />
        }
      />
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Tipe Project'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='PROJECT_TYPE'
                value={dataDetail?.PROJECT_TYPE_UR}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Portofolio'
            children={
              <Select
                name='PORTOFOLIO'
                className='pl-0'
                value={{ label: dataDetail?.PORTOFOLIO_UR, value: dataDetail?.PORTOFOLIO_ID }}
                isDisabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Kategori'
            children={
              <Select
                name='CATEGORY'
                className='pl-0'
                value={{ label: dataDetail?.CATEGORY_UR, value: dataDetail?.CATEGORY_ID }}
                isDisabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nama Customer'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='CUSTOMER'
                value={dataDetail?.CUSTOMER_NAME}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Nomor Kontrak'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='CONTRACT_NO'
                value={dataDetail?.CONTRACT_NO}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nilai Kontrak'
            children={
              <CurrencyInput
                name='NILAI_KONTRAK'
                value={dataDetail?.NILAI_KONTRAK}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Start Project'
            children={
              <input
                type="date"
                className="input input-bordered rounded-[25px] bg-white"
                name='CONTRACT_START'
                value={dataDetail?.CONTRACT_START?.substring(0, 10)}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='End Project'
            children={
              <input
                type="date"
                className="input input-bordered rounded-[25px] bg-white"
                name='CONTRACT_END'
                value={dataDetail?.CONTRACT_END?.substring(0, 10)}
                disabled
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EditRate