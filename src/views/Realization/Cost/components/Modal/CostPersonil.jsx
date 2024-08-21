import React, { useState } from 'react'
import TotalCost from '@assets/icons/RdTotalCost.svg'
import storeSchema from '@global/store'
import { IoReceiptOutline, IoPeopleOutline } from 'react-icons/io5'
import { formatCurrency } from '@global/helper/formatCurrency';
import { IoIosArrowDown } from 'react-icons/io'
import BgModal from '@assets/BgModal.svg';

const CostPersonil = ({ data, tableDataModal }) => {
    const headerTableModalPersonil = ["Role", "Kualifikasi", "Qty", "UoM", "Qty", "UoM", "Unit Cost", "Cost", ""];
    const headerExpandTable = ['Nama Employee', 'Divisi', 'Manday'];
    const [expandTable, setExpandTable] = useState({ project_id: null, isExpand: false });
    const [dataFieldsExpand, setDataFieldsExpand] = useState([]);

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
                    satuan: value?.SATUAN,
                    satuan_date: value?.SATUAN_DATE,
                    flag_personil: value?.FLAG_PERSONIL,
                }
            })
            setDataFieldsExpand(newData)
        } else {
            setDataFieldsExpand([])
        }
    }

    const handleExpand = async (e, value) => {
        e.preventDefault();
        // let id = tabActive === 'cost_personil' ? value?.PERSONEL_ID : tabActive === 'cost_operational' ? value?.COST_ID : value?.BILLING_ID;
        let id = value?.PERSONEL_ID;
        setExpandTable(prev => {
            if (prev.project_id === id) {
                return {
                    project_id: id,
                    isExpand: !prev?.isExpand,
                };
            } else {
                return {
                    project_id: id,
                    isExpand: true,
                }
            }
        })
        // if (tabActive === 'cost_personil') {
            getCostPersonilDetail(id)
        // } else if (tabActive === 'cost_operational') {
        //     getCostOperationalDetail(id)
        // } else {

        // }
    }

    return (
        <>
            <div className='flex flex-wrap p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
                <div className='border-l-2'></div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold'>
                        {data?.PROJECT_NAME}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm items-center">
                        <div>{data?.PROJECT_NO}</div>
                        <div>|</div>
                        <div>{data?.PORTOFOLIO_UR}</div>
                        <div>|</div>
                        <div>{data?.PROJECT_TYPE_UR}</div>
                    </div>
                </div>
                <div className='rounded-md min-[1000px]:w-40 min-[320px]:w-96 bg-gray-600 p-2 gap-0'>
                    <div className='flex flex-row gap-2 text-md font-bold'>
                        <img src={TotalCost} />
                        <div className='w-full min-[320px]:text-right'>{formatCurrency(data?.TOTAL_COST, 0)}</div>
                    </div>
                    <div className='flex text-sm justify-end'>Total Cost Personil</div>
                </div>
            </div>
            <div className='flex flex-row gap-5 mb-4'>
                <div>
                    <div className='p-1 rounded bg-gray-100'>
                        <IoReceiptOutline className='rotate-180' />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>Nilai Kontrak</div>
                    <div className='text-gray'>{formatCurrency(data?.NILAI_KONTRAK, 0)}</div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4'>
                <div className='flex flex-row font-bold gap-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoPeopleOutline />
                        </div>
                    </div>
                    <div>Role</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableModalPersonil?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.length > 0 ? tableDataModal?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.POSITION || '-'}</td>
                                            <td>{v.KUALIFIKASI || '-'}</td>
                                            <td>{v.QTY_PERSON || '-'}</td>
                                            <td>{v.UR_SATUAN_PERSON || '-'}</td>
                                            <td>{v.QTY_DATE || '-'}</td>
                                            <td>{v.UR_SATUAN_DATE || '-'}</td>
                                            <td>{formatCurrency(v.COST_UNIT, 0) || '-'}</td>
                                            <td>{formatCurrency(v.COST_TOTAL, 0) || '-'}</td>
                                            <td>
                                                <span className={`border-2 rounded-[50%] bg-primary p-1 arrow ${(expandTable.project_id === v.PERSONEL_ID && expandTable.isExpand === true) ? 'rotate' : ''}`} onClick={(e) => handleExpand(e, v)}>
                                                    <IoIosArrowDown className='text-white text-lg' />
                                                </span>
                                            </td>
                                        </tr>
                                        {
                                            (expandTable.project_id === v.PERSONEL_ID && expandTable.isExpand === true) && (
                                                <tr className='bg-sky-50'>
                                                    <td colSpan={10} className='pb-5'>
                                                        <table className='table table-xs'>
                                                            <thead>
                                                                <tr>
                                                                    {headerExpandTable?.map((header, i) => {
                                                                        return (
                                                                            <th key={i} className='text-sm'>
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
                                                                                {vExpand?.nama_personil}
                                                                            </td>
                                                                            <td>
                                                                                {vExpand?.divisi_id}
                                                                            </td>
                                                                            <td>
                                                                                {vExpand?.qty_date + ' ' + vExpand?.satuan}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableModalPersonil?.length}>
                                        <div className='flex justify-center items-center'>
                                            No Data to Display
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const modalStyle = {
    backgroundImage: `url(${BgModal})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};

export default CostPersonil