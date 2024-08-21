import React from 'react'
import { IoDocumentsOutline } from 'react-icons/io5'

const DokumenPendukung = ({ data, tableDataModal }) => {
    const headerTableBAMK = ["No BAMK", "Tanggal BAMK", "Attachment BAMK"];
    const headerTableDokPendukung = ["Nomor Dokumen", "Klasifikasi Dokumen", "Attachment Dokumen Pendukung"];

    return (
        <>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4'>
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
                                                    value={"Open Dokumen Pendukung"}
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
            </div>
        </>
    )
}

export default DokumenPendukung