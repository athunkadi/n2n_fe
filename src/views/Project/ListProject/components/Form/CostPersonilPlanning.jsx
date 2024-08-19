import React, { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import { Label } from '@src/components/atoms';
import CurrencyInput from '@src/components/atoms/CurrencyInput';
import storeSchema from '@src/global/store';
import { swal } from '@src/global/helper/swal';
import { formatCurrency } from '@src/global/helper/formatCurrency';
import { dummyFieldCostPersonilPlanning } from '../DataDummy/index.jsx';
import { optionRefByJenis } from '@src/global/helper/functionOption';
import TotalCost from '@src/assets/icons/RdTotalCost.svg';

const CostPersonilPlanning = ({ data, dataCostPersonilPlanning, getDetailProject, getCostPersonilPlanning }) => {
  const headerTable = ['Role', 'Kualifikasi', 'Qty', 'UoM', 'Qty', 'UoM', 'Unit Cost', 'Cost', ''];
  const [dataFields, setDataFields] = useState([dummyFieldCostPersonilPlanning]);
  const [totalCost, setTotalCost] = useState(0);

  // referensi
  const [optPosition, setOptPosition] = useState();
  const [optKualifikasi, setOptKualifikasi] = useState();
  const [optSatuanPerson, setOptSatuanPerson] = useState();
  const [optSatuanDate, setOptSatuanDate] = useState();

  useEffect(() => {
    const fetchOption = async () => {
      setOptPosition(await optionRefByJenis('position_id'));
      setOptKualifikasi(await optionRefByJenis('kualifikasi_id'));
      setOptSatuanPerson(await optionRefByJenis('satuan_person'));
      setOptSatuanDate(await optionRefByJenis('satuan_date'));
    };
    fetchOption();
  }, []);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    if (name === 'cost_unit' && values[index]['qty_person'] > 0 && values[index]['qty_date'] > 0) {
      values[index]['cost_total'] = value * values[index]['qty_person'] * values[index]['qty_date']
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
    if (name === 'qty_person' && values[i]['cost_unit'] > 0 && values[i]['qty_date'] > 0) {
      values[i]['cost_total'] = values[i][name] * values[i]['cost_unit'] * values[i]['qty_date']
    }
    if (name === 'qty_date' && values[i]['cost_unit'] > 0 && values[i]['qty_person'] > 0) {
      values[i]['cost_total'] = values[i][name] * values[i]['cost_unit'] * values[i]['qty_person']
    }
    setDataFields(values);
  };

  useEffect(() => {
    setTotalCost(0);
    const valueCostPersonilPlanning = dataCostPersonilPlanning?.PERSONEL;
    if (valueCostPersonilPlanning?.length > 0) {
      const newData = valueCostPersonilPlanning?.map((value) => {
        setTotalCost((prev) => (prev + value?.COST_TOTAL));
        return {
          personel_id: value?.PERSONEL_ID,
          ur_position: value?.UR_POSITION,
          position_id: value?.POSITION_ID,
          ur_kualifikasi: value?.UR_KUALIFIKASI,
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
  }, [dataCostPersonilPlanning]);

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyFieldCostPersonilPlanning,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteCostPersonilPlanning(targetValue?.personel_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
        getCostPersonilPlanning();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const uploadCostPersonilPlanning = async (e, i) => {
    e.preventDefault();
    try {
      const value = dataFields[i];
      const payload = {
        project_id: data?.PROJECT_ID,
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
      getCostPersonilPlanning();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='ID Project'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='PROJECT_NO'
                value={data?.PROJECT_NO}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nama Project'
            data={data?.PROJECT_NAME ?? false}
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='PROJECT_NAME'
                value={data?.PROJECT_NAME}
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
                <tr key={index}>
                  <td className='min-w-48'>
                    <select
                      name={"position_id"}
                      className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                      onChange={(e) => handleChange(e, index)}
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            -
                          </div>
                          <div
                            className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                            onClick={() => handleCounter('qty_person', index, 'plus')}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            -
                          </div>
                          <div
                            className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                            onClick={() => handleCounter('qty_date', index, 'plus')}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
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
                    {data?.FLAG_EDIT && (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.FLAG_EDIT && (
          <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-32' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Role
          </div>
        )}
        <hr className='my-3' />
        {/* <div className='flex justify-between w-full bg-yellow-500 rounded-[25px] px-5 py-1 mb-5'>
          <p>Total Cost</p>
          <p>{formatCurrency(totalCost)}</p>
        </div> */}
        <div className='flex flex-row bg-yellow-200 font-bold w-full rounded-full py-2 px-6'>
          {/* <TotalCost /> */}
          <img src={TotalCost} />
          <p className='text-sm px-2 self-center'>Total Cost</p>
          <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default CostPersonilPlanning