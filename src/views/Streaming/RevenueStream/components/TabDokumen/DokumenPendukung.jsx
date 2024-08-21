import React, { useEffect, useState } from 'react'

const DokumenPendukung = ({ data, getDetailProject, detailDocDelivery }) => {

  const [dataFieldsDocDelivery, setDataFieldsDocDelivery] = useState([]);

  useEffect(() => {
    if (detailDocDelivery?.length > 0) {
      const newData = detailDocDelivery?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          project_id: value?.PROJECT_ID,
          billing_id: data?.billing_id,
          jns_dokumen: value?.JNS_DOKUMEN,
          ur_jns: value?.UR_JNS,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          url_dokumen: value?.URL_DOKUMEN,
          lampiran: null
        }
      })
      setDataFieldsDocDelivery(newData);
    } else {
      setDataFieldsDocDelivery([]);
    };
    // eslint-disable-next-line
  }, [detailDocDelivery]);  

  const headerDocumenDeliveryDetail = ['Jenis Dokumen', 'No Dokumen', 'Tanggal Dokumen', 'Lampiran Dokumen'];

  return (
    <>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Dokumen Pendukung</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-auto'>
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerDocumenDeliveryDetail?.map((title, i) => {
                    return (
                      <th key={i} className='w-1/4'>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataFieldsDocDelivery?.map((item, index) => (
                  <tr key={index}>
                    <td className={'min-w-40'}>
                      <input
                        type="text"
                        name={"jns_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.ur_jns}
                        disabled={true}
                      />
                    </td>
                    <td className={'min-w-40'} >
                      <input
                        type="text"
                        name={"no_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.no_dokumen}
                        disabled={true}
                      />
                    </td>
                    <td className='w-1/6'>
                      <input
                        type="date"
                        name={"tgl_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.tgl_dokumen}
                        disabled={true}
                      />
                    </td>
                    <td className='flex gap-3'>
                      <input
                        type="text"
                        name={"lampiran"}
                        className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                        value={"Open Dokumen Delivery"}
                        onClick={() => window.open(item?.url_dokumen, "_blank")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DokumenPendukung