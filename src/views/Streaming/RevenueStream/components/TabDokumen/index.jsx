import React, { useState } from 'react'
import DokumenPendukung from './DokumenPendukung';
import DokumenKeuangan from './DokumenKeuangan';

const TabDokumen = ({ data, getDetailProject, detailDocDelivery }) => {
  const [activeTab, setActiveTab] = useState('Dokumen Pendukung');
  const tabs = ['Dokumen Pendukung', 'Dokumen Keuangan'];
  const tabComponents = {
    'Dokumen Pendukung':
      <DokumenPendukung data={data} getDetailProject={getDetailProject} detailDocDelivery={detailDocDelivery.DOKUMEN_PENDUKUNG} />,
    'Dokumen Keuangan':
      <DokumenKeuangan data={data} getDetailProject={getDetailProject} detailDocDelivery={detailDocDelivery.DOKUMEN_KEUANGAN} />,
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className='my-5'>
      <div className='border-b-2'>
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