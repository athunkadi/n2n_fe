import React from 'react'
import { IoRibbonSharp, IoArrowUp, IoTimerOutline, IoTimeOutline, IoPersonCircleOutline } from "react-icons/io5";
import calendar from '@src/assets/calendar.png';
import graph from '@src/assets/graph.png';
import murgiLeft from '@src/assets/Murgi-left.png'
import murgiRight from '@src/assets/Murgi-right.png'
import murgi from '@src/assets/Murgi.png'
import { formatCurrency } from '@src/global/helper/formatCurrency';

const GeneralInfo = ({ detail }) => {
    return (
        <>
            <div className='flex flex-row gap-5 mx-4 text-sm py-5 overflow-auto'>
                <div className="card bg-violet-700 min-w-64 h-auto" style={murgiCardStyle}>
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
                <div className="card bg-blue-500 min-w-64 h-auto" style={murgiCardStyle}>
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
                <div className="card bg-green-600 min-w-64 h-auto" style={murgiCardStyle}>
                    <div className="p-5">
                        <div className='flex flex-row gap-5'>
                            <div className="radial-progress text-amber-400 font-bold" style={{ "--value": 70 }} role="progressbar">
                                <p className='text-white'>70%</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-bold text-white'><br />Margin<br /></div>
                                <div className="badge bg-amber-400 gap-1 text-xs">
                                    <IoArrowUp />
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between p-4 text-sm'>
                <div className='flex flex-col w-[24%] gap-2'>
                    <div className='font-bold'>
                        Cost of Goods
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Delivery PIP</div>
                        <div className='justify-end'>
                            100Mil Rp
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Delivery PIP</div>
                        <div className='justify-end'>
                            100Mil Rp
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Delivery PIP</div>
                        <div className='justify-end'>
                            100Mil Rp
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[40%] gap-2'>
                    <div className='font-bold'>
                        Gross Profit Margin After Negotiation
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Profit Margin</div>
                        <div>
                            300 Mil Rp
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>% Profit Margin</div>
                        <div>
                            40 %
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Project Incentive</div>
                        <div className='justify-end'>
                            100 Mil Rp
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[29%] gap-2'>
                    <div className='font-bold'>
                        Total Revenue
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Profit Margin</div>
                        <div>
                            300 Mil Rp
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>% Profit Margin</div>
                        <div>
                            40 %
                        </div>
                    </div>
                    <div className='flex justify-between flex-row font-light'>
                        <div>Project Incentive</div>
                        <div className='justify-end'>
                            100 Mil Rp
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
                <div className='flex flex-col w-1/2 gap-5'>
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
                            <div>Department In Charge</div>
                        </div>
                        <div className='font-bold'>PIP</div>
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
                <div className='flex flex-col w-1/2 gap-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Value</div>
                        </div>
                        <div className='font-bold'>Rp 1.500.000.000 (1.5M)</div>
                    </div>
                    <hr className='border-t-2' />
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row gap-2'>
                            <div className='card bg-violet-700 p-1'>
                                <IoRibbonSharp className='text-white' />
                            </div>
                            <div>Priority</div>
                        </div>
                        <div className='font-bold'>Moderate</div>
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
            <div className='flex rounded-[15px] bg-slate-200 bg-white border-2 m-4'>
                <div className='flex flex-row gap-5'>
                    <div className='flex items-center' style={murgiLeftStyle}>
                        <div className='w-20 text-primary text-sm font-bold p-5'>
                            People
                        </div>
                    </div>
                    <div className='flex items-center py-5' style={murgiRightStyle}>
                        <div className='justify-between flex flex-row gap-2 text-xs'>
                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold'>Assign To</div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <IoPersonCircleOutline className='size-8' />
                                    <div className='font-bold'>Kurniawan Cahyo</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold'>Project Manager</div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <IoPersonCircleOutline className='size-8' />
                                    <div className='font-bold'>Agung Budi</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold'>Solution Team</div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <IoPersonCircleOutline className='size-8' />
                                    <div className='font-bold'>Stefano Pambudi</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold'>Last Update By</div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <IoPersonCircleOutline className='size-8' />
                                    <div className='font-bold'>Stefano Pambudi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between gap-5 m-4'>
                <div className='flex flex-col w-1/2'>
                    <div className='card bg-blue-950 p-5'>
                        <div className='w-full flex flex-row justify-between mb-8'>
                            <div className='bg-blue-900 rounded-[10px] p-2 h-10 text-sm w-26 text-white font-bold'>Nearest TOP</div>
                            {/* <Graph className='size-10'/> */}
                            <img src={graph} className='pl-5 items-end' alt="" />
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col w-1/2 items-center'>
                                <div className='text-white text-sm text-slate-400'>Nominal Value</div>
                                <div className='text-white font-bold text-sm'>{formatCurrency(detail?.NILAI_KONTRAK)}</div>
                            </div>
                            <div className='flex flex-col w-1/2 items-center'>
                                <div className='text-white text-xs text-slate-400'>Expected Income</div>
                                <div className='text-white font-bold text-xs'>{formatCurrency(detail?.NILAI_PENAWARAN)}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-5 text-sm my-5'>
                        <div className='flex flex-row justify-between'>
                            <div className='font-semibold text-slate-400'>Penalty</div>
                            <div className='font-bold'>Rp. 4.150.000</div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='font-semibold text-slate-400'>Due Date</div>
                            <div className='font-bold'>24 Aug 2023</div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='font-semibold text-slate-400'>Status</div>
                            <div className='font-bold'>Overdue</div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='font-semibold text-slate-400'>Required Docs</div>
                            <div className='font-bold'>To Payment Page</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-1/2 border-2 rounded-[15px] p-5 gap-5'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='font-bold text-sm'>Project Log</div>
                        <div className='text-primary text-xs'>View More Project Log</div>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder='Search...'
                            className='input input-sm w-full input-bordered rounded-[25px] px-3 py-2 bg-transparent'
                        // onChange={handleSearch}
                        // value={keyword}
                        />
                    </div>
                    <div>
                        <ul className="steps steps-vertical overflow-y-auto h-60 gap-3">
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                            <li data-content="" className="step">
                                <div className='flex flex-col gap-1 text-start'>
                                    <div className='text-sm'><strong>Alvin Timothius</strong> | Last Modified 12:11 AM, 24 Jan 2023</div>
                                    <div className='text-xs text-gray-500'>Dokumen BAMK - Pekejaan INSW</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

const murgiRightStyle = {
    backgroundImage: `url(${murgiRight})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom'
};
const murgiLeftStyle = {
    backgroundImage: `url(${murgiLeft})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
};
const murgiCardStyle = {
    backgroundImage: `url(${murgi})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',
};

export default GeneralInfo