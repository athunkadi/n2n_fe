import React from 'react'
// import { IoRibbonSharp, IoArrowUp, IoTimerOutline, IoTimeOutline, IoPersonCircleOutline } from "react-icons/io5";
// import calendar from 'assets/calendar.png';
// import graph from 'assets/graph.png';
import murgiLeft from '@src/assets/Murgi-left.png'
import murgiRight from '@src/assets/Murgi-right.png'
import murgi from '@src/assets/Murgi.png'
import { formatCurrency } from '@src/global/helper/formatCurrency';
import BudgetDetails from './Drawer/BudgetDetails';

const BudgetOverview = ({ detail }) => {
    return (
        <div className='m-4 flex flex-col gap-5'>
            <div className="card border-2 collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="flex flex-row collapse-title text-md font-medium justify-between items-center">
                    <div>
                        Summary Delivery PIP
                    </div>
                </div>
                <div className="collapse-content">
                    <hr className='border-t-2 w-full mb-4' />
                    <div className='flex w-full'>
                        <div className="justify-items-end drawer drawer-end">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-4" className="drawer-button btn-xs btn btn-primary">View Details</label>
                            </div>
                            <div className="drawer-side z-50">
                                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">X</label>
                                <BudgetDetails detail={detail} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-col w-1/2'>
                            <div className='flex flex-row justify-between my-3 items-center'>
                                <div className='text-sm font-bold'>
                                    Remaining Budget Overall
                                </div>
                                <div className='rounded-[10px] text-white font-bold bg-orange-400 px-2 py-1 text-xs'>
                                    Rp 700.000.000
                                </div>
                            </div>
                            <div className='card border-2'>
                                <div className='text-sm font-bold rounded-t-[15px] p-2 bg-slate-100'>Total Budget Overall</div>
                                <div className='p-3 text-sm'>
                                    <ul className='flex flex-col gap-2' style={{ listStyle: 'circle' }}>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Non-Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className='text-sm font-bold rounded-t-[15px] p-2 bg-slate-100'>User Budget</div>
                                <div className='p-3 text-sm'>
                                    <ul className='flex flex-col gap-2' style={{ listStyle: 'circle' }}>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Non-Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className='text-sm font-bold rounded-t-[15px] p-2 bg-slate-100'>User Budget Percentage</div>
                                <div className='p-3 text-sm'>
                                    <ul className='flex flex-col gap-2' style={{ listStyle: 'circle' }}>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                        <li className='flex flex-row justify-between'>
                                            <div className='text-slate-400'>
                                                Non-Reporting
                                            </div>
                                            <div className='font-bold text-xs'>
                                                Rp 700.000.000
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <div className='flex flex-row mt-3 items-center'>
                                <div className='text-sm font-bold'>
                                    Budget Utilization Analysis
                                </div>
                            </div>
                            <hr className='border-t-2 my-2' />
                            <table className='text-xs'>
                                <thead>
                                    <th align='left' className='py-2'>Classification</th>
                                    <th align='left'>Value</th>
                                    <th align='left'>Percentage</th>
                                </thead>
                                <tbody className='gap-5'>
                                    <tr className='items-center'>
                                        <td className='text-slate-400 py-2'>Daily Consumption</td>
                                        <td className='font-bold'>
                                            {formatCurrency(100000000, 0)}
                                        </td>
                                        <td className='font-bold'>25%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>Transportation</td>
                                        <td className='font-bold'>
                                            {formatCurrency(100000000, 0)}
                                        </td>
                                        <td className='font-bold'>25%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>Accomodation</td>
                                        <td className='font-bold'>-</td>
                                        <td className='font-bold'>0%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>Reporting</td>
                                        <td className='font-bold'>
                                            {formatCurrency(100000000, 0)}
                                        </td>
                                        <td className='font-bold'>8%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>Administration</td>
                                        <td className='font-bold'>-</td>
                                        <td className='font-bold'>0%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>SPPD</td>
                                        <td className='font-bold'>
                                            {formatCurrency(100000000, 0)}
                                        </td>
                                        <td className='font-bold'>20%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-slate-400 py-2'>Miscelanous</td>
                                        <td className='font-bold'>-</td>
                                        <td className='font-bold'>0%</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className='py-4'>
                                            <hr className='border-t-2' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-bold text-primary'>Total</td>
                                        <td className='font-bold text-primary'>{formatCurrency(400000000, 0)}</td>
                                        <td className='font-bold text-primary'>57%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border-2 collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" />
                <div className="flex flex-row collapse-title text-md font-medium justify-between items-center">
                    <div>
                        Summary Delivery PLY
                    </div>
                </div>
                <div className="collapse-content">
                    <hr className='border-t-2 w-full mb-4' />
                    <div className='flex w-full'>
                        <div className="justify-items-end drawer drawer-end">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-4" className="drawer-button btn-xs btn btn-primary">View Details</label>
                            </div>
                            <div className="drawer-side z-50">
                                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">X</label>
                                <BudgetDetails detail={detail} />
                            </div>
                        </div>
                    </div>
                    <p>hello</p>
                </div>
            </div>
            <div className="card border-2 collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" />
                <div className="flex flex-row collapse-title text-md font-medium justify-between items-center">
                    <div>
                        At Cost
                    </div>
                </div>
                <div className="collapse-content">
                    <hr className='border-t-2 w-full mb-4' />
                    <div className='flex w-full'>
                        <div className="justify-items-end drawer drawer-end">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-4" className="drawer-button btn-xs btn btn-primary">View Details</label>
                            </div>
                            <div className="drawer-side z-50">
                                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">X</label>
                                <BudgetDetails detail={detail} />
                            </div>
                        </div>
                    </div>
                    <p>hello</p>
                </div>
            </div>
        </div>
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

export default BudgetOverview