import React from 'react'
import { AsyncSelect, Label, Select } from '@src/components/atoms';
import storeSchema from '@src/global/store';
import CurrencyInput from '@src/components/atoms/CurrencyInput';

const DetailForm = ({
  options,
  locationState,
  dataDetail,
  setDataDetail,
  customer,
  setCustomer,
  isDetailModalAkselerasi = false,
}) => {
  const handleChange = (e) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeCurrency = (value, name) => {
    if (name === 'NILAI_PENAWARAN' && (dataDetail?.COGS !== '' || dataDetail?.COGS !== 0)) {
      setDataDetail((prev) => {
        return {
          ...prev,
          MARGIN_PENAWARAN: (value - dataDetail?.COGS),
          PERSENTASE_PENAWARAN: ((value - dataDetail?.COGS) / value).toFixed(2) * 100,
        };
      });
    }
    if (name === 'NILAI_KONTRAK' && (dataDetail?.COGS !== '' || dataDetail?.COGS !== 0)) {
      setDataDetail((prev) => {
        return {
          ...prev,
          MARGIN_KONTRAK: (value - dataDetail?.COGS),
          PERSENTASE_KONTRAK: ((value - dataDetail?.COGS) / value).toFixed(2) * 100,
        };
      });
    }
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
        [name === "AREA" ? ("UR_" + name) : (name + "_UR")]: e.label,
        [name === "AREA" ? ("KD_" + name) : (name + "_ID")]: e.value,
      };
    });
  };

  return (
    <div className='flex flex-col gap-2 text-left'>
      {(locationState?.project === "Edit Project" || isDetailModalAkselerasi) && (
        <Label
          label='ID Project'
          children={
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white"
              name='PROJECT_NO'
              onChange={handleChange}
              value={dataDetail?.PROJECT_NO}
              disabled
            />
          }
        />
      )}
      <Label
        label='Nama Project'
        children={
          <input
            type="text"
            className="input input-bordered rounded-[25px] bg-white"
            name='PROJECT_NAME'
            onChange={handleChange}
            value={dataDetail?.PROJECT_NAME}
            disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
          />
        }
      />
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Tipe Project'
            children={
              <Select
                name='PROJECT_TYPE'
                className='pl-0'
                options={options?.tipeProject}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PROJECT_TYPE_UR, value: dataDetail?.PROJECT_TYPE_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : locationState?.project === "Edit Project" ? true : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                options={options?.portofolio}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PORTOFOLIO_UR, value: dataDetail?.PORTOFOLIO_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                options={options?.kategori}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.CATEGORY_UR, value: dataDetail?.CATEGORY_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nama Customer'
            children={
              <AsyncSelect
                name='CUSTOMER'
                loadOptions={(value, callBack) => {
                  const get = async () => {
                    try {
                      const res = await storeSchema.actions.getCustomers(value);
                      const data = res?.data?.map((v) => {
                        return {
                          label: v.customer_name,
                          value: v.customer_id,
                        };
                      });
                      callBack(data);
                    } catch (err) {
                      callBack([]);
                    }
                  };
                  get();
                }}
                onChange={(e, { name }) => {
                  handleChangeOpt(e, name);
                  setCustomer(e);
                }}
                value={isDetailModalAkselerasi ? { label: dataDetail?.CUSTOMER_NAME, value: dataDetail?.CUSTOMER_ID } : customer}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='COGS'
            children={
              <CurrencyInput
                name='COGS'
                onChange={handleChangeCurrency}
                value={dataDetail?.COGS}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nilai Penawaran'
            children={
              <CurrencyInput
                name='NILAI_PENAWARAN'
                onChange={handleChangeCurrency}
                value={dataDetail?.NILAI_PENAWARAN}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                onChange={handleChange}
                value={dataDetail?.CONTRACT_NO}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                onChange={handleChangeCurrency}
                value={dataDetail?.NILAI_KONTRAK}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                onChange={handleChange}
                value={dataDetail?.CONTRACT_START?.substring(0, 10)}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                onChange={handleChange}
                value={dataDetail?.CONTRACT_END?.substring(0, 10)}
                disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Area'
            children={
              <Select
                name='AREA'
                className='pl-0'
                options={options?.area}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.UR_AREA, value: dataDetail?.ID_AREA }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label={`Nilai Gross Margin Penawaran (${dataDetail?.PERSENTASE_PENAWARAN}%)`}
            children={
              <CurrencyInput
                name='MARGIN_PENAWARAN'
                onChange={handleChangeCurrency}
                value={dataDetail?.MARGIN_PENAWARAN}
                disabled={true}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label={`Nilai Gross Margin Kontrak (${dataDetail?.PERSENTASE_KONTRAK}%)`}
            children={
              <CurrencyInput
                name='MARGIN_KONTRAK'
                onChange={handleChangeCurrency}
                value={dataDetail?.MARGIN_KONTRAK}
                disabled={true}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DetailForm