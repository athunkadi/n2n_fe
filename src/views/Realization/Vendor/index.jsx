import React, { useEffect, useState } from 'react'
import DateRange from '../../../components/atoms/DateRange'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TableVendorRealization from './components/TableVendorRealization'
import storeSchema from '@global/store';
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilterOutline } from 'react-icons/io5';
import { swal } from '@global/helper/swal';
import { setToggleModal } from '../../../redux/n2n/global';
import { Modal } from '../../../components/atoms';
import ProjectID from '@assets/icons/RdProjectId.svg';
import ProjectName from '@assets/icons/RdProjectName.svg';
import TotalCost from '@assets/icons/RdTotalCost.svg';
import { formatCurrency } from '@global/helper/formatCurrency';

const VendorRealization = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const headerTableModal = ["No", "Nama Vendor", "No. Kontrak", "Judul Kontrak", "Nominal Kontrak", "Harga Negosiasi"];

  // const [tableDataModal, setTableDataModal] = useState([]);
  const [dataTable, setDataTable] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [sortBy, setSortBy] = useState("Latest");
  const [keyword, setKeyword] = useState("");
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })

  const handleSearch = e => setKeyword(e.target.value);

  const getListTable = async () => {
    await swal.loading();
    try {
      const res = await storeSchema.actions.getListProjectVendor({
        page: 1,
        limit: 10,
        order: sortBy === 'Latest' ? 'DESC' : 'ASC',
        keyword,
        project_type_id: 1,
        startDate: rangeDate?.startDate,
        endDate: rangeDate?.endDate,
      });
      if (res.message === 'Success') {
        setDataTable(res.data?.list_data);
      } else {
        setDataTable({});
      };
      setTimeout(() => {
        swal.close();
      }, 1000);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    getListTable();
  }, [sortBy]);

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
    navigation('/edit-vendor-realization', {
      state: {
        ...location.state,
        project: 'Edit Vendor Realization',
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
      const res = await storeSchema.actions.getDetailProjectVendor(selectedData[0]?.PROJECT_ID);
      if (res?.status === true) {
        swal.close()
        // setTableDataModal(res?.data);
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "resourceDetail", dataSelect: selectedData[0] }));
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
        title={"Resource Detail"}
        modal={"resourceDetail"}
        size={"w-11/12 max-w-5xl"}
      >
        <div className='flex flex-wrap mb-4 gap-5'>
          <div className='flex flex-row gap-3'>
            <div>
              <img src={ProjectID} />
            </div>
            <div className=''>
              <p className='text-xs font-bold'>ID Project</p>
              <p className='text-xs'>{toggleModal?.dataSelect?.PROJECT_NO}</p>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <div>
              <img src={ProjectName} />
            </div>
            <div className=''>
              <p className='text-xs font-bold'>Nama Project</p>
              <p className='text-xs'>{toggleModal?.dataSelect?.PROJECT_NAME}</p>
            </div>
          </div>
        </div>
        <div className='overflow-auto'>
          <table className='table table-md border-separate border-spacing-0 border rounded-md text-left mb-4'>
            <thead >
              <tr>
                {headerTableModal?.map((header, i) => {
                  return (
                    <th key={i} className='border-b-2 px-4 py-2'>
                      {header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {toggleModal?.dataSelect?.DETAIL_VENDOR?.length > 0 ? toggleModal?.dataSelect?.DETAIL_VENDOR?.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{(i + 1)}</td>
                    <td>{v.NAMA_VENDOR || '-'}</td>
                    <td>{v.NO_KONTRAK || '-'}</td>
                    <td>{v.JUDUL_KONTRAK || '-'}</td>
                    <td>{formatCurrency(v.NILAI_KONTRAK) || '-'}</td>
                    <td>{formatCurrency(v.HARGA_NEGOSIASI) || '-'}</td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan={headerTableModal?.length}>
                    <div className='flex justify-center items-center'>
                      No Data to Display
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='flex lg:flex-row min-[320px]:flex-col items-center bg-stone-200 w-full lg:rounded-full min-[320px]:rounded-lg min-[320px]:py-2 lg:py-0 px-6 justify-between'>
          <div className='flex flex-row gap-1'>
            <div>
              <img src={TotalCost} />
            </div>
            <div className='text-sm px-2'>Est. Harga Pemenuhan Layanan Kebutuhan Pelanggan</div>
          </div>
          <div>
            <p className='text-sm px-2 min-[320px]:py-3'>{formatCurrency(toggleModal?.dataSelect?.EST_HARGA_PEMENUHAN) || '-'}</p>
          </div>
        </div>
      </Modal>

      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>Vendor Realization</p>
            <p className='text-base font-light'>View your list vendor realization in here.</p>
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
                            <div className='pl-0' onClick={handleEdit}>
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
            <TableVendorRealization navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} rangeDate={rangeDate} />
          </div>
        </div>
      </div >
    </>
  )
}

export default VendorRealization