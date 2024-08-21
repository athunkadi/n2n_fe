import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsLightningCharge } from 'react-icons/bs';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import Archive from '@assets/icons/archive.svg';
import DateRange from '../../../components/atoms/DateRange';
import storeSchema from '@global/store'
import { swal } from '@global/helper/swal';
// import { getCookies } from 'global/helper/cookie'
import ModalMarkAs from './components/Modal/ModalMarkAs';
// import ModalLog from './components/Modal/ModalLogActivity';
import TableListProject from './components/TableListProject'
import { setToggleModal } from '@src/redux/n2n/global'

const ListProject = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { dimensionScreenW, check, toggleModal } = useSelector((state) => state.global)
  // const accountAccess = getCookies("accountAccess");

  // const [permission, setPermission] = useState([]);
  const [refStatusTab, setRefStatusTab] = useState([]);
  const [tabActive, setTabActive] = useState({});
  const [dataTable, setDataTable] = useState(null);
  const [currentTabIndex, setCurrentTabIndex] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [noKontrak, setNoKontrak] = useState('');
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })

  // const getPermission = async () => {
  //   try {
  //     const res = await storeSchema.actions.getPermissionCrud(accountAccess?.kode);
  //     if (res.message === 'Success') {
  //       setPermission(res.data);
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };
  const getRefStatus = async () => {
    try {
      const res = await storeSchema.actions.getRefStatusProject();
      if (res.message === 'Success') {
        setRefStatusTab(res.data);
        if (location?.state?.kd_status && location?.state?.ur_status && location?.state?.tab_status) {
          setTabActive({
            ur_status: location?.state?.ur_status,
            kd_status: location?.state?.kd_status,
            tab_status: location?.state?.tab_status,
          });
        } else {
          setTabActive({
            ur_status: res.data[0].ur_status,
            kd_status: res.data[0].kd_status,
            tab_status: res.data[0].tab_status,
          });
        };
      };
    } catch (error) {
      console.error(error);
    };
  };

  const getListTable = async (keyword) => {
    await swal.loading();
    try {
      if (tabActive?.kd_status) {
        const res = await storeSchema.actions.getListProject({
          page: 1,
          limit: 10,
          status: tabActive?.kd_status,
          tab_status: tabActive?.tab_status,
          order: sortBy === 'Latest' ? 'DESC' : 'ASC',
          keyword,
          startDate: rangeDate?.startDate,
          endDate: rangeDate?.endDate,
        });
        if (res.message === 'Success') {
          setDataTable(res.data);
        } else {
          setDataTable({});
        };
        setTimeout(() => {
          swal.close();
        }, 1000);
      };
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    // getPermission();
    getRefStatus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tabActive?.kd_status && tabActive?.tab_status) {
      getListTable();
      const index = refStatusTab?.findIndex((v) => (v.kd_status === tabActive?.kd_status && v.tab_status === tabActive?.tab_status))
      setCurrentTabIndex(index);
    };
    // eslint-disable-next-line
  }, [tabActive?.kd_status, tabActive?.tab_status, sortBy, refStatusTab]);

  const handleSearch = e => setKeyword(e.target.value);

  useEffect(() => {
    if (keyword !== null) {
      const getData = setTimeout(() => {
        getListTable(keyword);
      }, 1000);

      return () => clearTimeout(getData)
    }
    // eslint-disable-next-line
  }, [keyword, rangeDate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    navigation('/edit-project', {
      state: {
        ...location.state,
        project: 'Edit Project',
        kd_status: selectedData[0]?.KD_STATUS,
        data: {
          project_id: selectedData[0]?.PROJECT_ID,
          kd_status: selectedData[0]?.KD_STATUS
        },
      },
    });
  };

  const handleMarkAsActual = async (e) => {
    e.preventDefault();
    navigation('/mark-actual', {
      state: {
        ...location.state,
        project: 'Mark as Actual',
      },
    });
  };

  return (
    <>
      <ModalMarkAs getRefStatus={getRefStatus} selectedData={selectedData} tabActive={tabActive} refStatusTab={refStatusTab} currentTabIndex={currentTabIndex} getListTable={getListTable} />
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          {/* <ModalLog toggleModal={toggleModalLog} location={location} /> */}
          <div className='sm:w-full text-start'>
            <p className='text-lg font-bold'>Sales Funnel</p>
            <p className='text-base font-light'>View your list sales funnel in here.</p>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5' disabled>Download Report</button>
            <button className='btn btn-primary text-white rounded-[25px] px-5' onClick={() => navigation('/add-project', { state: { ...location.state, project: 'Add Project' } })}>+ Add</button>
          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <div className='flex flex-col gap-5'>
          <div className='flex lg:flex-row flex-col gap-5'>
            <div>
              <input
                type="text"
                placeholder='Search...'
                className='input input-sm input-bordered rounded-[25px] px-3 py-2 bg-transparent'
                onChange={handleSearch}
                value={keyword}
              />
            </div>

            <div className='flex flex-col gap-5  lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
              <div className="relative">
                <DateRange className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`} setRangeDate={setRangeDate}/>
              </div>
              <div className='flex gap-3'>
                <div className='btn btn-sm rounded-[25px]'>
                  <IoFilterOutline /> Filter
                </div>
                <div className='flex sm:items-center'>
                  <span className='mr-2 text-sm font-light'>Sort by: </span>
                  <div className={`dropdown dropdown-hover dropdown-end ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                    <div tabIndex={0} role="button" className="btn btn-sm rounded-[25px] bg-white">{sortBy} <IoIosArrowDown /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28">
                      <li onClick={() => setSortBy('Latest')}><div>Latest</div></li>
                      <li onClick={() => setSortBy('Oldest')}><div>Oldest</div></li>
                    </ul>
                  </div>
                </div>
                <div className='dropdown dropdown-end'>
                  <div tabIndex={0} role='button'>
                    <div className={`btn btn-sm rounded-[25px] bg-white ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                      Actions <IoIosArrowDown />
                    </div>
                  </div>
                  <div tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64">
                    <p className='text-md font-bold'>Action</p>
                    {(tabActive?.tab_status !== "SA2" && selectedData?.length > 0) && (
                      <>
                        <hr className='my-2' />
                        <ul className="menu p-0 bg-white rounded-box">
                          <li>
                            <details>
                              <summary className='pl-0'>
                                <img src={Archive} /> Archive
                              </summary>
                              <ul>
                                {(noKontrak === '' || noKontrak === null) && (
                                  <li>
                                    <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "drop", kd_archive: "101" }))}>Drop</div>
                                  </li>
                                )}
                                <li>
                                  <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "close", kd_archive: "102" }))}>Close</div>
                                </li>
                                {(noKontrak === '' || noKontrak === null) && (
                                  <li>
                                    <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "lose", kd_archive: "103" }))}>Lose</div>
                                  </li>
                                )}
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </>
                    )}
                    {(tabActive?.tab_status !== "SA2" && selectedData?.length === 1) && (
                      <>
                        <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0' onClick={handleEdit}>
                              <HiOutlinePencilAlt className='text-xl' /> Edit
                            </div>
                          </li>
                        </ul>
                        {/* <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0'>
                              <HiOutlineEye className='text-xl' /> Log Activity
                            </div>
                          </li>
                        </ul> */}
                      </>
                    )}
                    {tabActive?.kd_status !== '004' && selectedData?.length > 0 && (
                      <>
                        {tabActive?.tab_status === "SA1" && (
                          <>
                            <hr className='my-2' />
                            <button
                              className='btn btn-sm rounded-[25px] bg-sky-500 hover:bg-sky-600 text-white'
                              onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: 'Akselerasi' }))}
                              disabled={selectedData?.length === 0 || selectedData === undefined}
                            >
                              Mark as Akselerasi <BsLightningCharge />
                            </button>
                          </>
                        )}
                        {tabActive?.kd_status !== '103' && (
                          <>
                            <hr className='my-2' />
                            <button
                              className='btn btn-sm rounded-[25px] bg-primary hover:bg-sky-800 text-white'
                              onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, kd_status: tabActive?.kd_status, data: (tabActive?.tab_status === 'SA2' ? "Unarchive" : refStatusTab[currentTabIndex + 1]?.ur_status) }))}
                              disabled={selectedData?.length === 0 || selectedData === undefined}
                            >
                              Mark as {tabActive?.tab_status === 'SA2' ? (tabActive?.kd_status === "101" ? "Undrop" : "Unclose") : refStatusTab[currentTabIndex + 1]?.ur_status}
                            </button>
                          </>
                        )}
                      </>
                    )}
                    <hr className='my-2' />
                    <button
                      className='btn btn-sm rounded-[25px] bg-green-500 hover:bg-green-600 text-white'
                      onClick={handleMarkAsActual}
                    >
                      Mark as Actual
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='text-start'>
            {refStatusTab?.map((v, i) => {
              return (
                <button
                  key={i}
                  className={`btn ${(tabActive?.kd_status === v.kd_status) && (tabActive?.tab_status === v.tab_status) ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
                  onClick={() => {
                    setTabActive({ ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status })
                    setKeyword('')
                    navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
                  }}
                >
                  {v.ur_status}
                  <div className={`badge ${(tabActive?.kd_status === v.kd_status) && (tabActive?.tab_status === v.tab_status) ? 'badge-white' : 'badge-primary'}`}>{v.total_data}</div>
                </button>
              )
            })}
          </div>
          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            <TableListProject navigation={navigation} location={location} refStatusTab={refStatusTab} tabActive={tabActive} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} setNoKontrak={setNoKontrak} rangeDate={rangeDate}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListProject