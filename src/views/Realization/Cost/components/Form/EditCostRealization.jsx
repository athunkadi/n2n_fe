import { Label } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'
import React, { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import storeSchema from '@global/store';
import { swal } from '@global/helper/swal';
import { formatCurrency } from '@global/helper/formatCurrency';
import { dummyFieldCostPersonilPlanning } from '../DataDummy';
import { optionRefByJenis } from '@global/helper/functionOption';
import { IoIosArrowDown } from 'react-icons/io';
import TotalCost from '@assets/icons/RdTotalCost.svg';

const EditCostRealization = ({ dataDetail, getDetailProject }) => {
  const headerTable = ['Role', 'Kualifikasi', 'Qty', 'UoM', 'Qty', 'UoM', 'Unit Cost', 'Cost', '', ''];
  const headerExpandTable = ['Nama Employee', 'Divisi', 'Manday', ''];
  const dataDummy = {
    position_id: "",
    kualifikasi_id: "",
    qty_person: 0,
    satuan_person: "",
    ur_satuan_person: "",
    qty_date: 0,
    satuan_date: "",
    ur_satuan_date: "",
    cost_unit: "",
    cost_total: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  }

  const dataDummyExpand = {
    personel_id: "",
    user_id: "",
    nik: "",
    nama_personil: "",
    divisi_id: "",
    qty_date: "",
    satuan_date: "1",
    flag_personil: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  }

  const [dataFields, setDataFields] = useState([dataDummy]);
  const [dataFieldsExpand, setDataFieldsExpand] = useState([dataDummyExpand]);
  const [totalCost, setTotalCost] = useState(0);
  const [personelId, setPersonelId] = useState();

  // referensi
  const [optPosition, setOptPosition] = useState();
  const [optDivisi, setOptDivisi] = useState();
  const [optKualifikasi, setOptKualifikasi] = useState();
  const [optSatuanPerson, setOptSatuanPerson] = useState();
  const [optSatuanDate, setOptSatuanDate] = useState();
  const [expandTable, setExpandTable] = useState({ project_id: null, isExpand: false });

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeExpand = (e, i) => {
    const values = [...dataFieldsExpand];
    values[i][e.target.name] = e.target.value;
    setDataFieldsExpand(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    if (name === 'cost_unit') {
      setDataFields((prev) => {
        const newValues = [...prev];
        newValues[index]['cost_total'] = value * newValues[index]['qty_date'] * newValues[index]['qty_person'];
        return newValues;
      })
    }
    setDataFields(values);
  };

  const handleCounter = (name, i, action) => {
    const values = [...dataFields];
    if (action === 'plus') {
      values[i][name] = ++values[i][name];
    } else if (action === 'minus' && values[i][name] > 0) {
      values[i][name] = --values[i][name];
    };

    if (name === 'qty_date' || name === 'qty_person') {
      setDataFields((prev) => {
        const newValues = [...prev];
        newValues[i]['cost_total'] = values[i]['cost_unit'] * values[i]['qty_date'] * values[i]['qty_person'];
        return newValues;
      })
    }
    setDataFields(values);
  };

  const uploadCostPersonilPlanning = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFields[i];
      const payload = {
        project_id: dataDetail?.PROJECT_ID,
        position_id: value?.position_id,
        kualifikasi_id: value?.kualifikasi_id,
        qty_person: value?.qty_person,
        satuan_person: value?.satuan_person,
        qty_date: value?.qty_date,
        satuan_date: value?.satuan_date,
        cost_unit: value?.cost_unit,
        cost_total: value?.cost_total,
      };

      const res = await storeSchema.actions.costPersonilPlanning(payload);
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

  const uploadCostPersonilDetail = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFieldsExpand[i];
      const payload = {
        sub_dpersonel_id: "",
        personel_id: personelId,
        user_id: value?.user_id,
        nik: value?.nik,
        nama_personil: value?.nama_personil,
        divisi_id: value?.divisi_id,
        qty_date: value?.qty_date,
        satuan_date: "1",
        flag_personil: "Y"
      };

      const res = await storeSchema.actions.costPersonilDetail(payload);
      if (res?.status === true) {
        await swal.success(res?.message);
      } else {
        await swal.error(res?.message);
      };
      getCostPersonilDetail(personelId)
    } catch (error) {
      console.error(error);
    };
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteCostPersonilPlanning(targetValue?.personel_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleRemoveFieldExpand = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFieldsExpand];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteCostPersonilDetail(targetValue?.dpersonel_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getCostPersonilDetail(personelId)
      } else {
        values.splice(i, 1);
        setDataFieldsExpand(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyFieldCostPersonilPlanning,
    ])
  };

  const handleAddFieldExpand = () => {
    setDataFieldsExpand([
      ...dataFieldsExpand,
      dataDummyExpand,
    ])
  };

  useEffect(() => {
    setTotalCost(0);
    const valueCostPersonilDetail = dataDetail?.DETAIL_COST;
    if (valueCostPersonilDetail?.length > 0) {
      const newData = valueCostPersonilDetail?.map((value) => {
        setTotalCost((prev) => (prev + value?.COST_TOTAL));
        return {
          personel_id: value?.PERSONEL_ID,
          ur_position: value?.POSITION,
          position_id: value?.POSITION_ID,
          ur_kualifikasi: value?.KUALIFIKASI,
          kualifikasi_id: value?.KUALIFIKASI_ID,
          qty_person: value?.QTY_PERSON,
          ur_satuan_person: value?.UR_SATUAN_PERSON,
          satuan_person: value?.SATUAN_PERSON,
          qty_date: value?.QTY_DATE,
          ur_satuan_date: value?.UR_SATUAN_DATE,
          satuan_date: value?.SATUAN_DATE,
          cost_unit: value?.COST_UNIT,
          cost_total: value?.COST_TOTAL,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyFieldCostPersonilPlanning]);
    };
    // eslint-disable-next-line
  }, [dataDetail]);

  const getCostPersonilDetail = async (id) => {
    const res = await storeSchema.actions.getDetailCostPersonilDetail(id);
    if (res?.status === true) {
      const newData = res?.data?.map((value) => {
        return {
          dpersonel_id: value?.DPERSONEL_ID,
          personel_id: value?.PERSONEL_ID,
          user_id: value?.USER_ID,
          nik: value?.NIK,
          nama_personil: value?.NAMA_PERSONIL,
          divisi_id: value?.DIVISI_ID,
          qty_date: value?.QTY_DATE,
          satuan_date: value?.SATUAN_DATE,
          flag_personil: value?.FLAG_PERSONIL,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFieldsExpand(newData)
    } else {
      setDataFieldsExpand([])
    }
  }

  const handleExpand = async (e, value) => {
    e.preventDefault();
    setExpandTable(prev => {
      if (prev.personel_id === value.personel_id) {
        return {
          personel_id: value.personel_id,
          isExpand: !prev?.isExpand,
        };
      } else {
        return {
          personel_id: value.personel_id,
          isExpand: true,
        }
      }
    })
    setPersonelId(value.personel_id)
    getCostPersonilDetail(value?.personel_id)
  }

  useEffect(() => {
    const fetchOption = async () => {
      setOptPosition(await optionRefByJenis('position_id'));
      setOptDivisi(await optionRefByJenis('divisi_id'));
      setOptKualifikasi(await optionRefByJenis('kualifikasi_id'));
      setOptSatuanPerson(await optionRefByJenis('satuan_person'));
      setOptSatuanDate(await optionRefByJenis('satuan_date'));
    };
    fetchOption();
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10'>
        <div className='w-1/2'>
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
        <div className='w-1/2'>
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
        <div className='w-1/2'>
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
      <div className="card border-2 p-5 my-10">
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-bold'>Role</div>
        <div className='overflow-x-auto'>
          <table className='table table-sm'>
            <thead>
              <tr className='bg-white'>
                {headerTable?.map((title, i) => {
                  return (
                    <th key={i}>{title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataFields?.map((item, index) => (
                <>
                  <tr key={index}>
                    <td className='min-w-48'>
                      <select
                        name={"position_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      >
                        <option value=""></option>
                        {optPosition?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.position_id}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='min-w-40'>
                      <select
                        name={"kualifikasi_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      >
                        <option value=""></option>
                        {optKualifikasi?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.kualifikasi_id}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='min-w-36'>
                      <div className='relative'>
                        {item?.status?.canDelete ? (
                          null
                        ) : (
                          <>
                            <div
                              className='absolute btn btn-xs top-1 left-3 size-6'
                              onClick={() => handleCounter('qty_person', index, 'minus')}
                              disabled={item?.status?.canDelete}
                            >
                              -
                            </div>
                            <div
                              className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                              onClick={() => handleCounter('qty_person', index, 'plus')}
                              disabled={item?.status?.canDelete}
                            >
                              +
                            </div>
                          </>
                        )}
                        <div className='input input-sm input-bordered rounded-[25px] bg-white text-center'>
                          {item?.qty_person}
                        </div>
                      </div>
                    </td>
                    <td className='min-w-32'>
                      <select
                        name={"satuan_person"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      >
                        <option value=""></option>
                        {optSatuanPerson?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.satuan_person}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='min-w-36'>
                      <div className='relative'>
                        {item?.status?.canDelete ? (
                          null
                        ) : (
                          <>
                            <div
                              className='absolute btn btn-xs top-1 left-3 size-6'
                              onClick={() => handleCounter('qty_date', index, 'minus')}
                              disabled={item?.status?.canDelete}
                            >
                              -
                            </div>
                            <div
                              className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                              onClick={() => handleCounter('qty_date', index, 'plus')}
                              disabled={item?.status?.canDelete}
                            >
                              +
                            </div>
                          </>
                        )}
                        <div className='input input-sm input-bordered rounded-[25px] bg-white text-center'>
                          {item?.qty_date}
                        </div>
                      </div>
                    </td>
                    <td className='min-w-32'>
                      <select
                        name={"satuan_date"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      >
                        <option value=""></option>
                        {optSatuanDate?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.satuan_date}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='min-w-48'>
                      <CurrencyInput
                        name={"cost_unit"}
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.cost_unit}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-48'>
                      <CurrencyInput
                        name={"cost_total"}
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.cost_total}
                        disabled={true}
                      />
                    </td>
                    <td>
                      {item?.status && (
                        <div className='flex items-center'>
                          {item?.status?.canUpload && (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => uploadCostPersonilPlanning(e, index)}>
                              <AiOutlineSave />
                            </div>
                          )}
                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                            <IoMdTrash />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className='flex justify-center'>
                      {item?.status?.canUpload === false && (
                        <span className={`border-2 rounded-[50%] bg-primary p-1 arrow ${(expandTable.personel_id === item.personel_id && expandTable.isExpand === true) ? 'rotate' : ''}`} onClick={(e) => handleExpand(e, item)}>
                          <IoIosArrowDown className='text-white text-lg' />
                        </span>
                      )}
                    </td>
                  </tr>
                  {(expandTable.personel_id === item.personel_id && expandTable.isExpand === true) && (
                    <tr className='bg-sky-50'>
                      <td colSpan={10} className='pb-5'>
                        <table className='table table-xs'>
                          <thead>
                            <tr>
                              {headerExpandTable?.map((header, i) => {
                                return (
                                  <th key={i} className='text-xs'>
                                    {header}
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {dataFieldsExpand?.map((vExpand, iExpand) => {
                              return (
                                <tr key={iExpand}>
                                  <td>
                                    <input
                                      type="text"
                                      name={"nama_personil"}
                                      className="input input-sm input-bordered rounded-[25px] bg-white w-full"
                                      // size='-sm'
                                      onChange={(value, name) => {
                                        if (vExpand?.status?.canDelete) {
                                          return
                                        };
                                        handleChangeExpand(value, iExpand)
                                      }}
                                      value={vExpand?.nama_personil}
                                      disabled={vExpand?.status?.canDelete}
                                    />
                                  </td>
                                  <td>
                                    <select
                                      name={"divisi_id"}
                                      className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                                      onChange={(e) => handleChangeExpand(e, iExpand)}
                                      disabled={vExpand?.status?.canDelete}
                                    >
                                      <option value=""></option>
                                      {optDivisi?.map(data => {
                                        return (
                                          <option value={data?.value} selected={data?.value === vExpand?.divisi_id}>{data?.label}</option>
                                        )
                                      })}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name={"qty_date"}
                                      className="input input-sm input-bordered rounded-[25px] bg-white w-full"
                                      // size='-sm'
                                      onChange={(value, name) => {
                                        if (vExpand?.status?.canDelete) {
                                          return
                                        };
                                        handleChangeExpand(value, iExpand)
                                      }}
                                      value={vExpand?.qty_date}
                                      disabled={vExpand?.status?.canDelete}
                                    />
                                  </td>
                                  <td className='flex justify-end'>
                                    {vExpand?.status && (
                                      <div className='flex items-center'>
                                        {vExpand?.status?.canUpload && (
                                          <div className='btn btn-sm bg-primary text-white' onClick={(e) => uploadCostPersonilDetail(e, iExpand)}>
                                            <AiOutlineSave />
                                          </div>
                                        )}
                                        <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldExpand(e, iExpand)}>
                                          <IoMdTrash />
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        <div type="button" disabled={(dataFieldsExpand.filter(a => a.status.canUpload === true).length) === 1 ? true : parseInt(item?.qty_person) === dataFieldsExpand.length ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-42' onClick={handleAddFieldExpand}>
                          <RxPlusCircled size='20px' /> Add Employee
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* {data?.FLAG_EDIT && ( */}
        <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-32' onClick={handleAddField}>
          <RxPlusCircled size='20px' /> Add Role
        </div>
        {/* )} */}
        <hr className='my-3' />
        <div className='flex flex-row bg-yellow-200 font-bold w-full rounded-full py-2 px-6'>
          <img src={TotalCost} />
          <p className='text-sm px-2 self-center'>Total Cost</p>
          <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default EditCostRealization