import React, { useEffect, useState } from 'react'
import DokumenPendukung from './DokumenPendukung';
import Kontrak from './Kontrak';
import BAMK from './BAMK';
import BillingCollectionPlan from './BillingCollectionPlan';
import VendorPlanning from './VendorPlanning';
import ProjectAkselerasi from './ProjectAkselerasi';
import { useLocation } from 'react-router-dom';

const TabDokumen = ({ data, getDetailProject, isDetailModalAkselerasi, isBillingRealization, isVendorRealization }) => {
  const location = useLocation();
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const [activeTab, setActiveTab] = useState('Dokumen Pendukung');
  const [tabs, setTabs] = useState(['Dokumen Pendukung', 'Kontrak', 'Billing Collection Plan', 'Vendor Planning']);
  const tabComponents = {
    'Dokumen Pendukung':
      <DokumenPendukung data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />,
    'Kontrak':
      <Kontrak data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />,
    'BAMK':
      <BAMK data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />,
    'Billing Collection Plan':
      <BillingCollectionPlan data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isBillingRealization={isBillingRealization} />,
    'Billing Collection':
      <BillingCollectionPlan data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isBillingRealization={isBillingRealization} />,
    'Vendor Planning':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} />,
    'Vendor Billing':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />,
    'Project Akselerasi':
      <ProjectAkselerasi data={data} isDetailModalAkselerasi={isDetailModalAkselerasi} />
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    if (data?.AKSELERASI?.length > 0) {
      if (tabs.includes('Project Akselerasi')) {
        return;
      };
      setTabs([...tabs, 'Project Akselerasi']);
    };
    if (isBillingRealization && !sub_pro) {
      setTabs(['Dokumen Pendukung', 'BAMK', 'Kontrak', 'Billing Collection', 'Vendor Billing'])
    } else if (isBillingRealization && sub_pro) {
      setTabs(['Dokumen Pendukung', 'BAMK', 'Kontrak', 'Vendor Billing'])
    } else if (isVendorRealization) {
      setTabs(['Dokumen Pendukung', 'BAMK', 'Kontrak', 'Vendor Billing'])
    };
    // eslint-disable-next-line
  }, [data])

  return (
    <div className='my-5'>
      <div className='border-b-2 text-start'>
        {tabs?.length > 0 ? tabs?.map((tab, index) => (
          <div
            key={`tab-${index}`}
            className={`tab tab-lg ${activeTab === tab
              ? "tab-active text-[#2E66B9] border-b-2 border-b-[#2E66B9] font-bold"
              : "font-semibold"
              }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        )) : null}
      </div>
      <div>{tabComponents[activeTab]}</div>
    </div>
  )
}

export default TabDokumen