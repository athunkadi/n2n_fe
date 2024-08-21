import React from 'react'
import { IoDocumentsOutline, IoReaderOutline, IoClipboardOutline } from 'react-icons/io5'
import { formatCurrency } from '@global/helper/formatCurrency';
import format from 'date-fns/format';

const BillingCollectionPlan = ({ data, tableDataModal }) => {
    const headerTableKontrak = ["No/Nama Kontrak", "Nilai Kontrak Addendum", "Attachment Kontrak"];
    const headerTableBilling = ["Termin", "Divisi", "Portofolio", "Nominal Estimasi Billing", "Rencana Periode Billing"];
    const headerTableDokumen = ["Termin", "Jenis Dokumen", "No Dokumen", "Tanggal Dokumen", "Attachment Dokumen"];

    return (
        <>
            <div className='grid grid-cols-3 gap-y-3 mb-4 text-sm'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoClipboardOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Termin</div>
                        <div className='text-gray'>{tableDataModal?.DOKUMEN_BILLING?.length + ' Termin'}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 mb-5 text-sm'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoReaderOutline />
                        </div>
                    </div>
                    <div>Kontrak Addendum</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableKontrak?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_KONTRAK?.length > 0 ? tableDataModal?.DOKUMEN_KONTRAK?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NO_DOKUMEN || '-'}</td>
                                            <td>{formatCurrency(v.VALUE_DOK, 0) || '-'}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={"upload_dokumen"}
                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                    value={"Open Dokumen Kontrak"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableKontrak?.length}>
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
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 text-sm mb-5'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoClipboardOutline />
                        </div>
                    </div>
                    <div>Billing Collection Plan</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableBilling?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_BILLING?.length > 0 ? tableDataModal?.DOKUMEN_BILLING?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.TERMIN || '-'}</td>
                                            <td>{v.DIVISI_ID || '-'}</td>
                                            <td>{v.PORTFOLIO_ID || '-'}</td>
                                            <td>{formatCurrency(v.EST_BILLING, 0) || '-'}</td>
                                            <td>{format(new Date(v.EST_BULAN_BILLING), 'MMMM') + ' ' + v.EST_PERIODE_BILLING}</td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableBilling?.length}>
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
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 text-sm'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoDocumentsOutline />
                        </div>
                    </div>
                    <div>Dokumen Delivery</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableDokumen?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_BILLING?.length > 0 ? tableDataModal?.DOKUMEN_BILLING?.map((a, j) => {
                                return (
                                    <>
                                        {a?.DOKUMEN?.map((v, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{a.TERMIN || '-'}</td>
                                                        <td>{v.UR_JNS || '-'}</td>
                                                        <td>{v.NO_DOKUMEN || '-'}</td>
                                                        <td>{v.TGL_DOKUMEN !== null ? format(new Date(v.TGL_DOKUMEN.substring(0, 10)), 'dd/MM/yyyy') : '-'}</td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name={"upload_dokumen"}
                                                                className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                                value={"Open Dokumen"}
                                                                onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableDokumen?.length}>
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

export default BillingCollectionPlan