import React from 'react';
import { IoRibbonSharp, IoCubeOutline, IoBusinessOutline, IoTodayOutline, IoCloseOutline } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import FileUpload from '@src/assets/FileUpload.png'

const VendorDetails = ({ detail }) => {
    let headerTable = ["No", "Nama File", "Document Type", "Last Modified", "Modified By", "Status"];

    return (
        <div className='bg-white min-h-full w-[55%] flex flex-col'>
            <div className='items-center gap-5 flex flex-row p-5'>
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay items-center btn btn-xs">
                    <IoCloseOutline />
                </label>
                <div className='font-bold text-sm'>Vendor Details</div>
            </div>
            <hr className='border-t-2' />
            <div className='overflow-auto'>
                <div className='flex flex-row'>
                    <div className='flex min-w-1'></div>
                    <div className='flex flex-col p-3 w-screen'>
                        <div className="flex flex-row gap-2 mb-5">
                            <div className="flex rounded-[15px] bg-primary w-12 p-2">
                                <IoRibbonSharp className='size-full text-white' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div>{detail?.PROJECT_NO}</div>
                                <div className='font-bold'>{detail?.PROJECT_NAME}</div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 text-xs">
                            <div className="flex flex-row gap-1 items-center"><IoCubeOutline /> {detail?.PORTOFOLIO_UR}</div>
                            {/* <div className='divider divider-horizontal'></div> */}
                            <div className="flex flex-row gap-1 items-center"><IoTodayOutline /> {detail?.PROJECT_TYPE_UR}</div>
                            {/* <div className='divider divider-horizontal'></div> */}
                            <div className="flex flex-row gap-1 items-center"><IoBusinessOutline /> {detail?.CUSTOMER_NAME}</div>
                            <div className="badge badge-accent badge-outline">{detail?.UR_STATUS}</div>
                        </div>
                    </div>
                </div>
                <div className="m-4 flex flex-row rounded-[10px] bg-white border-2">
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">Contact Person</div>
                        <div className="text-xs font-bold">Dwi Rangga</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">Value</div>
                        <div className="text-xs font-bold">Rp 1.500.000.000</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">Address</div>
                        <div className="text-xs font-bold">Jl. Bintang No.12 Jakarta Pusat</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">NPWP</div>
                        <div className="text-xs font-bold">1234.5678.123</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">Current Termin</div>
                        <div className="text-xs font-bold">3</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex-col p-3">
                        <div className="text-gray-400 text-xs">Payment Type</div>
                        <div className="text-xs font-bold">B2B</div>
                    </div>
                </div>
                <div className='m-4 gap-4 flex flex-row'>
                    <div className='rounded-[15px] border-2 border-gray-200 justify-center px-2 py-1 font-bold'>List of Payment</div>
                    <div className='rounded-[15px] border-2 border-gray-200 justify-center px-2 py-1 font-bold'>Document</div>
                </div>
                <div className='flex flex-col m-4 gap-4'>
                    <div className='font-bold'>Upload Attachment</div>
                    <div className='gap-4 flex flex-row py-5 border-2 border-dashed border-gray-200 bg-sky-50 rounded-[10px] justify-center'>
                        <div>
                            <img src={FileUpload} width={'35px'} />
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className='text-xs font-bold'>Drag & Drop Your Files</div>
                            <div className='text-xs text-slate-400'>* Max Size: 100 Mb, Format: Pdf</div>
                        </div>
                        <div className='p-2 font-bold text-xs border-2 rounded-[20px] border-solid border-black cursor-pointer'>
                            + Upload Manually
                        </div>
                    </div>
                </div>
                <div className='m-4 rounded-[10px] border-2'>
                    <div className='flex flex-row items-center justify-between bg-white my-4 px-3'>
                        <div className='font-bold text-sm'>
                            List File
                        </div>
                        <div className='font-bold text-white'>
                            <input
                                type="text"
                                placeholder='Search...'
                                className='input input-sm input-bordered rounded-[25px] px-3 py-2 bg-white'
                            // onChange={handleSearch}
                            // value={keyword}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col p-4'>
                        <div className="overflow-x-auto w-full">
                            <table className="table table-xs">
                                <thead>
                                    <tr>
                                        {headerTable?.map((header, i) => {
                                            return (
                                                <th key={i} >
                                                    {header}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='py-3'>1</td>
                                        <td className='py-3'>Laporan Lapangan.pdf</td>
                                        <td className='py-3'>Blue Print</td>
                                        <td className='py-3'>12:13 PM, 24 Jan 2024</td>
                                        <td className='py-3'>Agung Suryajana</td>
                                        <td className='py-3'>
                                            <div className='badge badge-sm badge-success text-white'>Done</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>1</td>
                                        <td className='py-3'>Laporan Lapangan.pdf</td>
                                        <td className='py-3'>Blue Print</td>
                                        <td className='py-3'>12:13 PM, 24 Jan 2024</td>
                                        <td className='py-3'>Agung Suryajana</td>
                                        <td className='py-3'>
                                            <div className='badge badge-sm badge-success text-white'>Done</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3'>1</td>
                                        <td className='py-3'>Laporan Lapangan.pdf</td>
                                        <td className='py-3'>Blue Print</td>
                                        <td className='py-3'>12:13 PM, 24 Jan 2024</td>
                                        <td className='py-3'>Agung Suryajana</td>
                                        <td className='py-3'>
                                            <div className='badge badge-sm badge-success text-white'>Done</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-center items-center mt-2 mb-6 gap-4'>
                            <div className="pagination">
                                <ReactPaginate
                                    breakLabel={'...'}
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    // pageCount={totalPage}
                                    // onPageChange={changePage}
                                    pageClassName={'join-item btn btn-sm rounded-[50%] bg-white'}
                                    pageLinkClassName={''}
                                    previousClassName='btn btn-sm rounded-[50%] bg-white'
                                    nextClassName='btn btn-sm rounded-[50%] bg-white'
                                    breakClassName='btn btn-sm rounded-[50%] bg-white'
                                    activeClassName={'active-pagination'}
                                    className={'flex gap-1 items-center'}
                                    disabledClassName={'disabled'}
                                />
                            </div>
                            <div className="perpage flex items-center gap-2 text-xs">
                                {/* <select className="select select-bordered select-xs w-full max-w-[100px]" onChange={ChangePerPage}> */}
                                <select className="select select-bordered select-xs w-full max-w-[100px]">
                                    <option value="5">5/Page</option>
                                    <option value="10" selected>10/Page</option>
                                    <option value="25">25/Page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorDetails