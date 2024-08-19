import React from 'react'
import { IoRibbonSharp, IoArrowUp, IoTimerOutline, IoTimeOutline } from "react-icons/io5";
// import calendar from 'assets/calendar.png';
import murgi from '@src/assets/Murgi.png'
// import { formatCurrency } from 'global/helper/formatCurrency';
import ReactPaginate from 'react-paginate';
import VendorDetails from './Drawer/VendorDetails';


const VendorOverview = ({ detail }) => {
    let headerTable = ["No", "Vendor", "Status", "Value (Rp)", "Nearest Due Date (Rp)", "Type", "Total Termin", "Action"];

    return (
        <>
            <div className='flex flex-row justify-between text-sm overflow-auto mx-4 py-5'>
                <div className="card bg-green-600 min-w-80 h-auto" style={murgiCardStyle}>
                    <div className="p-5">
                        <div className='flex flex-row gap-5'>
                            <div className="radial-progress text-amber-400 font-bold" style={{ "--value": 70 }} role="progressbar">
                                <p className='text-white'>70%</p>
                            </div>
                            <div className='flex flex-col gap-2 my-3'>
                                <div className='font-bold text-white'>Vendor Payment Progress View</div>
                                <div className="badge bg-amber-400 gap-1 text-xs">
                                    <IoArrowUp />
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-5 text-sm m-4'>
                <div className='flex flex-col w-[40%] gap-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Total Paid Deal</div>
                        </div>
                        <div className='font-bold'>Rp 800.000.000</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Total Vendor</div>
                        </div>
                        <div className='font-bold'>5 Companies</div>
                    </div>
                </div>
                <div className='flex flex-col w-[60%] gap-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Total Expected Payment</div>
                        </div>
                        <div className='font-bold'>Rp 1.500.000.000 (1.5M)</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Vendor Percentage</div>
                        </div>
                        <div className='font-bold'>53.3%</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between bg-primary mt-5 p-4'>
                <div className='font-bold text-white'>
                    List Vendor
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
                    <table className="table table-xs" >
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
                                <td>1</td>
                                <td>PT Pelindo Indonesi</td>
                                <td>
                                    <div className='badge badge-sm badge-success text-white'>Done</div>
                                </td>
                                <td>Rp 500.000.000</td>
                                <td>24 Aug 2024</td>
                                <td>CBD</td>
                                <td>4</td>
                                <td className='w-28'>
                                    <div className="drawer drawer-end">
                                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content">
                                            {/* Page content here */}
                                            <label htmlFor="my-drawer-4" className="drawer-button btn-xs btn btn-primary">View Details</label>
                                        </div>
                                        <div className="drawer-side z-50">
                                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">X</label>
                                            <VendorDetails detail={detail} />
                                        </div>
                                    </div>
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
        </>
    )
}

const murgiCardStyle = {
    backgroundImage: `url(${murgi})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',
};

export default VendorOverview