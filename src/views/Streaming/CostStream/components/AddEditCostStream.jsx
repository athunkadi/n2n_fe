import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from 'global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import EditCostAdvance from './Form/EditCostAdvance';
import EditTagihanVendor from './Form/EditTagihanVendor';
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen';

const AddEditCostStream = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, menu, data, tabActive } = location?.state;
  const [dataDetail, setDataDetail] = useState({});

  const getDetailProject = async () => {
    // swal.loading();
    try {
      const res = project === "Edit Cost Advance" ? await storeSchema.actions.getDetailCostAdvance(data?.project_id) : await storeSchema.actions.getDetailTagihanVendor(data?.project_id);
      if (res?.status === true) {
        setDataDetail(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Edit Cost Advance" || project === "Edit Tagihan Vendor") {
      getDetailProject();
    };
    // eslint-disable-next-line
  }, [project]);

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/cost-stream", { state: { menu } })} />
            <p className='text-lg font-bold'>{project}</p>
          </div>
        </div>
        {/* FORM */}
        {tabActive && tabActive === 'cost_advance' && (
          <EditCostAdvance dataDetail={dataDetail} setDataDetail={setDataDetail} getDetailProject={getDetailProject} />
        )}
        {tabActive && tabActive === 'tagihan_vendor' && (
          <EditTagihanVendor dataDetail={dataDetail} setDataDetail={setDataDetail} getDetailProject={getDetailProject} />
        )}
        <hr className='mt-5 mb-1' />
        <div className='flex justify-end'>
          <button className='btn btn-primary text-white rounded-[25px] px-5 my-5'
            // onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditCostStream