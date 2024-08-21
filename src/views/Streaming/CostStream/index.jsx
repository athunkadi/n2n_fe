import React, { useEffect, useState } from 'react'
import DateRange from 'components/atoms/DateRange'
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import storeSchema from 'global/store'
import { swal } from 'global/helper/swal'
import TableCostAdvance from './components/TableCostAdvance'
import TableTagihanVendor from './components/TableTagihanVendor'
import { setToggleModal } from '../../../redux/n2n/global';
import ModalCostAdvancedDetail from './components/Modal/ModalCostAdvancedDetail'
import ModalTagihanVendorDetail from './components/Modal/ModalTagihanVendorDetail'

const CostStream = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { dimensionScreenW, check, toggleModal } = useSelector((state) => state.global)

  const [dataTable, setDataTable] = useState([]);
  const [totalTab1, setTotalTab1] = useState(0);
  const [totalTab2, setTotalTab2] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [tabActive, setTabActive] = useState("cost_advance");
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })

  const getListTable = async () => {
    swal.loading();
    try {
      handleTotal()
      if (tabActive === 'cost_advance') {
        const res = await storeSchema.actions.getListProjectForCostAdvanced({
          page: 1,
          limit: 10,
          status: '004',
          order: sortBy === 'Latest' ? 'DESC' : 'ASC',
          keyword,
          startDate: rangeDate?.startDate,
          endDate: rangeDate?.endDate,
        });
        if (res.message === 'Success') {
          setDataTable(res.data);
          // setTotalTab1(res.data.total_data)
        } else {
          setDataTable([]);
        };
      } else {
        const res = await storeSchema.actions.getListProjectForTagihanVendor({
          page: 1,
          limit: 10,
          status: '004',
          order: sortBy === 'Latest' ? 'DESC' : 'ASC',
          keyword,
          startDate: rangeDate?.startDate,
          endDate: rangeDate?.endDate,
        });
        if (res.message === 'Success') {
          setDataTable(res.data);
          // setTotalTab3(res.data.total_data)
        } else {
          setDataTable([]);
        };
      }
      setTimeout(() => {
        swal.close();
      }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

  const handleSearch = e => setKeyword(e.target.value);

  const handleTotal = async () => {
    const res1 = await storeSchema.actions.getListProjectForCostAdvanced({
      page: 1,
      limit: 10,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      keyword,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res1.message === 'Success') setTotalTab1(res1.data.total_data)

    const res2 = await storeSchema.actions.getListProjectForTagihanVendor({
      page: 1,
      limit: 10,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      keyword,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res2.message === 'Success') setTotalTab2(res2.data.total_data)
  }

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
    navigation('/edit-cost-stream', {
      state: {
        ...location.state,
        project: 'Edit ' + (tabActive === 'cost_advance' ? 'Cost Advance' : 'Tagihan Vendor'),
        data: { project_id: (tabActive === 'cost_advance' ? selectedData[0]?.COST_REVENUE_ID : selectedData[0]?.BILLING_REVENUE_ID) }
        ,
        tabActive: tabActive
      },
    });
  };

  const handleView = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = tabActive === 'cost_advance' ? await storeSchema.actions.getDetailCostAdvance(selectedData[0]?.COST_REVENUE_ID) : await storeSchema.actions.getDetailTagihanVendor(selectedData[0]?.BILLING_REVENUE_ID)
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: tabActive === 'cost_advance' ? "costDetail" : "tagihanDetail", data: res?.data }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ModalCostAdvancedDetail />
      <ModalTagihanVendorDetail/>
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>Cost Stream</p>
            <p className='text-base font-light'>View your list cost stream in here.</p>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            <button className='btn btn-ghost rounded-[25px] border-[#ccc] px-5' disabled>Download Report</button>
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
              // disabled
              />
            </div>

            <div className='flex flex-col gap-5  lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
              <div className="relative">
                <DateRange className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`} setRangeDate={setRangeDate} />
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
                    {selectedData?.length === 1 && (
                      <>
                        <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0' onClick={handleEdit} >
                              <HiOutlinePencilAlt className='text-xl' /> Edit
                            </div>
                          </li>
                        </ul>
                        <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0' onClick={handleView}>
                              <HiOutlineEye className='text-xl' /> View
                            </div>
                          </li>
                        </ul>
                        <hr className='my-2' />
                        <button
                          className='btn btn-sm rounded-[25px] btn-primary'
                        // hover:bg-green-600 text-white
                        // onClick={}
                        >
                          Entri Data
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              key={0}
              className={`btn ${(tabActive) && (tabActive === 'cost_advance') ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
              onClick={() => {
                setTabActive("cost_advance")
                setKeyword('')
                // navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
              }}
            >
              Cost Advance
              <div className={`badge ${(tabActive) && (tabActive === 'cost_advance') ? 'badge-white' : 'badge-primary'}`}>{totalTab1}</div>
            </button>
            <button
              key={1}
              className={`btn ${(tabActive) && (tabActive === 'tagihan_vendor') ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
              onClick={() => {
                setTabActive("tagihan_vendor")
                setKeyword('')
                // navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
              }}
            >
              Tagihan Vendor
              <div className={`badge ${(tabActive) && (tabActive === 'tagihan_vendor') ? 'badge-white' : 'badge-primary'}`}>{totalTab2}</div>
            </button>
          </div>
          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            {tabActive && tabActive === 'cost_advance' && (
              <TableCostAdvance tabActive={tabActive} navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} rangeDate={rangeDate} />
            )}
            {tabActive && tabActive === 'tagihan_vendor' && (
              <TableTagihanVendor tabActive={tabActive} navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} rangeDate={rangeDate} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CostStream