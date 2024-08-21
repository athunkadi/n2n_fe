import React, { useState } from 'react'
import TotalCost from '@assets/icons/RdTotalCost.svg'
import storeSchema from '@global/store'
import { IoReceiptOutline } from 'react-icons/io5'
import { formatCurrency } from '@global/helper/formatCurrency';
import { IoIosArrowDown } from 'react-icons/io'
import BgModal from '@assets/BgModal.svg';

const CostOperational = ({ data, tableDataModal }) => {
    const headerTableModalOperational = ["Kategori Pengajuan", "Mata Anggaran", "Divisi", "Jenis Pengajuan", "No PR", "No Nodin", "Nominal Pengajuan"];
    const headerExpandTableOperational = ['Jenis Dokumen', 'No Dokumen', 'Tanggal Pengajuan', 'Attachment Dokumen Penagihan'];
    const [expandTable, setExpandTable] = useState({ project_id: null, isExpand: false });
    const [dataFieldsExpand, setDataFieldsExpand] = useState([]);

    const getCostOperationalDetail = async (id) => {
        const res = await storeSchema.actions.getDetailCostOperationalWithDokumen(id);
        if (res?.status === true) {
            const newData = res?.data?.DOKUMEN?.map((value) => {
                return {
                    dokumen_id: value?.DOKUMEN_ID,
                    tipe_dokumen: value?.TIPE_DOKUMEN,
                    jns_dokumen: value?.JNS_DOKUMEN,
                    uraian_jenis: value?.URAIAN_JENIS,
                    no_dokumen: value?.NO_DOKUMEN,
                    tgl_dokumen: value?.TGL_DOKUMEN,
                    url_dokumen: value?.URL_DOKUMEN,
                    notes: value?.NOTES,
                    value_dok: value?.VALUE_DOK
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
        let id = value?.COST_ID;
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
        getCostOperationalDetail(id)
        // } else if (tabActive === 'cost_operational') {
        //     getCostOperationalDetail(id)
        // } else {

        // }
    }

    return (
        <>
            <div className='flex flex-row p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
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
            </div>
            <div className='flex flex-wrap gap-36'>
                <div className='flex flex-row gap-5 mb-4'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <img src={TotalCost} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='font-bold'>Total Tagihan</div>
                        <div className='text-gray'>{formatCurrency(data?.TOTAL_COST, 0)}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4'>
                <div className='flex flex-row font-bold gap-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div>Pengajuan</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableModalOperational?.map((header, i) => {
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
                                            <td>{v.KATEGORI_COST || '-'}</td>
                                            <td>{v.MATA_ANGGARAN || '-'}</td>
                                            <td>{v.DIVISI || '-'}</td>
                                            <td>{v.JENIS_COST || '-'}</td>
                                            <td>{v.NO_PR || '-'}</td>
                                            <td>{v.NO_NODIN || '-'}</td>
                                            <td>{formatCurrency(v.NILAI_COST, 0) || '-'}</td>
                                            <td>
                                                <span className={`border-2 rounded-[50%] bg-primary p-1 arrow ${(expandTable.project_id === v.COST_ID && expandTable.isExpand === true) ? 'rotate' : ''}`} onClick={(e) => handleExpand(e, v)}>
                                                    <IoIosArrowDown className='text-white text-lg' />
                                                </span>
                                            </td>
                                        </tr>
                                        {
                                            (expandTable.project_id === v.COST_ID && expandTable.isExpand === true) && (
                                                <tr className='bg-sky-50'>
                                                    <td colSpan={10} className='pb-5'>
                                                        <table className='table table-xs'>
                                                            <thead>
                                                                <tr>
                                                                    {headerExpandTableOperational?.map((header, i) => {
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
                                                                                {vExpand?.uraian_jenis}
                                                                            </td>
                                                                            <td>
                                                                                {vExpand?.no_dokumen}
                                                                            </td>
                                                                            <td>
                                                                                {vExpand?.tgl_dokumen}
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name={"upload_dokumen"}
                                                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                                                    value={"Open Dokumen Pendukung"}
                                                                                    onClick={() => window.open(vExpand?.url_dokumen, "_blank")}
                                                                                />
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
                                    <td colSpan={headerTableModalOperational?.length}>
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

export default CostOperational