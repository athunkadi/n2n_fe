import React, { useEffect, useState } from 'react'
import DateRange from '../../../components/atoms/DateRange';
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from '@global/helper/swal';
import storeSchema from '@global/store';
import TableRevenueStream from './components/TableRevenueStream';
import { setToggleModal } from '../../../redux/n2n/global';
import ModalRevenueDetail from './components/Modal/ModalRevenueDetail';

const RevenueStream = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { dimensionScreenW, toggleModal, check } = useSelector((state) => state.global)

  const [dataTable, setDataTable] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })

  const getListBillingRevenue = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getListBillingRevenue({
        page: 1,
        limit: 10,
        order: sortBy === 'Latest' ? 'DESC' : 'ASC',
        keyword,
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
        getListBillingRevenue(keyword);
      }, 1000);

      return () => clearTimeout(getData)
    }
    // eslint-disable-next-line
  }, [keyword, rangeDate]);

  useEffect(() => {
    getListBillingRevenue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleEdit = async (e) => {
    e.preventDefault();
    navigation('/entry-data-revenue-stream', {
      state: {
        ...location.state,
        project: 'Entry Data Revenue Stream',
        data: {
          billing_id: selectedData[0]?.BILLING_ID,
        },
      },
    });
  };

  const handleView = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailBillingRevenue(selectedData[0]?.BILLING_ID);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "revenueDetail", data: res?.data }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListBillingRevenue()
  }, [sortBy])

  return (
    <>
      <ModalRevenueDetail />
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>Revenue Stream</p>
            <p className='text-base font-light'>View your list revenue stream in here.</p>
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
            <TableRevenueStream navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} rangeDate={rangeDate}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default RevenueStream