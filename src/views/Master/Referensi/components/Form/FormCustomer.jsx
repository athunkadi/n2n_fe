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
              label='Kode Akun'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='kode_akun'
                  onChange={handleChange}
                  value={data?.kode_akun}
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
                  name='customer_name'
                  onChange={handleChange}
                  value={data?.customer_name}
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
                  name='npwp'
                  onChange={handleChange}
                  value={data?.npwp}
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
                  name='address'
                  onChange={handleChange}
                  value={data?.address}
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
                  name='email'
                  onChange={handleChange}
                  value={data?.email}
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
                  name='fax'
                  onChange={handleChange}
                  value={data?.fax}
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
                  name='telp'
                  onChange={handleChange}
                  value={data?.telp}
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
                  name='description'
                  value={data?.description}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Status'
              children={
                <Select
                  name='flag_aktif'
                  className='pl-0'
                  options={optStatus}
                  onChange={(e, { name }) => handleChangeOpt(e, name)}
                  value={{ label: data?.flag_aktif === 'Y' ? 'Aktif' : 'Non Aktif', value: data?.flag_aktif }}
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