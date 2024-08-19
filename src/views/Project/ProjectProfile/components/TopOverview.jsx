import React from 'react'
import { IoRibbonSharp, IoArrowUp, IoTimerOutline, IoTimeOutline } from "react-icons/io5";
import calendar from '@src/assets/calendar.png';
import murgi from '@src/assets/Murgi.png'
// import { formatCurrency } from 'global/helper/formatCurrency';
import ReactPaginate from 'react-paginate';
import TopDetails from './Drawer/TopDetails';


const TopOverview = ({ detail }) => {
    let headerTable = ["No", "Due Date", "Status", "Value (Rp)", "Penalty (Rp)", "Net Value (Rp)", "Action"];

    return (
        <>
            <div className='flex flex-row justify-between text-sm overflow-auto mx-4 py-5'>
                <div className="card bg-violet-700 min-w-72 h-auto" style={murgiCardStyle}>
                    <div className="p-5">
                        <div className='flex flex-row gap-5'>
                            <div className="radial-progress text-amber-400 font-bold" style={{ "--value": 70 }} role="progressbar">
                                <p className='text-white'>70%</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-bold text-white'>Revenue<br />Profit Margin</div>
                                <div className="badge bg-amber-400 gap-1 text-xs">
                                    <IoArrowUp />
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-blue-500 min-w-72 h-auto" style={murgiCardStyle}>
                    <div className="p-5">
                        <div className='flex flex-row gap-5'>
                            <div className="radial-progress text-amber-400 font-bold" style={{ "--value": 70 }} role="progressbar">
                                <p className='text-white'>70%</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-bold text-white'>Cost Percentage<br />Distribution</div>
                                <div className="badge bg-amber-400 gap-1 text-xs">
                                    <IoArrowUp />
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-slate-200 border-2 m-4'>
                <div className='flex flex-row gap-5'>
                    <div className='w-40 items-end'>
                        <img src={calendar} className='pl-5 items-end' alt="" />
                    </div>
                    <div className='w-full p-3 text-xs'>
                        <div className='flex flex-row justify-between px-10'>
                            <div className='flex flex-row gap-2 items-center'>
                                <div className='rounded-circle'>
                                    <IoTimerOutline className='size-8' />
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        Start Contract
                                    </div>
                                    <div className='font-bold'>
                                        {new Date(detail?.CONTRACT_START).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                                <div className='rounded-circle'>
                                    <IoTimeOutline className='size-8' />
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        End Contract
                                    </div>
                                    <div className='font-bold'>
                                        {new Date(detail?.CONTRACT_END).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex flex-row gap-2 items-center'>
                                <div className='rounded-circle'>
                                    <IoStopwatchOutline className='size-8' />
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        Target Date
                                    </div>
                                    <div className='font-bold'>
                                        31 Cotober 2024
                                    </div>
                                </div>
                            </div> */}
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
                            <div>Contact Person</div>
                        </div>
                        <div className='font-bold'>Dwi Rangga</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Total Termin</div>
                        </div>
                        <div className='font-bold'>5 Termin</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Status</div>
                        </div>
                        <div className='font-bold'>On Progress</div>
                    </div>
                </div>
                <div className='flex flex-col w-[60%] gap-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Total Expected Value</div>
                        </div>
                        <div className='font-bold'>Rp 1.500.000.000 (1.5M)</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Current Termin</div>
                        </div>
                        <div className='font-bold'>3</div>
                    </div>
                    <hr className='border-t-2' />
                </div>
            </div>
            <div className='flex flex-row items-center justify-between bg-primary mt-5 p-4'>
                <div className='font-bold text-white'>
                    List TOP
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
                                <td>02/08/2024</td>
                                <td>
                                    <div className='badge badge-sm badge-success text-white'>Done</div>
                                </td>
                                <td>Rp 500.000.000</td>
                                <td>Rp 500.000.000</td>
                                <td>Rp 500.000.000</td>
                                <td className='w-28'>
                                    <div className="drawer drawer-end">
                                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content">
                                            {/* Page content here */}
                                            <label htmlFor="my-drawer-4" className="drawer-button btn-xs btn btn-primary">View Details</label>
                                        </div>
                                        <div className="drawer-side z-50">
                                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">X</label>
                                            <TopDetails detail={detail}/>
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

export default TopOverview