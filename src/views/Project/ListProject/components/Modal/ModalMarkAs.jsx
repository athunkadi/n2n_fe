import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdTrash } from "react-icons/io";
import { Modal } from '@src/components/atoms';
import { swal } from '@src/global/helper/swal';
import storeSchema from '@src/global/store';
import { setToggleModal } from '@src/redux/n2n/global';

const ModalMarkAs = ({ getRefStatus, selectedData, tabActive, refStatusTab, currentTabIndex, getListTable }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector((state) => state.global)

  const [cantMarkAs, setCantMarkAs] = useState(false);
  const [cantAcceleration, setCantAcceleration] = useState(false);

  useEffect(() => {
    if (toggleModal?.selectedData?.length > 0) {
      const findCanMarkAs = toggleModal?.selectedData?.findIndex((item) => item.TO_MARK === 0);
      if (findCanMarkAs === -1) {
        setCantMarkAs(false);
      } else {
        setCantMarkAs(true);
      };

      const findCanAcceleration = toggleModal?.selectedData?.findIndex((item) => item.TO_AKSELERASI === 0);
      if (findCanAcceleration === -1) {
        setCantAcceleration(false);
      } else {
        setCantAcceleration(true);
      };
    };
  }, [toggleModal]);

  const handleMarkAs = async (e) => {
    e.preventDefault();
    try {
      if (selectedData?.length === 0 || toggleModal?.selectedData?.length === 0 || (toggleModal?.data === "Akselerasi" ? cantAcceleration : ((toggleModal?.data === "Archive" || toggleModal?.data === "Unarchive") ? false : cantMarkAs) )) {
        return
      } else {
        const arrProjectId = toggleModal?.selectedData?.map(item => {
          return item.PROJECT_ID
        });
        if (tabActive?.tab_status === "SA2") {
          const res = await storeSchema.actions.markAsUnarchive({
            project_id: arrProjectId
          });
          if (res?.status === true) {
            await swal.success(res?.message)
          } else {
            swal.error(res?.message)
          };
        } else {
          if (toggleModal?.kd_archive) {
            const res = await storeSchema.actions.markAsArchive({
              project_id: arrProjectId,
              archive: toggleModal?.kd_archive,
              id_tab_status: 'SA2',
            });
            if (res?.status === true) {
              await swal.success(res?.message)
            } else {
              swal.error(res?.message)
            };
          } else {
            if (toggleModal?.data === 'Akselerasi') {
              const res = await storeSchema.actions.markAsAcceleration({ project_id: arrProjectId });
              if (res?.status === true) {
                await swal.success(res?.message)
              } else {
                swal.error(res?.message)
              };
            } else {
              const res = await storeSchema.actions.markAsProject({
                project_id: arrProjectId,
                status: refStatusTab[currentTabIndex + 1]?.kd_status,
                id_tab_status: 'SA1',
              });
              if (res?.status === true) {
                await swal.success(res?.message)
              } else {
                swal.error(res?.message)
              };
            };
          };
        };
        dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "" }))
        getListTable();
        // getPermission();
        getRefStatus();
      }
    } catch (error) {
      console.error(error)
    };
  };

  return (
    <Modal
      title={`Confirmation ${(toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : toggleModal?.data)}`}
      modal={"markAs"}
      size={"max-w-screen-md"}
      buttonFooter={
        <>
          <button className='btn rounded-[25px] px-5 ml-3 bg-ghost'>
            Cancel
          </button>
          <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
            onClick={handleMarkAs}
            disabled={selectedData?.length === 0 || toggleModal?.selectedData?.length === 0 || (toggleModal?.data === "Akselerasi" ? cantAcceleration : ((toggleModal?.data === "Archive" || toggleModal?.data === "Unarchive") ? false : cantMarkAs))}
          >
            {toggleModal?.data === "Archive" ? (toggleModal?.ur_archive.charAt(0).toUpperCase() + toggleModal?.ur_archive.slice(1)) : (toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : "Submit")}
          </button>
        </>
      }
    >
      {toggleModal?.data !== "Archive" && (
        <p>Are you sure want to mark as <span className='text-[#2E66B9]'>{(toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : toggleModal?.data)}</span> all this data?</p>
      )}
      {toggleModal?.data === "Archive" && (
        <p>Are you sure want to archive to <span className='text-[#2E66B9]'>{toggleModal?.ur_archive}</span> all this data?</p>
      )}
      <hr className='my-3' />
      <table className='table table-xs'>
        <thead>
          <tr>
            <th>No</th>
            <th>ID Project</th>
            <th>Nama Project</th>
            <th>Keterangan</th>
            <th>{" "}</th>
          </tr>
        </thead>
        <tbody>
          {toggleModal?.selectedData?.map((item, index) => {
            return (
              <tr key={index}>
                <td className={`${(
                  (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                    (item?.TO_AKSELERASI !== 1) :
                      (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''}`}>{index + 1}</td>
                <td className={`${(
                  (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                    (item?.TO_AKSELERASI !== 1) :
                      (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''}`}>{item.PROJECT_NO}</td>
                <td className={`${(
                  (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                    (item?.TO_AKSELERASI !== 1) :
                      (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''}`}>{item.PROJECT_NAME}</td>
                <td className={`${(
                  (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                    (item?.TO_AKSELERASI !== 1) :
                      (item?.TO_MARK !== 1))) ?
                        'text-red-500 font-bold' : ''}`}>{toggleModal?.data === "Akselerasi" ? (item?.TO_AKSELERASI !== 1 ? item?.KET_AKSELERASI : '') : (item?.TO_MARK !== 1 ? item.KET_MARK : '')}</td>
                <td>
                  <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={() => {
                    const values = [...toggleModal?.selectedData];
                    values.splice(index, 1);
                    dispatch(setToggleModal({ ...toggleModal, selectedData: values }));
                  }}>
                    <IoMdTrash />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Modal>
  )
}

export default ModalMarkAs