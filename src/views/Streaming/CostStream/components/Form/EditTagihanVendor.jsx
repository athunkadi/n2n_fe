import React from 'react'
import { Label, Select } from 'components/atoms'
import CurrencyInput from 'components/atoms/CurrencyInput'

const EditTagihanVendor = ({ dataDetail, setDataDetail, detailDocDelivery, displayStatus }) => {

  const options = [
    {
      label: 'Yes',
      value: 'T',
    },
    {
      label: 'No',
      value: 'F',
    },
  ]

  const handleChange = (e) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleChangeCurrency = (value, name) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeOpt = (e, name) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [name]: e?.value,
      };
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='No Project'
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
        </div>
        <div className='w-full'>
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
        </div>
        <div className='w-full'>
          <Label
            label='Nama Vendor'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='NAMA_VENDOR'
                value={dataDetail?.NAMA_VENDOR}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='No TTB'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='NO_TTB'
                value={dataDetail?.NO_TTB}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='No Invoice'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='NO_INVOICE'
                value={dataDetail?.NO_INVOICE}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Tanggal Invoice'
            children={
              <input
                type="date"
                className="input input-bordered rounded-[25px] bg-white"
                name='TANGGAL_INVOICE'
                onChange={handleChange}
                value={dataDetail?.TANGGAL_INVOICE?.substring(0, 10)}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Nominal Invoice'
            children={
              <CurrencyInput
                name='NOMINAL_INVOICE'
                onChange={handleChangeCurrency}
                value={dataDetail?.NOMINAL_INVOICE}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Status SSC'
            children={
              <Select
                name='STATUS_SSC'
                className='pl-0'
                options={options}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: (dataDetail?.STATUS_SSC === null ? dataDetail?.STATUS_SSC : (dataDetail?.STATUS_SSC === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_SSC }}
                isDisabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Jumlah Pelunasan'
            children={
              <CurrencyInput
                name='NOMINAL_PELUNASAN'
                value={dataDetail?.NOMINAL_PELUNASAN}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Aging Invoice'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='AGING_INVOICE'
                value={dataDetail?.AGING_INVOICE}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Supply Status'
            children={
              <Select
                name='SUPPLY_STATUS'
                className='pl-0'
                options={options}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: (dataDetail?.SUPPLY_STATUS === null ? dataDetail?.SUPPLY_STATUS : (dataDetail?.SUPPLY_STATUS === 'T' ? 'Yes' : 'No')), value: dataDetail?.SUPPLY_STATUS }}
                isDisabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Status Invoice'
            children={
              <Select
                name='STATUS_INVOICE'
                className='pl-0'
                options={options}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: (dataDetail?.STATUS_INVOICE === null ? dataDetail?.STATUS_INVOICE : (dataDetail?.STATUS_INVOICE === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_INVOICE }}
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Status Payment'
            children={
              <Select
                name='STATUS_PELUNASAN'
                className='pl-0'
                options={options}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: (dataDetail?.STATUS_PELUNASAN === null ? dataDetail?.STATUS_PELUNASAN : (dataDetail?.STATUS_PELUNASAN === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PELUNASAN }}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Tanggal Selesai SSC'
            children={
              <input
                type="date"
                className="input input-bordered rounded-[25px] bg-white"
                name='TANGGAL_SELESAI_SSC'
                onChange={handleChange}
                value={dataDetail?.TANGGAL_SELESAI_SSC?.substring(0, 10)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Keterangan'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='keterangan'
                value={dataDetail?.KETERANGAN}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EditTagihanVendor