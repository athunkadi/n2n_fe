import React from 'react'
import { IoReceiptOutline, IoReaderOutline, IoDocumentsOutline, IoBusinessOutline, IoCubeOutline, IoClipboardOutline, IoNewspaperOutline, IoPricetagsOutline } from 'react-icons/io5'
import { formatCurrency } from '@global/helper/formatCurrency';
import BgModal from '@assets/BgModal.svg';

const VendorProjectBilling = ({ data, tableDataModal }) => {
    const headerTableInvoice = ["No/Nama Invoice", "Nominal Invoice", "Attachment Invoice"];
    const headerTableDokPenagihan = ["No/Nama Dokumen", "Tanggal Penagihan", "Attachment Dokumen Penagihan"];

    return (
        <>
            <div className='flex flex-row p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
                <div className='border-l-2'></div>
                <div className='flex flex-col gap-3'>
                    <div className='font-bold'>
                        {data?.PROJECT_NAME}
                    </div>
                    <div className="flex flex-wrap gap-5 text-sm items-center">
                        <div>{data?.PROJECT_NO}</div>
                        <div>|</div>
                        <div>{data?.PORTOFOLIO_UR}</div>
                        <div>|</div>
                        <div>{data?.PROJECT_TYPE_UR}</div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-y-3 mb-4'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoBusinessOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nama Vendor</div>
                        <div className='text-gray'>{data?.NAMA_VENDOR}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoCubeOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>No TTB</div>
                        <div className='text-gray'>{data?.NO_TTB || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoNewspaperOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nomor Kontrak</div>
                        <div className='text-gray'>{data?.NO_KONTRAK || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nilai Kontrak</div>
                        <div className='text-gray'>{formatCurrency(data?.NILAI_KONTRAK, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPricetagsOutline />
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
                            <IoClipboardOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Termin</div>
                        <div className='text-gray'>{data?.TERMIN}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 mb-5'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoReaderOutline />
                        </div>
                    </div>
                    <div>Invoice</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableInvoice?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_INVOICE?.length > 0 ? tableDataModal?.DOKUMEN_INVOICE?.map((v, i) => {
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
                                                    value={"Open Dokumen Pendukung"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableInvoice?.length}>
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
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoDocumentsOutline />
                        </div>
                    </div>
                    <div>Dokumen Penagihan</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableDokPenagihan?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_PENAGIHAN?.length > 0 ? tableDataModal?.DOKUMEN_PENAGIHAN?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NO_DOKUMEN || '-'}</td>
                                            <td>{v.TGL_DOKUMEN || '-'}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={"upload_dokumen"}
                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                    value={"Open Dokumen Pendukung"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableDokPenagihan?.length}>
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

export default VendorProjectBilling