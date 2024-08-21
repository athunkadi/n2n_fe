import React, { useEffect, useState } from 'react'
import { Label, Select } from '../../../../../components/atoms'
// import CurrencyInput from 'components/atoms/CurrencyInput'
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen'
// import storeSchema from 'global/store'
// import { optionRefByJenis } from 'global/helper/functionOption';

const FormCustomer = ({ handleChange, handleChangeOpt, data }) => {
  // console.log('detailBillingRealization', detailBillingRealization);
  // referensi
  const [optVendor, setOptVendor] = useState();
  const optStatus = [{
    label: "Aktif",
    value: "Y",
  }, {
    label: "Tidak Aktif",
    value: "T",
  }];

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Kode Akun (Max: 3 Character)'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='KODE_AKUN'
                  onChange={handleChange}
                  value={data?.KODE_AKUN}
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
                  name='CUSTOMER_NAME'
                  onChange={handleChange}
                  value={data?.CUSTOMER_NAME}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='NPWP'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='NPWP'
                  onChange={handleChange}
                  value={data?.NPWP}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Alamat'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='ADDRESS'
                  onChange={handleChange}
                  value={data?.ADDRESS}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Email'
              children={
                <input
                  type="email"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='EMAIL'
                  onChange={handleChange}
                  value={data?.EMAIL}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Fax'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='FAX'
                  onChange={handleChange}
                  value={data?.FAX}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Telepon'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='TELP'
                  onChange={handleChange}
                  value={data?.TELP}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Deskripsi'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='DESCRIPTION'
                  value={data?.DESCRIPTION}
                  onChange={handleChange}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Status'
              children={
                <Select
                  name='FLAG_AKTIF'
                  className='pl-0'
                  options={optStatus}
                  onChange={(e, { name }) => handleChangeOpt(e, name)}
                  value={{ label: data?.FLAG_AKTIF === 'Y' ? 'Aktif' : 'Non Aktif', value: data?.FLAG_AKTIF }}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormCustomer