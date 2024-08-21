import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from '@global/helper/swal';
import { IoMdTrash } from 'react-icons/io';
import { optionRefByJenis } from '@global/helper/functionOption';

const ProjectHistory = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization }) => {
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
  const headerTable = ['Nama Project', 'Role', 'Start Periode', 'End Periode', '']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [file, setFile] = useState(null);
  const [optPosition, setOptPosition] = useState();

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

  useEffect(() => {
    const fetchOption = async () => {
      setOptPosition(await optionRefByJenis('position_id'));
    };
    fetchOption();
  }, []);

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
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Project History</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-auto'>
            <table className='table table-sm table-pin-rows'>
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
                    <td className="w-1/2">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='name'
                      // value={dataDetail?.TERMIN}
                      />
                    </td>
                    <td className="w-1/2">
                      <select
                        name={"jns_dokumen"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.jns_dokumen}
                        disabled={item?.status?.canDelete}
                      >
                        <option key={0} value=""></option>
                        {optPosition?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className="w-1/5">
                      <input
                        type="date"
                        name={"tgl_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.tgl_dokumen}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="w-1/5">
                      <input
                        type="date"
                        name={"tgl_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.tgl_dokumen}
                        onChange={(e) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='flex gap-3'>
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
            <RxPlusCircled size='20px' /> Add Project History
          </div>
          {/* )} */}
        </div >
      </div >
    </>
  )
}

export default ProjectHistory