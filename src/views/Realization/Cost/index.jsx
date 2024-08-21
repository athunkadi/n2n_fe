import React, { useEffect, useState } from 'react'
import DateRange from '../../../components/atoms/DateRange'
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import TableCostPersonil from './components/TableCostPersonil'
import storeSchema from '@global/store'
import { swal } from '@global/helper/swal'
import TableCostOperational from './components/TableCostOperational'
import TableVendorProjectBilling from './components/TableVendorProjectBilling'
import { setToggleModal } from '../../../redux/n2n/global';
import { Modal } from '../../../components/atoms';
// import { ReactComponent as ProjectID } from 'assets/icons/rdProjectId.svg';
// import { ReactComponent as ProjectName } from 'assets/icons/rdProjectName.svg';
// import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import CostPersonil from './components/Modal/CostPersonil'
import CostOperational from './components/Modal/CostOperational'
import VendorProjectBilling from './components/Modal/VendorProjectBilling'

const CostRealization = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const [dataTable, setDataTable] = useState([]);
  const [totalTab1, setTotalTab1] = useState(0);
  const [totalTab2, setTotalTab2] = useState(0);
  const [totalTab3, setTotalTab3] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [tabActive, setTabActive] = useState("cost_personil");
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  });
  const [tableDataModal, setTableDataModal] = useState([]);

  const getListTable = async () => {
    swal.loading();
    try {
      handleTotal()
      if (tabActive === 'cost_personil') {
        const res = await storeSchema.actions.getListProjectForCostPersonil({
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
      }
      else if (tabActive === 'cost_operational') {
        const res = await storeSchema.actions.getListProjectForCostOperasional({
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
          // setTotalTab2(res.data.total_data)
        } else {
          setDataTable([]);
        };
      } else {
        const res = await storeSchema.actions.getListProject({
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
    const res1 = await storeSchema.actions.getListProjectForCostPersonil({
      page: 1,
      limit: 10,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      keyword,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res1.message === 'Success') setTotalTab1(res1.data.total_data)

    const res2 = await storeSchema.actions.getListProjectForCostOperasional({
      page: 1,
      limit: 10,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      keyword,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res2.message === 'Success') setTotalTab2(res2.data.total_data)

    const res3 = await storeSchema.actions.getListProjectForVendorProjectBilling({
      // const res3 = await storeSchema.actions.getListBillingByTermin({
      page: 1,
      limit: 10,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      keyword,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res3.message === 'Success') setTotalTab3(res3.data.total_data)
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
    navigation('/edit-cost-realization', {
      state: {
        ...location.state,
        project: 'Edit ' + (tabActive === 'cost_personil' ? 'Cost Personil' : tabActive === 'cost_operational' ? 'Cost Operational' : 'Vendor Project Billing'),
        data: tabActive === 'vendor_project_billing' ? { billing_id: selectedData[0]?.BILLING_ID } : { project_id: selectedData[0]?.PROJECT_ID }
        ,
        tabActive: tabActive
      },
    });
  };

  const handleView = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      let selectId = tabActive === 'vendor_project_billing' ? selectedData[0]?.BILLING_ID : selectedData[0]?.PROJECT_ID
      const res = tabActive === 'cost_personil' ? await storeSchema.actions.getDetailCostPersonil(selectId) : tabActive === 'cost_operational' ? await storeSchema.actions.getDetailCostOperational(selectId) : await storeSchema.actions.getDetailVendorProjectBilling(selectId);
      if (res?.status === true) {
        swal.close()
        setTableDataModal(tabActive === 'vendor_project_billing' ? res?.data : res?.data?.DETAIL_COST);
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "detail", title: tabActive === 'cost_personil' ? "Cost Personil Detail" : tabActive === 'cost_operational' ? "Cost Operational Detail" : "Vendor Project Billing Detail", dataSelect: selectedData[0] }));
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <Modal
        title={toggleModal?.title}
        modal={"detail"}
        size={"w-11/12 max-w-5xl"}
      >
        {tabActive === 'cost_personil' && (
          <CostPersonil data={toggleModal?.dataSelect} tableDataModal={tableDataModal}/>
        )}
        {tabActive === 'cost_operational' && (
          <CostOperational data={toggleModal?.dataSelect} tableDataModal={tableDataModal}/>
        )}
        {tabActive === 'vendor_project_billing' && (
          <VendorProjectBilling data={toggleModal?.dataSelect} tableDataModal={tableDataModal}/>
        )}
      </Modal>

      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full text-justify'>
            <p className='text-lg font-bold'>Cost Realization</p>
            <p className='text-base font-light'>View your list cost realization in here.</p>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='self-baseline'>
            <button
              key={0}
              className={`btn ${(tabActive) && (tabActive === 'cost_personil') ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
              onClick={() => {
                setTabActive("cost_personil")
                setKeyword('')
                // navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
              }}
            >
              Cost Personil
              <div className={`badge ${(tabActive) && (tabActive === 'cost_personil') ? 'badge-white' : 'badge-primary'}`}>{totalTab1}</div>
            </button>
            <button
              key={1}
              className={`btn ${(tabActive) && (tabActive === 'cost_operational') ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
              onClick={() => {
                setTabActive("cost_operational")
                setKeyword('')
                // navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
              }}
            >
              Cost Operational
              <div className={`badge ${(tabActive) && (tabActive === 'cost_operational') ? 'badge-white' : 'badge-primary'}`}>{totalTab2}</div>
            </button>
            <button
              key={2}
              className={`btn ${(tabActive) && (tabActive === 'vendor_project_billing') ? 'btn-primary' : 'btn-ghost border-[#ccc]'} rounded-[25px] h-8 min-h-8 ml-0 m-2`}
              onClick={() => {
                setTabActive("vendor_project_billing")
                setKeyword('')
                // navigation('', { state: { ...location.state, ur_status: v.ur_status, kd_status: v.kd_status, tab_status: v.tab_status } })
              }}
            >
              Vendor Project Billing
              <div className={`badge ${(tabActive) && (tabActive === 'vendor_project_billing') ? 'badge-white' : 'badge-primary'}`}>{totalTab3}</div>
            </button>
          </div>
          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            {tabActive && tabActive === 'cost_personil' && (
              <TableCostPersonil tabActive={tabActive} navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} startDate={rangeDate?.startDate} endDate={rangeDate.endDate} />
            )}
            {tabActive && tabActive === 'cost_operational' && (
              <TableCostOperational tabActive={tabActive} navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} startDate={rangeDate?.startDate} endDate={rangeDate.endDate} />
            )}
            {tabActive && tabActive === 'vendor_project_billing' && (
              <TableVendorProjectBilling tabActive={tabActive} navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} startDate={rangeDate?.startDate} endDate={rangeDate.endDate} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CostRealization