import React, { useEffect, useState } from 'react'
import { Label } from '../../../../../components/atoms';
import CurrencyInput from '../../../../../components/atoms/CurrencyInput';
import storeSchema from '@global/store';
import { swal } from '@global/helper/swal';
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

const EditVendorRealization = ({ dataDetail, getDetailProjectVendor }) => {
  const navigation = useNavigate();
  const location = useLocation();

  const headerVendorPlanningTable = ["Nama Vendor", "Nominal Estimasi Vendor"];
  const headerListVendor = ["Nama Vendor", "No Kontrak", "Judul Kontrak", "Nominal Kontrak Vendor"];
  const dummyField = {
    project_vendor_id: '',
    vendor_id: '',
    ur_vendor: '',
    no_kontrak: '',
    judul_kontrak: '',
    nilai_kontrak: '',
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const [dataFields, setDataFields] = useState([dummyField]);

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

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    setDataFields(values);
  };

  useEffect(() => {
    const vendorFinal = dataDetail?.VENDOR_FINAL;
    if (vendorFinal?.length > 0) {
      const newData = vendorFinal?.map((value) => {
        return {
          project_vendor_id: value?.PROJECT_VENDOR_ID,
          vendor_id: value?.VENDOR_ID,
          ur_vendor: value?.NAMA_VENDOR,
          nilai_kontrak: value?.NILAI_KONTRAK,
          no_kontrak: value?.NO_KONTRAK,
          judul_kontrak: value?.JUDUL_KONTRAK,
          flag_crud: value?.FLAG_CRUD,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyField]);
    };
    // eslint-disable-next-line
  }, [dataDetail]);

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyField,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteVendorPlanning(targetValue?.project_vendor_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProjectVendor();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleUpload = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFields[i];
      const payload = {
        project_id: dataDetail?.PROJECT_ID,
        nilai_kontrak: value?.nilai_kontrak.replace(",", "."),
        vendor_id: value?.vendor_id,
        judul_kontrak: value?.judul_kontrak,
        no_kontrak: value?.no_kontrak,
        flag_final: 'Y',
      };

      const res = await storeSchema.actions.vendorPlanning(payload);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProjectVendor();
    } catch (error) {
      console.error(error);
    };
  };

  const handleEditDetail = async (e, sub_data) => {
    e.preventDefault();
    navigation('/add-vendor-realization', {
      state: {
        ...location.state,
        sub_project: 'Add Vendor Realization',
        sub_data,
      },
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10'>
        <div className='w-2/6'>
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
        </div>
        <div className='w-3/6'>
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
        <div className='w-3/6'>
          <Label
            label='Harga Pemenuhan Layanan Kebutuhan Pelanggan'
            children={
              <CurrencyInput
                name='EST_HARGA_PEMENUHAN'
                value={dataDetail?.EST_HARGA_PEMENUHAN}
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
      {/* VENDOR PLANNING */}
      <div className="card border-2 my-5">
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Vendor Planning</div>
        <div className="card-body">
          <div className="max-h-64 overflow-auto">
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerVendorPlanningTable?.map((title, i) => {
                    return (
                      <th key={i}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataDetail?.VENDOR_PLANNING?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name='NAMA_VENDOR'
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.NAMA_VENDOR}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name='NILAI_KONTRAK'
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.NILAI_KONTRAK}
                        disabled
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* LIST VENDOR FINAL */}
      <div className="card border-2 my-5">
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>List Vendor</div>
        <div className="card-body">
          <div className="max-h-64 overflow-auto">
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerListVendor?.map((title, i) => {
                    return (
                      <th key={i}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataFields?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        name="vendor_id"
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      >
                        <option value="" disabled></option>
                        {optVendor?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.vendor_id}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name='no_kontrak'
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.no_kontrak}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name='judul_kontrak'
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.judul_kontrak}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='flex gap-3'>
                      <CurrencyInput
                        name='nilai_kontrak'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.nilai_kontrak}
                        disabled={item?.status?.canDelete}
                      />
                      <div className='flex items-center gap-3'>
                        {item?.status?.canUpload ? (
                          <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                            <AiOutlineSave />
                          </div>
                        ) : (
                          <div className='btn btn-sm bg-white' onClick={(e) => handleEditDetail(e, item)}>
                            <HiOutlinePencilAlt />
                          </div>
                        )}
                        <div className='btn btn-sm bg-red-500 text-white' onClick={(e) => handleRemoveField(e, index)}>
                          <IoMdTrash />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary w-60' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Vendor
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditVendorRealization