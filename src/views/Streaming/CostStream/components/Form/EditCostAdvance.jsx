import React from 'react'
import { Label, Select } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'

const EditCostAdvance = ({ dataDetail, setDataDetail, detailDocDelivery, displayStatus }) => {

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
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Termin'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='TERMIN'
                value={dataDetail?.TERMIN}
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
            label='Nama Divisi'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='DIVISI_ID'
                value={dataDetail?.DIVISI_ID}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='No PR'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='NO_PR'
                value={dataDetail?.NO_PR}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='No Nodin'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='NO_NODIN'
                value={dataDetail?.NO_NODIN}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Tanggal CA'
            children={
              <input
                type="date"
                className="input input-bordered rounded-[25px] bg-white"
                name='TANGGAL_COST'
                onChange={handleChange}
                value={dataDetail?.TANGGAL_COST?.substring(0, 10)}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Nominal CA'
            children={
              <CurrencyInput
                name='NOMINAL_CA'
                onChange={handleChangeCurrency}
                value={dataDetail?.NILAI_COST}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nominal Realisasi'
            children={
              <CurrencyInput
                name='NOMINAL_REALISASI'
                onChange={handleChangeCurrency}
                value={dataDetail?.NILAI_REALISASI}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Aging CA'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='AGING_CA'
                value={dataDetail?.AGING_CA}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Jumlah Pelunasan'
            children={
              <CurrencyInput
                name='JUMLAH_PELUNASAN'
                onChange={handleChangeCurrency}
                value={dataDetail?.NILAI_PELUNASAN}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Status Invoice Pre-Payment'
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
        <div className='w-full'>
          <Label
            label='Status CA'
            children={
              <Select
                name='STATUS'
                className='pl-0'
                options={options}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: (dataDetail?.STATUS === null ? dataDetail?.STATUS : (dataDetail?.STATUS === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS }}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EditCostAdvance