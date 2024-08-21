import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from '@global/helper/swal';
import { IoMdTrash } from 'react-icons/io';
import CurrencyInput from '../../../../../components/atoms/CurrencyInput';

const Invoice = ({ location, data, getDetailProject }) => {
  const dummyField = {
    billing_detail_id: "",
    billing_id: "",
    dokumen_id: "",
    tipe_dokumen: "01",
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "",
    uraian_jns: "",
    url_dokumen: "",
    value_dok: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['No Invoice', 'Nominal Invoice', 'Attachment Invoice']
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
    const dokumenPendukung = data?.DOKUMEN_INVOICE;
    if (dokumenPendukung?.length > 0) {
      const newData = dokumenPendukung?.map((value) => {
        return {
          billing_detail_id: value?.BILLING_DETAIL_ID,
          billing_id: value?.BILLING_ID,
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: "01",
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          jns_dokumen: value?.JNS_DOKUMEN,
          uraian_jns: value?.URAIAN_JENIS,
          url_dokumen: value?.URL_DOKUMEN,
          value_dok: value?.VALUE_DOK,
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
          await storeSchema.actions.deleteBillingDokumen(targetValue?.billing_detail_id);
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
        tipe_dokumen: "01", // dokumen invoice
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: "01004",
        value_dok: value?.value_dok,
        project_id: data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        const payloadDetail = {
          billing_id: data?.BILLING_ID,
          dokumen_id: res?.data?.dokumen_id[0]?.dokumen_id
        }
        await storeSchema.actions.insertBillingDokumen(payloadDetail)
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
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Invoice</div>
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
                    <td className='w-1/3'>
                      <input
                        type="text"
                        name={"no_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.no_dokumen}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                      />
                    </td>
                    <td className='w-1/4'>
                      <CurrencyInput
                        name='value_dok'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.value_dok}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                      />
                    </td>
                    <td className='flex gap-3'>
                      {item?.status?.canDelete ? (
                        <input
                          type="text"
                          name={"upload_dokumen"}
                          className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                          value={"Open Dokumen Invoice"}
                          onClick={() => window.open(item?.url_dokumen, "_blank")}
                        />
                      ) : (
                        <input
                          type="file"
                          name={"upload_dokumen"}
                          className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                          onChange={(e) => {
                            if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                              return
                            };
                            setFile(e.target.files[0])
                          }}
                          disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                        />
                      )}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Dokumen Invoice
          </div>
        </div >
      </div >
    </>
  )
}

export default Invoice