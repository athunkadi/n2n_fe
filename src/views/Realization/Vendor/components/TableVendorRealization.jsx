import React, { useEffect, useState } from 'react'
import { formatCurrency } from '@global/helper/formatCurrency';
import storeSchema from '@global/store';
import { IoIosArrowDown } from 'react-icons/io';
import ReactPaginate from 'react-paginate';

const TableVendorRealization = ({ data, setData, setSelectedData, sortBy, rangeDate }) => {
  const headerTable = ["No", "No Project", "Nama Project", "Est. Harga Pemenuhan Layanan Kebutuhan Pelanggan"];
  const headerExpandTable = ["Nama Vendor", "Harga Perkiraan Sendiri", "No Kontrak Vendor", "Judul Kontrak", "Harga Negosiasi", "Dokumen"];

  useEffect(() => {
    if (data) {
      setTableData(data);
    };
  }, [data]);

  const [tableData, setTableData] = useState(data)
  const [checkAll, setCheckAll] = useState(false);
  const [expandTable, setExpandTable] = useState({ project_id: null, isExpand: false });

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(0)

  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    const updatedData = tableData?.map(item => {
      return { ...item, checked: !checkAll };
    });
    setTableData(updatedData);
  };

  const handleCheckbox = (e, PROJECT_NO) => {
    e.preventDefault();
    setCheckAll(false);

    const updatedData = tableData?.map(item => {
      if (item.PROJECT_NO === PROJECT_NO) {
        return { ...item, checked: item?.checked ? !item.checked : true };
      };
      return item;
    });

    setTableData(updatedData);
  };

  useEffect(() => {
    const checkedData = tableData?.filter(item => {
      return item?.checked;
    });

    if (checkedData?.length > 0) {
      setSelectedData(checkedData);
    } else {
      setCheckAll(false);
      setSelectedData(checkedData);
    };
  }, [tableData, setSelectedData]);

  const renewData = async () => {
    const res = await storeSchema.actions.getListProjectVendor({
      page: currentPage,
      limit: perPage,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      project_type_id: 1,
      keyword: '',
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res?.message === 'Success') {
      setData(res?.data?.list_data)
      setTotalPage(Math.ceil(res?.data?.total_data / perPage))
    } else {
      setData({});
    };
  };

  useEffect(() => {
    renewData()
    // eslint-disable-next-line
  }, [perPage, currentPage, sortBy, rangeDate]);

  const ChangePerPage = (e) => {
    setPerPage(e.target.value);
  };

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  const handleExpand = (e, value) => {
    e.preventDefault();
    setExpandTable(prev => {
      if (prev.project_id === value.PROJECT_ID) {
        return {
          project_id: value.PROJECT_ID,
          isExpand: !prev?.isExpand,
        };
      } else {
        return {
          project_id: value.PROJECT_ID,
          isExpand: true,
        }
      }
    })
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs" >
          <thead>
            <tr>
              <th className='bg-white'>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkAll}
                    onChange={handleCheckAll}
                  />
                </label>
              </th>
              {headerTable?.map((header, i) => {
                return (
                  <th key={i} >
                    {header}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.length > 0 ? tableData?.map((v, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={v?.checked}
                          onChange={(e) => handleCheckbox(e, v.PROJECT_NO)}
                        />
                      </label>
                    </td>
                    <td>{(i + 1)}</td>
                    <td>{v.PROJECT_NO || '-'}</td>
                    <td>{v.PROJECT_NAME || '-'}</td>
                    <td>{formatCurrency(v.EST_HARGA_PEMENUHAN) || '-'}</td>
                    <td className='flex justify-center'>
                      <span className={`border-2 rounded-[50%] bg-primary cursor-pointer p-1 arrow ${(expandTable.project_id === v.PROJECT_ID && expandTable.isExpand === true) ? 'rotate' : ''}`} onClick={(e) => handleExpand(e, v)}>
                        <IoIosArrowDown className='text-white text-lg' />
                      </span>
                    </td>
                  </tr>
                  {(expandTable.project_id === v.PROJECT_ID && expandTable.isExpand === true) && (
                    <tr className='bg-sky-50'>
                      <td colSpan={12} className='p-0'>
                        <div className='flex flex-row'>
                          <div className='border-l-4 border-primary mr-3'></div>
                          <div className='w-full'>
                            <table className='table table-xs'>
                              <thead>
                                <tr>
                                  {headerExpandTable?.map((header, i) => {
                                    return (
                                      <th key={i} className='py-3'>
                                        {header}
                                      </th>
                                    )
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                {v?.DETAIL_VENDOR?.map((vExpand, iExpand) => {
                                  return (
                                    <tr key={iExpand}>
                                      <td className='py-2'>{vExpand?.NAMA_VENDOR || '-'}</td>
                                      <td>{formatCurrency(vExpand?.NILAI_KONTRAK) || '-'}</td>
                                      <td>{vExpand?.NO_KONTRAK || '-'}</td>
                                      <td>{vExpand?.JUDUL_KONTRAK || '-'}</td>
                                      <td>{formatCurrency(vExpand?.HARGA_NEGOSIASI) || '-'}</td>
                                      <td>{vExpand?.DOKUMEN || '-'}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            }) : (
              <tr>
                <td colSpan={headerExpandTable?.length}>
                  <div className='flex justify-center items-center'>
                    No Data to Display
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center items-center mt-2 mb-6 gap-4'>
        <div className="pagination">
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
        <div className="perpage flex items-center gap-2 text-xs">
          <select className="select select-bordered select-xs w-full max-w-[100px]" onChange={ChangePerPage}>
            <option value="5">5/Page</option>
            <option value="10" selected>10/Page</option>
            <option value="25">25/Page</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default TableVendorRealization