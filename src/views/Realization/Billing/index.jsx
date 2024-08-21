import React, { useEffect, useState } from 'react'
import DateRange from '../../../components/atoms/DateRange'
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import TableBillingRealization from './components/TableBillingRealization'
import storeSchema from '@global/store'
import { swal } from '@global/helper/swal'
import { Modal } from '../../../components/atoms';
import { setToggleModal } from '../../../redux/n2n/global';
import BgModal from '@assets/BgModal.svg';
import Information from './components/Modal/Information'
import BillingCollectionPlan from './components/Modal/BillingCollectionPlan'
import VendorBilling from './components/Modal/VendorBilling'
import DokumenPendukung from './components/Modal/DokumenPendukung'

const BillingRealization = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const [dataTable, setDataTable] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [tableDataModal, setTableDataModal] = useState([]);
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })
  const [tabActive, setTabActive] = useState(0);

  const getListTable = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getListProject({
        page: 1,
        limit: 10,
        status: '004',
        order: sortBy === 'Latest' ? 'DESC' : 'ASC',
        keyword,
        project_type_id: '1',
        startDate: rangeDate?.startDate,
        endDate: rangeDate?.endDate,
      });
      if (res.message === 'Success') {
        setDataTable(res.data);
      } else {
        setDataTable([]);
      };
      setTimeout(() => {
        swal.close();
      }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

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
    navigation('/edit-billing-realization', {
      state: {
        ...location.state,
        project: 'Edit Billing Realization',
        data: {
          project_id: selectedData[0]?.PROJECT_ID,
        },
      },
    });
  };

  const handleView = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      let selectId = selectedData[0]?.PROJECT_ID
      const res = await storeSchema.actions.getDetailProject(selectId);
      if (res?.status === true) {
        swal.close()
        setTableDataModal(res?.data);
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "billingDetail", dataSelect: selectedData[0] }));
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
        title={"Billing Detail"}
        modal={"billingDetail"}
        size={"w-11/12 max-w-5xl"}
      >
        <div className='flex flex-row p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
          <div className='border-l-2'></div>
          <div className='flex flex-col gap-3'>
            <div className='font-bold'>
              {toggleModal?.dataSelect?.PROJECT_NAME}
            </div>
            <div className="flex flex-wrap gap-3 text-sm items-center">
              <div>{toggleModal?.dataSelect?.PROJECT_NO}</div>
              <div>|</div>
              <div>{toggleModal?.dataSelect?.PORTOFOLIO_UR}</div>
              <div>|</div>
              <div>{toggleModal?.dataSelect?.PROJECT_TYPE_UR}</div>
            </div>
          </div>
        </div>
        <div className='overflow-auto pb-1'>
          <div role="tablist" className="tabs tabs-bordered font-semibold">
            <div role="tab" className={`tab min-w-24 text-primary ${tabActive === 0 ? 'tab-active' : ''}`} onClick={() => setTabActive(0)}>Information</div>
            <div role="tab" className={`tab min-w-44 text-primary ${tabActive === 1 ? 'tab-active' : ''}`} onClick={() => setTabActive(1)}>Billing Collection Plan</div>
            <div role="tab" className={`tab min-w-32 text-primary ${tabActive === 2 ? 'tab-active' : ''}`} onClick={() => setTabActive(2)}>Vendor Billing</div>
            <div role="tab" className={`tab min-w-44 text-primary ${tabActive === 3 ? 'tab-active' : ''}`} onClick={() => setTabActive(3)}>Dokumen Pendukung</div>
          </div>
        </div>
        <div className='my-5'>
          {tabActive === 0 && (
            <Information data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 1 && (
            <BillingCollectionPlan data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 2 && (
            <VendorBilling data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 3 && (
            <DokumenPendukung data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
        </div>
      </Modal>

      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>Billing Realization</p>
            <p className='text-base font-light'>View your list billing realization in here.</p>
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
          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            <TableBillingRealization navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} rangeDate={rangeDate} />
          </div>
        </div>
      </div>
    </>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default BillingRealization