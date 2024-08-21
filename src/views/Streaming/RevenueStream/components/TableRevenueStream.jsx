import React, { useEffect, useState } from 'react'
import { formatCurrency } from '@global/helper/formatCurrency';
import storeSchema from '@global/store';
import ReactPaginate from 'react-paginate';

const TableRevenueStream = ({ data, setData, setSelectedData, sortBy, rangeDate }) => {
  const headerTable = ["No", "No Project", "Nama Project", "Nama Customer", "Termin", "Portfolio", "Status", "Nominal Invoice", "Tanggal Invoice", "SLA Delivery-Invoice", "SLA Invoice-Pelunasan"];

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

  const handleCheckbox = (e, BILLING_ID) => {
    e.preventDefault();
    setCheckAll(false);

    const updatedData = tableData?.map(item => {
      if (item.BILLING_ID === BILLING_ID) {
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
    const res = await storeSchema.actions.getListBillingRevenue({
      page: currentPage,
      limit: perPage,
      status: '004',
      order: sortBy === 'Latest' ? 'DESC' : 'ASC',
      project_type_id: '1',
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
  }, [perPage, currentPage, rangeDate])

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  const getColorBagdeSLA1 = (value) => {
    if (value > 3) {
      return 'badge-error';
    } else {
      return 'badge-success';
    }
  }

  const getColorBagde = (value) => {
    switch (true) {
      case (value >= 0 && value <= 60):
        return 'badge-success';
      case (value >= 61 && value <= 90):
        return 'badge-warning';
      case (value > 90):
        return 'badge-error';
      default:
        return '';
    }
  }

  const formatSLA1 = ({start, end}) => {
    if(start !== null && end === null) {
      const datenow = new Date();
      const diffInMs = new Date(datenow) - new Date(start);

      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      const value = Math.floor(diffInDays);
      // return `${Math.floor(diffInDays)} Hari`;
      return <div className={`badge ${getColorBagdeSLA1(parseInt(value))} text-white`}>{`${value} Hari`}</div>
    } else if(start !== null && end !== null) {
      const diffInMs = new Date(end) - new Date(start);

      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      const value = Math.floor(diffInDays);

      // return `${Math.floor(diffInDays)} Hari`;
      return <div className={`badge ${getColorBagdeSLA1(parseInt(value))} text-white`}>{`${value} Hari`}</div>
    } else {
      return '-'; 
    }
  }

  const formatSLA2 = ({start, end}) => {
    if(start !== null && end === null) {
      const datenow = new Date();
      const diffInMs = new Date(datenow) - new Date(start);

      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      const value = Math.floor(diffInDays);

      return <div className={`badge ${getColorBagde(value)} text-white`}>{`${value} Hari`}</div>;
    } else if(start !== null && end !== null) {
      const diffInMs = new Date(end) - new Date(start);

      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      const value = Math.floor(diffInDays);

      return <div className={`badge ${getColorBagde(value)} text-white`}>{`${value} Hari`}</div>;
    } else {
      return '-';
    }
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
                        onChange={(e) => handleCheckbox(e, v.BILLING_ID)}
                      />
                    </label>
                  </td>
                  <td>{(i + 1)}</td>
                  <td>{v.PROJECT_NO || '-'}</td>
                  <td>{v.PROJECT_NAME || '-'}</td>
                  <td>{v.CUSTOMER_NAME || '-'}</td>
                  <td>{v.TERMIN || '-'}</td>
                  <td>{v.PORTOFOLIO || '-'}</td>
                  <td>{v.STATUS === '-' ? '-' : <div className="badge badge-primary">{v.STATUS}</div>}</td>
                  <td>{formatCurrency(v.NOMINAL_INVOICE) || '-'}</td>
                  <td>{v.TANGGAL_INVOICE || '-'}</td>
                  <td>{formatSLA1({start: v.SLA1_START, end: v.SLA1_END})}</td>
                  <td>{formatSLA2({start: v.SLA2_START, end: v.SLA2_END})}</td>
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

export default TableRevenueStream