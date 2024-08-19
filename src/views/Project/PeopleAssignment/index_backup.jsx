import React, { useEffect, useState } from 'react';
import DateRangePicker from 'components/atoms/DateRange';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineEye } from "react-icons/hi";
import { IoDownloadOutline, IoFilterOutline } from "react-icons/io5";
import storeSchema from 'global/store';
import ReactPaginate from 'react-paginate';
import { formatCurrency } from 'global/helper/formatCurrency';
import { Modal } from 'components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleModal } from '@src/redux/n2n/global';
import ProjectID from '@src/assets/icons/RdProjectId.svg';
import ProjectName from '@src/assets/icons/RdProjectName.svg';
import TotalCost from '@src/assets/icons/RdTotalCost.svg';

const PeopleAssignment = () => {
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState(null);
  const { toggleModal } = useSelector(state => state.global);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerpage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [detailProject, setDetailProject] = useState({});

  const getListTable = async (keyword) => {
    try {
      const res = await storeSchema.actions.getListProject({
        page: 1,
        limit: 5,
        keyword
      });
      if (res.message === 'Success') {
        setDataTable(res.data);
      } else {
        setDataTable({});
      }
    } catch (error) {
      console.error(error);
    }
  }

  const renewData = async () => {
    const res = await storeSchema.actions.getListProject({
      page: currentPage,
      limit: perPage,
    });
    if (res?.message === 'Success') {
      setDataTable(res?.data);
      setTotalPage(Math.ceil(res?.data?.total_data / perPage))
    } else {
      setDataTable({});
    }
  }

  useEffect(() => {
    getListTable();
  }, [dataTable?.total_data, ]);

  useEffect(() => {
    if(dataTable?.total_data) {
      setTotalPage(Math.ceil(dataTable?.total_data / perPage));
    }

    renewData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable?.total_data, perPage, currentPage])

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  }

  const changePerPage = (e) => {
    setPerpage(e.target.value);
  }

  return (
    <>
      <Modal
        title={"Resource Detail"}
        modal={"resourceDetail"}
      >
        <div className='flex flex-row mb-4'>
          <div className='flex flex-row'>
            {/* <ProjectID /> */}
            <img src={ProjectID} />
            <div className='ml-2'>
              <p className='text-xs font-bold'>ID Project</p> 
              <p className='text-xs'>{detailProject?.PROJECT_NO}</p>
            </div>
          </div>
          <div className='flex flex-row ml-6'>
            {/* <ProjectName /> */}
            <img src={ProjectName} />
            <div className='ml-2'>
              <p className='text-xs font-bold'>Nama Project</p> 
              <p className='text-xs'>{detailProject?.PROJECT_NAME}</p>
            </div>
          </div>
        </div>
        <table className='table table-md border-separate border-spacing-0 border rounded-md text-left mb-4'>
          <thead >
            <tr>
              <th className='border-b-2 px-4 py-2'>Divisi</th>
              <th className='border-b-2 px-4 py-2'>Role</th>
              <th className='border-b-2 px-4 py-2'>Kualifikasi</th>
              <th className='border-b-2 px-4 py-2'>Qty</th>
              <th className='border-b-2 px-4 py-2'>UoM</th>
              <th className='border-b-2 px-4 py-2'>Qty</th>
              <th className='border-b-2 px-4 py-2'>UoM</th>
            </tr>
          </thead>
          <tbody>
            <tr key={1}>
              <td >PPR</td>
              <td >Project Manager</td>
              <td >{`> 5tahun`}</td>
              <td >1</td>
              <td >Man</td>
              <td >16</td>
              <td >Days</td>
            </tr>
            <tr key={2}>
              <td >PPR</td>
              <td >Project Manager</td>
              <td >{`> 5tahun`}</td>
              <td >1</td>
              <td >Man</td>
              <td >16</td>
              <td >Days</td>
            </tr>
            <tr key={3}>
              <td >PPR</td>
              <td >Project Manager</td>
              <td >{`> 5tahun`}</td>
              <td >1</td>
              <td >Man</td>
              <td >16</td>
              <td >Days</td>
            </tr> 
          </tbody>
        </table>
        <div className='flex flex-row bg-stone-200 w-full rounded-full py-2 px-6'>
            {/* <TotalCost /> */}
            <img src={TotalCost} />
            <p className='text-sm px-2 self-center'>Total Cost</p>
            <p className='text-sm px-2 self-center'>{formatCurrency(detailProject?.TOTAL_COST)}</p>
        </div>
      </Modal>

      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5'>
          <div className='sm:w-full'>
            <p className='text-lg font-bold'>People Assignment</p>
            <p className='text-base font-light'>View your list people assignment in here</p>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'><IoDownloadOutline /> Download Report</button>
          </div>
        </div>
        <hr className='border-t-2 my-6' />

        {/* Table */}
        <div className='flex flex-col gap-5'>
          <div className='flex lg:flex-row flex-col gap-5'>
            <div>
              <input type='text' placeholder='Search ...' className='input input-sm input-bordered rounded-[25px] px-3 py-2 bg-transparent' />
            </div>

            <div className='flex flex-col gap-5 lg:justify-end sm:w-full sm:flex-row sm:items-center'>
              <div className='relative'>
                <DateRangePicker />
              </div>
              <div className='flex gap-3'>
                <div className='btn btn-sm rounded-[25px]'>
                  <IoFilterOutline /> Filter
                </div>
                <div className='flex sm:items-center'>
                  <span className='mr-2 text-sm font-light'>Sort by:</span>
                  <div className='btn btn-sm rounded-[25px]'>
                    Latest <IoIosArrowDown />
                  </div>
                </div>
                <div className='dropdown dropdown-end'>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='table table-xs'>
              <thead>
                <tr>
                  <th>
                    No
                  </th> 
                  <th>
                    ID Project
                  </th>
                  <th>
                    Nama Project
                  </th>
                  <th>
                    Total
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  dataTable?.list_data?.length > 0 ? dataTable?.list_data.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          {v.ROW_NUMBER}
                        </td>
                        <td>
                          {v.PROJECT_NO}
                        </td>
                        <td>
                          {v.PROJECT_NAME}
                        </td>
                        <td>
                          {formatCurrency(v.EST_NILAI_PENAWARAN)}
                        </td>
                        <td>
                          <button data-modal-target="default-modal" data-modal-toggle="default-modal" type='button' className='btn btn-xs rounded-[5px]' onClick={ async () => {
                            const res = await storeSchema.actions.getCostPersonilPlanning(v.PROJECT_ID);
                            dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "resourceDetail" }));
                            setDetailProject({
                              "PROJECT_NO": v.PROJECT_NO,
                              "PROJECT_NAME": v.PROJECT_NAME,
                              "PERSONEL": res.data.PERSONEL,
                              "TOTAL_COST": res.data.TOTAL_COST
                            });
                          }}>
                            <HiOutlineEye />
                          </button>
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan={dataTable?.list_data?.length}>
                        <div className='flex justify-center items-center'>
                          No Data to Display
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          
          <div className='flex justify-center items-center mt-2 mb-6 gap-4'>
            <div className='pagination'>
              <ReactPaginate 
                breakLabel={'...'}
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={totalPage}
                onPageChange={changePage}
                pageClassName={'join-item btn btn-sm rounded-[50%] bg-white'}
                pageLinkClassName={''}
                previousClassName='btn btn-sm rounded-[50%] bg-white'
                nextClassName='btn btn-sm rounded-[50%] bg-white'
                breakClassName='btn btn-sm rounded-[50%] bg-white'
                activeClassName={'active-pagination'}
                className={'flex gap-1 items-center'}
                disabledClassName={'disabled'}
              />
            </div>
            <div className='perpage flex items-center gap-2 text-xs'>
              <select className='select select-bordered select-xs w-full max-w-[100px]' onChange={changePerPage}>
                <option value={'5'}> 5/Page</option>
                <option value={'10'}> 10/Page</option>
                <option value={'25'}> 25/Page</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PeopleAssignment