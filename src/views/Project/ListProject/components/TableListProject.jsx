import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { formatCurrency } from '@src/global/helper/formatCurrency';
import storeSchema from '@src/global/store';

const TableListProject = ({ data, setData, tabActive, setSelectedData, sortBy, setNoKontrak, rangeDate }) => {
  const headerSA2Table = ["No", "ID Project", "Nama Project", "Nama Sales", "Tipe Project", "Nama Customer", "Status Billing"];
  let headerTable;
  switch (tabActive?.kd_status) {
    case "001":
      headerTable = ["No", "ID Project", "Nama Project", "Nama Sales", "Portofolio", "Tipe Project", "Estimasi Nilai Penarawan", "Estimasi COGS", "Nama Customer", "Area", "Category", "SLA", "Status Project"];
      break;
    case "002":
    case "003":
      headerTable = ["No", "ID Project", "Nama Project", "Nama Sales", "Portofolio", "Tipe Project", "Nilai Penarawan", "COGS", "Nama Customer", "Area", "Category", "SLA", "Status Project"];
      break;
    case "004":
      headerTable = ["No", "ID Project", "Nama Project", "Nama Sales", "Portofolio", "Tipe Project", "Nilai Kontrak", "Nomor Kontrak", "Nama Customer", "Area", "Category", "Akselerasi", "SLA", "Status Project"];
      break;
    case "101":
    case "102":
    case "103":
      headerTable = headerSA2Table;
      break;
    default:
      break;
  }

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

  const handleCheckbox = (PROJECT_NO, NO_KONTRAK) => {
    setCheckAll(false)
    setNoKontrak(NO_KONTRAK)
    const updatedData = tableData?.map(item => {
      if (item.PROJECT_NO === PROJECT_NO) {
        return { ...item, checked: item?.checked ? !item.checked : true };
      }
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
    const res = await storeSchema.actions.getListProject({
      page: currentPage,
      limit: perPage,
      status: tabActive?.kd_status,
      tab_status: tabActive?.tab_status,
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate
    });
    if (res?.message === 'Success') {
      setData(res?.data)
      setTotalPage(Math.ceil(res?.data?.total_data / perPage))
    } else {
      setData({});
    };
  }

  const ChangePerPage = (e) => {
    setPerPage(e.target.value);
  }

  useEffect(() => {
    if (tabActive?.kd_status) {
      renewData()
    }
    // eslint-disable-next-line
  }, [perPage, currentPage, rangeDate])

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage)
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
                <tr key={i}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={v?.checked}
                        onChange={() => handleCheckbox(v.PROJECT_NO, v.CONTRACT_NO)}
                      />
                    </label>
                  </td>
                  <td>{v.ROW_NUMBER || '-'}</td>
                  <td>{v.PROJECT_NO || '-'}</td>
                  <td>{v.PROJECT_NAME || '-'}</td>
                  <td>{v.NAMA_SALES || '-'}</td>
                  {tabActive?.tab_status !== "SA2" && (
                    <td>{v.PORTOFOLIO_UR || '-'}</td>
                  )}
                  <td>{v.PROJECT_TYPE_UR || '-'}</td>
                  {(["001", "005"].includes(tabActive?.kd_status) && tabActive?.tab_status === "SA1") && (
                    <>
                      <td>{formatCurrency(v.EST_NILAI_PENAWARAN)}</td>
                      <td>{formatCurrency(v.EST_COGS) || '-'}</td>
                    </>
                  )}
                  {(["002", "003"].includes(tabActive?.kd_status) && tabActive?.tab_status === "SA1") && (
                    <>
                      <td>{formatCurrency(v.NILAI_PENAWARAN) || '-'}</td>
                      <td>{formatCurrency(v.COGS) || '-'}</td>
                    </>
                  )}
                  {tabActive?.kd_status === "004" && (
                    <>
                      <td>{formatCurrency(v.NILAI_KONTRAK)}</td>
                      <td>{v.CONTRACT_NO || '-'}</td>
                    </>
                  )}
                  <td>{v.CUSTOMER_NAME || '-'}</td>
                  {tabActive?.tab_status !== "SA2" && (
                    <>
                      <td>{v.UR_AREA || '-'}</td>
                      <td>{v.CATEGORY_UR || '-'}</td>
                    </>
                  )}
                  {tabActive?.kd_status === "004" && (
                    <td>{v.TOTAL_AKSELERASI || '-'}</td>
                  )}
                  {(tabActive?.kd_status !== "101" && tabActive?.kd_status !== "102" && tabActive?.kd_status !== "103") && (
                    <td className='min-w-36'>{v.SLA || '-'}</td>
                  )}
                  <td>{v.UR_STATUS || '-'}</td>
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

export default TableListProject