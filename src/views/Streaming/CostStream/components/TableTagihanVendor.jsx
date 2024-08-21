import React, { useEffect, useState } from 'react'
import { formatCurrency } from 'global/helper/formatCurrency';
import storeSchema from 'global/store';
import ReactPaginate from 'react-paginate';

const TableTagihanVendor = ({ data, setData, setSelectedData, sortBy, rangeDate }) => {
  const headerTable = ["No", "No Project", "Nama Project", "Nama Vendor", "No TTB", "No Invoice", "Tanggal Invoice", "Nominal Invoice", "Status Invoice", "Status SSC", "Tgl Selesai SSC", "Status Payment", "Aging Invoice", "Supply Status", "Jumlah Pelunasan", "Keterangan"];

  useEffect(() => {
    if (data) {
      setTableData(data?.list_data);
    };
  }, [data]);

  const [tableData, setTableData] = useState(data?.list_data)
  const [checkAll, setCheckAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    if (data?.total_data) {
      setTotalPage(Math.ceil(data?.total_data / perPage));
    }
  }, [data?.total_data, perPage])

  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    const updatedData = tableData?.map(item => {
      return { ...item, checked: !checkAll };
    });
    setTableData(updatedData);
  };

  const handleCheckbox = (e, PROJECT_ID) => {
    e.preventDefault();
    setCheckAll(false);

    const updatedData = tableData?.map(item => {
      if (item.BILLING_REVENUE_ID === PROJECT_ID) {
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
    const res = await storeSchema.actions.getListProjectForTagihanVendor({
      page: currentPage,
      limit: perPage,
      status: '004',
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res?.message === 'Success') {
      setData(res?.data)
      setTotalPage(Math.ceil(res?.data?.total_data / perPage))
    } else {
      setData({});
    };
  };

  const ChangePerPage = (e) => {
    setPerPage(e.target.value);
  };

  useEffect(() => {
    renewData();
    // eslint-disable-next-line
  }, [perPage, currentPage, sortBy, rangeDate])

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

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
                <tr key={i}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={v?.checked}
                        onChange={(e) => handleCheckbox(e, v.BILLING_REVENUE_ID)}
                      />
                    </label>
                  </td>
                  <td>{(i + 1)}</td>
                  <td>{v.PROJECT_NO || '-'}</td>
                  <td>{v.PROJECT_NAME || '-'}</td>
                  <td>{v.NAMA_VENDOR || '-'}</td>
                  <td>{v.NO_TTB || '-'}</td>
                  <td>{v.NO_INVOICE || '-'}</td>
                  <td>{v.TANGGAL_INVOICE || '-'}</td>
                  <td>{formatCurrency(v.NOMINAL_INVOICE) || '-'}</td>
                  <td>{v.STATUS_INVOICE === 'T' ? 'Yes' : 'No'}</td>
                  <td>{v.STATUS_SSC === 'T' ? 'Yes' : 'No'}</td>
                  <td>{v.TANGGAL_SSC || '-'}</td>
                  <td>{v.STATUS_PELUNASAN === 'T' ? <span class="inline-block bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-[25px]">
                    Paid
                  </span> : <span class="inline-block bg-red-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-[25px]">
                    Not Paid
                  </span>}</td>
                  <td>{formatCurrency(v.AGING_INVOICE) || '-'}</td>
                  <td>{v.SUPPLY_STATUS === 'T' ? 'Yes' : 'No'}</td>
                  <td>{formatCurrency(v.NOMINAL_PELUNASAN) || '-'}</td>
                  <td>{v.KETERANGAN || '-'}</td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan={headerTable?.length}>
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

export default TableTagihanVendor