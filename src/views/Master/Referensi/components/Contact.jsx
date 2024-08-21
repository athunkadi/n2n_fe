import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from '@global/helper/swal';
// import CurrencyInput from 'components/atoms/CurrencyInput';
import { IoMdTrash } from 'react-icons/io';

const Contact = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "03", // Dokumen Kontrak
    no_dokumen: "",
    tgl_dokumen: "",
    value_dok: "",
    notes: "",
    jns_dokumen: "01007", // Kontrak Addendum
    url_dokumen: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['Nama', 'Alamat', 'Email', 'Phone', 'Jabatan', 'Gender', 'Ulang Tahun', 'Membawahi', 'Deskripsi', '']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [file, setFile] = useState(null);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    setDataFields(values);
  };

  useEffect(() => {
    const dokumenKontrak = data?.DOKUMEN_KONTRAK;
    if (dokumenKontrak?.length > 0) {
      const newData = dokumenKontrak?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          value_dok: value?.VALUE_DOK,
          notes: value?.NOTES,
          jns_dokumen: value?.JNS_DOKUMEN,
          url_dokumen: value?.URL_DOKUMEN,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyField]);
    };
    // eslint-disable-next-line
  }, [data]);

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyField,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleUpload = async (e, i) => {
    e.preventDefault();
    try {
      const value = dataFields[i];
      const payload = {
        tipe_dokumen: value?.tipe_dokumen,
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        value_dok: value?.value_dok?.replace(",", "."),
        notes: value?.notes,
        jns_dokumen: value?.jns_dokumen,
        project_id: (isVendorRealization === true || sub_pro === true) ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Contact Customer</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-x-auto'>
            <table className='table table-sm'>
              <thead>
                <tr className='bg-white'>
                  {headerTable?.map((title, i) => {
                    return (
                      <th key={i}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataFields?.map((item, index) => (
                  <tr key={index}>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                        // value={dataDetail?.TERMIN}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td>
                      {(
                        item?.status
                      ) && (
                          <div className='flex items-center'>
                            {item?.status?.canUpload && (
                              <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                                <AiOutlineSave />
                              </div>
                            )}
                            <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                              <IoMdTrash />
                            </div>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {(
            (isVendorRealization || isBillingRealization) ||
            (
              data?.FLAG_EDIT &&
              (isDetailModalAkselerasi !== true)
            )
          ) && ( */}
          <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Contact
          </div>
          {/* )} */}
        </div >
      </div >
    </>
  )
}

export default Contact