import { Label, Select } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'
import React, { useEffect, useState } from 'react'
// import { AiOutlineSave } from 'react-icons/ai';
// import { IoMdTrash } from 'react-icons/io';
// import { RxPlusCircled } from 'react-icons/rx';
import storeSchema from '@global/store';
import { swal } from '@global/helper/swal';
// import { formatCurrency } from 'global/helper/formatCurrency';
// import { optionRefByJenis } from 'global/helper/functionOption';
import ListTab from '../../../../../views/Realization/Cost/components/ListTab';

const EditCostRealizationVendor = ({ dataDetail, getDetailProject }) => {

  const [dataBilling, setDataBilling] = useState();

  // referensi
  // const [optDivisi, setOptDivisi] = useState();
  const [optVendor, setOptVendor] = useState();
  const [optStatusBilling, setOptStatusBilling] = useState();

  const handleChange = (e) => {
    setDataBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeCurrency = (value, name) => {
    setDataBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataBilling;
      const payload = {
        billing_id: dataDetail?.BILLING_ID,
        kd_status: value?.kd_status,
      };

      const res = await storeSchema.actions.billingCollection(payload);
      if (res?.status === true) {
        await swal.success(res?.message);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      // getCostPersonilPlanning();
    } catch (error) {
      console.error(error);
    };
  };

  const handleChangeOpt = (e, name) => {
    setDataBilling((prev) => {
      return {
        ...prev,
        [name === "vendor_id" ? ("nama_vendor") : ("ur_status")]: e.label,
        [name]: e.value,
      };
    });
  };

  useEffect(() => {
    setDataBilling({
      billing_id: dataDetail?.BILLING_ID,
      project_id: dataDetail?.PROJECT_ID,
      project_no: dataDetail?.PROJECT_NO,
      project_name: dataDetail?.PROJECT_NAME,
      vendor_id: dataDetail?.VENDOR_ID,
      nama_vendor: dataDetail.NAMA_VENDOR,
      no_ttb: dataDetail?.NO_TTB,
      no_kontrak: dataDetail?.NO_KONTRAK,
      nilai_kontrak: dataDetail?.NILAI_KONTRAK,
      termin: dataDetail?.TERMIN,
      kd_status: dataDetail?.KD_STATUS,
      uraian_status: dataDetail?.URAIAN_STATUS
    })
    // eslint-disable-next-line
  }, [dataDetail]);

  useEffect(() => {
    const fetchOption = async () => {
      const option = []
      const res = await storeSchema.actions.getListVendor();
      res && res?.data?.forEach(item => {
        option.push({
          label: item.nama_perusahaan,
          value: item.vendor_id,
          data: {
            vendor_id: item.vendor_id,
            nama_perusahaan: item.nama_perusahaan,
            alamat_perusahaan: item.alamat_perusahaan,
            npwp: item.npwp,
            no_telp: item.no_telp,
            email: item.email,
            status: item.status,
            keterangan: item.keterangan
          }
        })
      })
      setOptVendor(option);
      const optionStatus = []
      const resStatus = await storeSchema.actions.getRefStatus('FN1');
      resStatus && resStatus?.data?.forEach(item => {
        optionStatus.push({
          label: item.URAIAN,
          value: item.KD_STATUS,
          data: {
            kd_status: item.KD_STATUS,
            uraian: item.URAIAN,
          }
        })
      })
      setOptStatusBilling(optionStatus);
    };
    fetchOption();
  }, []);

  return (
    <>
      <div className='w-full'>
        <Label
          label='ID Project'
          children={
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white"
              name='id_project'
              value={dataBilling?.project_no}
              disabled={true}
            />
          }
        />
      </div>
      <div className='w-full'>
        <Label
          label='Nama Projek'
          children={
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white"
              name='project_name'
              value={dataBilling?.project_name}
              disabled={true}
            />
          }
        />
      </div>
      <div className='flex flex-col gap-2 mb-7'>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Vendor'
              children={
                <Select
                  name='vendor_id'
                  className='pl-0'
                  options={optVendor}
                  onChange={(e, { name }) => handleChangeOpt(e, name)}
                  value={{ label: dataBilling?.nama_vendor, value: optVendor?.vendor_id }}
                  isDisabled={true}
                />
                // <select
                //   name={"vendor_id"}
                //   className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                //   onChange={(e) => handleChange(e)}
                //   value={dataBilling?.vendor_id}
                // >
                //   <option key={0} value=""></option>
                //   {optVendor?.map((data, i) => {
                //     return (
                //       <option key={i} value={data?.vendor_id}>{data?.nama_perusahaan}</option>
                //     )
                //   })}
                // </select>
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='No TTB'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='no_ttb'
                  onChange={handleChange}
                  value={dataBilling?.no_ttb}
                  disabled={true}
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
                  name='no_kontrak'
                  onChange={handleChange}
                  value={dataBilling?.no_kontrak}
                  disabled={true}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Nilai Kontrak'
              children={
                <CurrencyInput
                  name='nilai_kontrak'
                  onChange={(value, name) => {
                    handleChangeCurrency(value, name)
                  }}
                  value={dataBilling?.nilai_kontrak}
                  disabled={true}
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Termin'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='termin'
                  onChange={handleChange}
                  value={dataBilling?.termin}
                  disabled={true}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Status Billing'
              children={
                <Select
                  name='kd_status'
                  className='pl-0'
                  options={optStatusBilling}
                  onChange={(e, { name }) => handleChangeOpt(e, name)}
                  value={{ label: dataBilling?.uraian_status, value: optStatusBilling?.kd_status }}
                />
                // <select
                //   name={"divisi_id"}
                //   className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                //   onChange={(e) => handleChange(e)}
                //   value={dataBilling?.kd_status}
                // >
                //   <option key={0} value=""></option>
                //   {optDivisi?.map((data, i) => {
                //     return (
                //       <option key={i} value={data?.value}>{data?.label}</option>
                //     )
                //   })}
                // </select>
              }
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
          onClick={(e) => handleSubmit(e)}
        >
          Update
        </button>
      </div>
      <ListTab
        data={dataDetail}
        getDetailProject={getDetailProject}
      />
    </>
  )
}

export default EditCostRealizationVendor