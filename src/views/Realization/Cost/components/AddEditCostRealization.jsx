import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from '@global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import EditCostRealization from './Form/EditCostRealization';
import EditCostRealizationOperational from './Form/EditCostRealizationOperational';
import EditCostRealizationVendor from './Form/EditCostRealizationVendor';
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen';

const AddEditCostRealization = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, menu, data, tabActive } = location?.state;
  const [dataDetail, setDataDetail] = useState({});

  const getDetailProject = async () => {
    // swal.loading();
    try {
      const res = project === "Edit Cost Personil" ? await storeSchema.actions.getDetailCostPersonil(data?.project_id) : project === "Edit Cost Operational" ? await storeSchema.actions.getDetailCostOperational(data?.project_id) : await storeSchema.actions.getDetailVendorProjectBilling(data?.billing_id);
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
    if (project === "Edit Cost Personil" || project === "Edit Cost Operational" || project === "Edit Vendor Project Billing") {
      getDetailProject();
    };
    // eslint-disable-next-line
  }, [project]);

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/cost-index", { state: { menu } })} />
            <p className='text-lg font-bold'>{project}</p>
          </div>
        </div>
        {/* FORM */}
        {tabActive && tabActive === 'cost_personil' && (
          <EditCostRealization dataDetail={dataDetail} getDetailProject={getDetailProject} />
        )}
        {tabActive && tabActive === 'cost_operational' && (
          <EditCostRealizationOperational dataDetail={dataDetail} getDetailProject={getDetailProject} />
        )}
        {tabActive && tabActive === 'vendor_project_billing' && (
          <EditCostRealizationVendor dataDetail={dataDetail} getDetailProject={getDetailProject} />
        )}
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditCostRealization