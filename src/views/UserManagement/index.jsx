import React, { useEffect, useState } from 'react'
// import storeSchema from 'global/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DateRange from '../../components/atoms/DateRange';
import { IoFilterOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import TableUserManagement from './components/TableUserManagement';
import { swal } from '@global/helper/swal';
import { Modal } from '../../components/atoms';
import { setToggleModal } from '../../redux/n2n/global';
// import { ReactComponent as ProjectID } from 'assets/icons/rdProjectId.svg';
// import { ReactComponent as ProjectName } from 'assets/icons/rdProjectName.svg';
// import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
// import { formatCurrency } from 'global/helper/formatCurrency';
import { Label, Select } from '../../components/atoms'

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const headerTableModal = ["No", "Role", "Kualifikasi", "Qty", "UoM", "Qty", "UoM"];

  const [tableDataModal, setTableDataModal] = useState([]);
  const [dataTable, setDataTable] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })

  const getListTable = async (keyword) => {
    swal.loading();
    try {
      // const res = await storeSchema.actions.getListProject({
      //   page: 1,
      //   limit: 10,
      //   order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      //   keyword,
      //   project_type_id: 1,
      // });
      // if (res.message === 'Success') {
      //   setDataTable(res.data);
      // } else {
      setDataTable([]);
      // };
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
  }, [keyword]);

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "resourceDetail", title: "Add New " }));
  };

  return (
    <>
      <Modal
        title={toggleModal?.title + "User"}
        modal={"resourceDetail"}
        size={"w-11/12 max-w-5xl"}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 bg-ghost'>
              Cancel
            </button>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
            // onClick={handleMarkAs}
            // disabled={selectedData?.length === 0 || toggleModal?.selectedData?.length === 0 || (toggleModal?.data === "Akselerasi" ? cantAcceleration : ((toggleModal?.data === "Archive" || toggleModal?.data === "Unarchive") ? false : cantMarkAs))}
            >
              {toggleModal?.title === "Edit" ? "Update" : "Save"}
            </button>
          </>
        }
      >
        <div className='flex flex-col gap-2'>
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='Name'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white"
                    name='name'
                  // value={dataDetail?.TERMIN}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Email'
                children={
                  <input
                    type="email"
                    className="input input-bordered rounded-[25px] bg-white"
                    name='email'
                  // value={dataDetail?.PROJECT_NAME}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Role'
                children={
                  <Select
                    name='role'
                    className='pl-0'
                  // options={options}
                  // onChange={(e, { name }) => handleChangeOpt(e, name)}
                  // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className='card border-2 mt-5'>
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Permission</div>
          <div className='card-body'>
            <div className='max-h-64 overflow-auto flex-row gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='sm:flex sm:gap-10'>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Create</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Update</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">View</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Delete</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>User Management</p>
            <p className='text-base font-light'>View your list user management in here.</p>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            <button className='btn btn-primary rounded-[25px] border-[#ccc] px-5' onClick={handleAdd}>+ Add User</button>
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
                            <div className='pl-0' onClick={""}>
                              <HiOutlineEye className='text-xl' /> View
                            </div>
                          </li>
                          <li>
                            <div className='pl-0' onClick={""}>
                              <HiOutlinePencilAlt className='text-xl' /> Edit
                            </div>
                          </li>
                          <li>
                            <div className='pl-0' onClick={""}>
                              <HiOutlineTrash className='text-xl' /> Hapus
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
            <TableUserManagement navigation={navigation} location={location} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData} sortBy={sortBy} />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserManagement