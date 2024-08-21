import React, { useState } from 'react'
import { IoList } from 'react-icons/io5'
import { formatCurrency } from '@global/helper/formatCurrency';
import storeSchema from '@global/store';

const VendorBilling = ({ data, tableDataModal }) => {
    const [dataDetail, setDataDetail] = useState();
    const getDetailVendor = async (id) => {
        try {
            const res = await storeSchema.actions.getDetailVendorRealization(id);
            if (res?.status) {
                setDataDetail(res?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const headerTableVendorPlanning = ["Nama Calon Vendor", "Judul Pengerjaan", "Nominal Estimasi Vendor"];
    const headerTableListVendor = ["Nama Vendor", "No Kontrak", "Nominal Kontrak Vendor", "Status Billing"];
    const headerTableKontrak = ["No Kontrak", "Nilai Kontrak Addendum", "Attachment Kontrak"];
    const headerTableDokPendukung = ["Nomor Dokumen", "Klasifikasi Dokumen", "Attachment Dokumen Pendukung"];
    const headerTableBilling = ["Termin", "Nominal Billing", "Periode Billing", "Status Billing"];
    const headerTableDokDelivery = ["Jenis Dokumen", "No Dokumen", "Tanggal", "Attachment Dokumen"];

    return (
        <>
            {/* <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-y-3 mb-4 text-sm'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoBusinessOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nama Vendor</div>
                        <div className='text-gray'>{tableDataModal?.VENDOR_FINAL[0]?.NAMA_VENDOR || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoNewspaperOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>No Kontrak Vendor</div>
                        <div className='text-gray'>{tableDataModal?.VENDOR_FINAL[0]?.NO_KONTRAK || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nominal Kontrak Vendor</div>
                        <div className='text-gray'>{formatCurrency(tableDataModal?.VENDOR_FINAL[0]?.NILAI_KONTRAK, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPersonOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Status Billing</div>
                        <div className='text-gray'>{data?.UR_STATUS || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPricetagsOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Termin</div>
                        <div className='text-gray'>{data?.CATEGORY_UR || '-'}</div>
                    </div>
                </div>
            </div> */}
            {/* <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 text-sm mb-5'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoDocumentsOutline />
                        </div>
                    </div>
                    <div>Dokumen Pendukung</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableDokPendukung?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_PENDUKUNG?.length > 0 ? tableDataModal?.DOKUMEN_PENDUKUNG?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NO_DOKUMEN || '-'}</td>
                                            <td>{v.URAIAN_JENIS || '-'}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={"upload_dokumen"}
                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                    value={"Open Dokumen BAMK"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableDokPendukung?.length}>
                                        <div className='flex justify-center items-center'>
                                            No Data to Display
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div> */}
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 text-sm mb-5'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoList />
                        </div>
                    </div>
                    <div>Vendor Planning</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableVendorPlanning?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.VENDOR_FINAL?.length > 0 ? tableDataModal?.VENDOR_FINAL?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NAMA_VENDOR || '-'}</td>
                                            <td>{v.JUDUL_KONTRAK || '-'}</td>
                                            <td>{formatCurrency(v.NILAI_KONTRAK,0) || '-'}</td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableVendorPlanning?.length}>
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
                            <IoList />
                        </div>
                    </div>
                    <div>List Vendor</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableListVendor?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.VENDOR_PLANNING?.length > 0 ? tableDataModal?.VENDOR_PLANNING?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NAMA_VENDOR || '-'}</td>
                                            <td>{v.NO_KONTRAK || '-'}</td>
                                            <td>{formatCurrency(v.NILAI_KONTRAK, 0) || '-'}</td>
                                            <td>{v.STATUS_BILLING || '-'}</td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableListVendor?.length}>
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
            {/* <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 mb-5 text-sm'>
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
                                {headerTableDokDelivery?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_PENDUKUNG?.length > 0 ? tableDataModal?.DOKUMEN_PENDUKUNG?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.URAIAN_JENIS || '-'}</td>
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
                            }) : (
                                <tr>
                                    <td colSpan={headerTableDokDelivery?.length}>
                                        <div className='flex justify-center items-center'>
                                            No Data to Display
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </>
    )
}

export default VendorBilling