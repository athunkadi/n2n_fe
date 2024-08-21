import React, { useEffect, useState } from 'react'
import Invoice from './Invoice';
import DokumenPenagihan from './DokumenPenagihan';
import { useLocation } from 'react-router-dom';

const ListTab = ({ data, getDetailProject }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Invoice');
  const [tabs, setTabs] = useState(['Invoice', 'Dokumen Penagihan']);
  const tabComponents = {
    'Invoice':
      <Invoice data={data} getDetailProject={getDetailProject} location={location} />,
    'Dokumen Penagihan':
      <DokumenPenagihan data={data} getDetailProject={getDetailProject} location={location} />
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    setTabs(['Invoice', 'Dokumen Penagihan']);
    // eslint-disable-next-line
  }, [data])

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

export default ListTab