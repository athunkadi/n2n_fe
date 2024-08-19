import React from 'react'
import { IoCubeOutline, IoBusinessOutline, IoTodayOutline, IoRibbonSharp } from "react-icons/io5";

const Project = ({ data, handleClick, projectId }) => {
    return (
        <>
            <div className="h-[1300px] overflow-x-auto">
                {data && data.length !== 0 && data.map((item, index) => (
                    <>
                        <div className='cursor-pointer' onClick={(e) => handleClick(e, item?.PROJECT_ID)}>
                            <div className={`flex flex-row hover:bg-gray-200 ${projectId === item?.PROJECT_ID ? 'bg-gray-200' : ''}`}>
                                <div className={`flex min-w-1 ${projectId === item?.PROJECT_ID ? 'bg-primary' : ''}`}></div>
                                <div className='flex flex-col p-3 w-screen'>
                                    <div className="flex flex-row gap-2 mb-5 text-sm">
                                        <div className="flex rounded-[15px] bg-primary w-14 p-2">
                                            <IoRibbonSharp className='size-full text-white' />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div>{item?.PROJECT_NO}</div>
                                            <div className='font-bold'>{item?.PROJECT_NAME.substring(0, 25) + '...'}</div>
                                        </div>
                                        <div className="justify-slef-end">
                                            <div className="badge badge-accent badge-outline">{item?.UR_STATUS}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between text-xs">
                                        <div className="flex flex-row gap-1 items-center"><IoCubeOutline /> {item?.PORTOFOLIO_UR}</div>
                                        {/* <div className='divider divider-horizontal'></div> */}
                                        <div className="flex flex-row gap-1 items-center"><IoTodayOutline /> {item?.PROJECT_TYPE_UR}</div>
                                        {/* <div className='divider divider-horizontal'></div> */}
                                        <div className="flex flex-row gap-1 items-center"><IoBusinessOutline /> {item?.CUSTOMER_NAME?.substring(0, 15) + '...'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='border-t-2' />
                    </>
                )
                )}
            </div>
        </>
    )
}

export default Project