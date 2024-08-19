import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BgModal from '@assets/BgModal.svg';
import { Modal } from '@src/components/atoms';
import { setToggleModal } from '@src/redux/n2n/global';

const ModalCreateUpdateProject = ({ dataDetail }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const { toggleModal } = useSelector(state => state.global);
  const { project } = location?.state;

  return (
    <Modal
      title={`The Project has been ${project === "Add Project" ? "Created" : "Updated"}`}
      modal={"createUpdateProject"}
      buttonFooter={
        <>
          <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
            onClick={() => {
              dispatch(setToggleModal({ isOpen: false, modal: "" }))
              if (project === "Add Project") {
                navigation('/edit-project', {
                  state: {
                    ...location.state,
                    project: 'Edit Project',
                    kd_status: toggleModal?.data?.kd_status,
                    data: {
                      project_id: toggleModal?.data?.project_id,
                      kd_status: toggleModal?.data?.kd_status,
                    },
                  },
                });
              };
            }}
          >
            Close
          </button>
        </>
      }
      size={"max-w-screen-lg"}
    >
      <div className='relative'>
        {/* <BgModal width={'-webkit-fill-available'} /> */}
        <img src={BgModal} />
        <div className='absolute top-3 left-5 border-l-2 pl-5'>
          <h3 className="font-bold text-lg text-white">{project === "Add Project" ? toggleModal?.data?.project_name : dataDetail?.PROJECT_NAME}</h3>
          <div className='flex gap-3 text-white justify-left items-center'>
            <p className="text-sm">{project === "Add Project" ? toggleModal?.data?.project_no : dataDetail?.PROJECT_NO}</p>
            <span className="">|</span>
            <p className="text-sm">{project === "Add Project" ? toggleModal?.data?.ur_portofolio_id : dataDetail?.PORTOFOLIO_UR}</p>
            <span className="">|</span>
            <p className="text-sm">{project === "Add Project" ? toggleModal?.data?.ur_project_type_id : dataDetail?.PROJECT_TYPE_UR}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateUpdateProject