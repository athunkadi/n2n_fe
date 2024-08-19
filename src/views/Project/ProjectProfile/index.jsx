import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoFilterOutline, IoCubeOutline, IoBusinessOutline, IoTodayOutline, IoRibbonSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import GeneralInfo from './components/GeneralInfo';
import TopOverview from './components/TopOverview';
import Project from './components/Project';
import storeSchema from '@src/global/store';
import { swal } from '@src/global/helper/swal';
import VendorOverview from './components/VendorOverview';
import BudgetOverview from './components/BudgetOverview';

const ProjectProfile = () => {
  const { dimensionScreenW } = useSelector((state) => state.global)
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [projectId, setProjectId] = useState();
  const [tabActive, setTabActive] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");

  const handleSearch = e => setKeyword(e.target.value);

  const getListData = async (keyword) => {
    await swal.loading();
    try {
      const res = await storeSchema.actions.getListProject({
        page: 1,
        limit: 20,
        order: sortBy === 'Latest' ? 'DESC' : 'ASC',
        keyword
      });
      if (res.message === 'Success') {
        setProjectId(res?.data?.list_data[0]?.PROJECT_ID)
        setData(res?.data?.list_data);
      } else {
        setData([]);
      };
      // setTimeout(() => {
      swal.close();
      // }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

  const getDetailProject = async (id) => {
    // await swal.loading();
    try {
      // const res = await storeSchema.actions.getDetailProjectProfile(id);
      const res = await storeSchema.actions.getDetailProject(id);
      if (res.message === 'Success') {
        setDetail(res?.data);
      } else {
        setDetail([]);
      };
      // setTimeout(() => {
      //     swal.close();
      // }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    // getPermission();
    getListData();
    // eslint-disable-next-line
  }, [sortBy]);

  useEffect(() => {
    if (keyword !== null) {
      const getData = setTimeout(() => {
        getListData(keyword);
      }, 1000);

      return () => clearTimeout(getData)
    }
    // eslint-disable-next-line
  }, [keyword]);

  useEffect(() => {
    if (projectId !== '') getDetailProject(projectId);
    // eslint-disable-next-line
  }, [projectId]);

  const handleClick = (e, id) => {
    e.preventDefault();
    swal.loading();
    setTimeout(() => {
      setProjectId(id)
      swal.close()
    }, 1000);
  }

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          {/* <ModalLog toggleModal={toggleModalLog} location={location} /> */}
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>Project Profile</p>
            <p className='text-base font-light'>View your list project profile in here.</p>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5' disabled>Download Report</button>
          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <div className='flex flex-row'>
          <div className='flex flex-col gap-5 w-[35%] border-r-2'>
            <div className='flex lg:flex-row flex-col gap-1'>
              <div>
                <input
                  type="text"
                  placeholder='Search...'
                  className='input input-sm input-bordered rounded-[25px] px-3 py-2 bg-transparent'
                  onChange={handleSearch}
                // value={keyword}
                />
              </div>
              <div className='flex flex-col gap-2 lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
                <div className='flex gap-3'>
                  <div className='btn btn-sm rounded-[25px]'>
                    <IoFilterOutline />
                  </div>
                  <div className='flex sm:items-center'>
                    <span className='mr-2 text-sm font-light'>Sort : </span>
                    <div className={`dropdown dropdown-hover dropdown-end ${(dimensionScreenW < 768) ? 'bringToBack' : ''}`}>
                      <div tabIndex={0} role="button" className="btn btn-sm rounded-[25px] bg-white">{/*sortBy*/} Latest <IoIosArrowDown /></div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28">
                        <li onClick={() => setSortBy('Latest')}><div>Latest</div></li>
                        <li onClick={() => setSortBy('Oldest')}><div>Oldest</div></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-base font-light'>
              3 New Project
            </div>
            <Project data={data} handleClick={handleClick} projectId={projectId} />
          </div>
          {/* <div className="divider divider-horizontal"></div> */}
          <div className='flex flex-col gap-5 w-[65%] pl-5'>
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
            <div className='card bg-white border-2'>
              <h3 className='font-bold p-4'>Project Details</h3>
              <div role="tablist" className="tabs tabs-bordered font-semibold">
                <div role="tab" className={`tab text-primary ${tabActive === 0 ? 'tab-active' : ''}`} onClick={() => setTabActive(0)}>General Info</div>
                <div role="tab" className={`tab text-primary ${tabActive === 1 ? 'tab-active' : ''}`} onClick={() => setTabActive(1)}>TOP Overview</div>
                <div role="tab" className={`tab text-primary ${tabActive === 2 ? 'tab-active' : ''}`} onClick={() => setTabActive(2)}>Vendor Overview</div>
                <div role="tab" className={`tab text-primary ${tabActive === 3 ? 'tab-active' : ''}`} onClick={() => setTabActive(3)}>Budget Overview</div>
              </div>
              {tabActive === 0 && (
                <GeneralInfo detail={detail} />
              )}
              {tabActive === 1 && (
                <TopOverview detail={detail} />
              )}
              {tabActive === 2 && (
                <VendorOverview detail={detail} />
              )}
              {tabActive === 3 && (
                <BudgetOverview detail={detail} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectProfile