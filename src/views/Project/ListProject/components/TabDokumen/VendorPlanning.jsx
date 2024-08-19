import React, { useEffect, useState } from 'react'
import storeSchema from '@src/global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from '@src/global/helper/swal';
import CurrencyInput from '@src/components/atoms/CurrencyInput';
import { IoMdTrash } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@src/components/atoms';

const VendorPlanning = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const dummyField = {
    project_vendor_id: '',
    vendor_id: '',
    ur_vendor: '',
    no_kontrak: '',
    judul_kontrak: '',
    nilai_kontrak: '',
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const dummyFieldVendor = {
    billing_id: '',
    termin: '',
    est_billing: '',
    est_periode_billing: '',
    real_billing: '',
    real_periode_billing: '',
    kd_status: '',
    total_dokumen: 0,
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const dummyFieldDocDelivery = {
    project_id: "",
    billing_id: "",
    jns_dokumen: "",
    no_dokumen: "",
    tgl_dokumen: "",
    lampiran: null,
    status: {
      canUpload: true,
      canDelete: false,
    },
  };

  const headerDocumenDeliveryDetail = ['Jenis Dokumen', 'No Dokumen', 'Tanggal Submit', 'Dokumen Penagihan'];
  const headerTable = (isBillingRealization === true && sub_pro) ? ['Termin', 'Nominal Estimasi Billing', 'Rencana Periode Billing', 'Nominal Realisasi Billing', 'Realisasi Periode Billing', 'Document Delivery'] : ['Nama Calon Vendor', 'Nominal Estimasi Vendor'];
  const headerListVendor = ["Nama Vendor", "No Kontrak", "Judul Kontrak", "Nominal Kontrak Vendor"];
  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataFields2, setDataFields2] = useState([dummyField]);
  const [dataFieldsVendor, setDataFieldsVendor] = useState([dummyFieldVendor]);
  // const [file, setFile] = useState(null);
  const [dataFieldsDocDelivery, setDataFieldsDocDelivery] = useState([dummyFieldDocDelivery]);
  const [optDocDelivery, setOptDocDelivery] = useState();

  // referensi
  const [optVendor, setOptVendor] = useState();
  const navigation = useNavigate();

  useEffect(() => {
    const getOptvendor = async () => {
      try {
        const res = await storeSchema.actions.getListVendor();
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.nama_perusahaan,
              value: item?.vendor_id,
            }
          })
          setOptVendor(option);
        } else {
          setOptVendor([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    const getOptDocDelivery = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", "04");
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.UR_REF,
              value: item?.KD_REF,
              data: item,
            }
          })
          setOptDocDelivery(option);
        } else {
          setOptDocDelivery([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    getOptDocDelivery();
    getOptvendor();
  }, []);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangePlanning = (e, i) => {
    const values = [...dataFields2];
    values[i][e.target.name] = e.target.value;
    setDataFields2(values);
  };

  const handleChangeVendor = (e, i) => {
    const values = [...dataFieldsVendor];
    values[i][e.target.name] = e.target.value;
    setDataFieldsVendor(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    setDataFields(values);
  };

  const handleChangeCurrencyPlanning = (value, name, index) => {
    const values = [...dataFields2];
    values[index][name] = value;
    setDataFields2(values);
  };

  const handleChangeCurrencyVendor = (value, name, index) => {
    const values = [...dataFieldsVendor];
    values[index][name] = value;
    setDataFieldsVendor(values);
  };

  useEffect(() => {
    const vendorPlanning = data?.VENDOR_PLANNING;
    if (vendorPlanning?.length > 0) {
      const newData = vendorPlanning?.map((value) => {
        return {
          project_vendor_id: value?.PROJECT_VENDOR_ID,
          vendor_id: value?.VENDOR_ID,
          no_kontrak: value?.NO_KONTRAK,
          judul_kontrak: value?.JUDUL_KONTRAK,
          ur_vendor: value?.UR_VENDOR,
          nilai_kontrak: value?.NILAI_KONTRAK,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([]);
    };

    const dokumenVendor = (isBillingRealization || isVendorRealization) ? data?.VENDOR_FINAL : data?.DOKUMEN_VENDOR;
    if (dokumenVendor?.length > 0) {
      const newData = dokumenVendor?.map((value) => {
        return {
          project_vendor_id: value?.PROJECT_VENDOR_ID,
          vendor_id: value?.VENDOR_ID,
          no_kontrak: value?.NO_KONTRAK,
          judul_kontrak: value?.JUDUL_KONTRAK,
          ur_vendor: value?.UR_VENDOR,
          nilai_kontrak: value?.NILAI_KONTRAK,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields2(newData);
    } else {
      setDataFields2([]);
    };

    const dokumenBilling = data?.DOKUMEN_BILLING;
    if (dokumenBilling?.length > 0) {
      const newData = dokumenBilling?.map((value) => {
        return {
          billing_id: value?.BILLING_ID,
          termin: value?.TERMIN,
          est_billing: value?.EST_BILLING,
          est_periode_billing: (value?.EST_PERIODE_BILLING && value?.EST_PERIODE_BILLING !== null) ? value?.EST_PERIODE_BILLING + '-' + value?.EST_BULAN_BILLING : '',
          real_billing: value?.REAL_BILLING,
          real_periode_billing: (value?.REAL_PERIODE_BILLING && value?.REAL_PERIODE_BILLING !== null) ? value?.REAL_PERIODE_BILLING + '-' + value?.REAL_BULAN_BILLING : '',
          kd_status: '',
          total_dokumen: value?.TOTAL_DOKUMEN,
          status: {
            canUpload: false,
            canDelete: true,
          },
        }
      })
      setDataFieldsVendor(newData);
    } else {
      setDataFieldsVendor([]);
    };
    // eslint-disable-next-line
  }, [data]);

  const handleAddFieldPlanning = () => {
    setDataFields2([
      ...dataFields2,
      dummyField,
    ])
  };

  const handleAddField = () => {
    if (isBillingRealization && sub_pro) {
      setDataFieldsVendor([
        ...dataFieldsVendor,
        dummyFieldVendor,
      ])
    } else {
      setDataFields([
        ...dataFields,
        dummyField,
      ])
    }
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    if (isBillingRealization && sub_pro) {
      try {
        const values = [...dataFieldsVendor];
        const targetValue = values[i];
        if (targetValue?.status?.canDelete === true) {
          const res = await storeSchema.actions.deleteBillingCollection(targetValue?.billing_id);
          if (res?.status === true) {
            await swal.success(res?.data);
          } else {
            await swal.error(res?.message);
          };
          getDetailProject();
        } else {
          values.splice(i, 1);
          setDataFieldsVendor(values);
        };
      } catch (error) {
        console.error(error);
      };
    } else {
      try {
        const values = [...dataFields];
        const targetValue = values[i];
        if (targetValue?.status?.canDelete === true) {
          const res = await storeSchema.actions.deleteVendorPlanning(targetValue?.project_vendor_id);
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
    }
  };

  const handleRemoveFieldPlanning = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields2];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteVendorPlanning(targetValue?.project_vendor_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
      } else {
        values.splice(i, 1);
        setDataFields2(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleUploadPlanning = async (e, i) => {
    e.preventDefault();
    try {
      const value = (isBillingRealization || isVendorRealization) ? dataFields[i] : dataFields2[i];
      const payload = {
        nilai_kontrak: value?.nilai_kontrak.replace(",", "."),
        vendor_id: value?.vendor_id,
        project_id: isVendorRealization === true ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
      };

      const res = await storeSchema.actions.vendorPlanning(payload);
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

  const handleUploadVendorBilling = async (e, i) => {
    e.preventDefault();
    try {
      const value = dataFieldsVendor[i];
      const payload = {
        termin: value?.termin,
        est_billing: value?.est_billing,
        est_periode_billing: value?.est_periode_billing,
        real_billing: value?.real_billing,
        real_periode_billing: value?.real_periode_billing,
        project_id: isVendorRealization === true ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_VENDOR_ID,
      };

      const res = await storeSchema.actions.billingCollection(payload);
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

  const handleUpload = async (e, i) => {
    e.preventDefault();
    try {
      const value = (isBillingRealization || isVendorRealization) ? dataFields[i] : dataFields2[i];
      const payload = (isBillingRealization || isVendorRealization) ? {
        nilai_kontrak: value?.nilai_kontrak.replace(",", "."),
        vendor_id: value?.vendor_id,
        project_id: isVendorRealization === true ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
        no_kontrak: value?.no_kontrak,
        judul_kontrak: value?.judul_kontrak,
      } : {
        nilai_kontrak: value?.nilai_kontrak.replace(",", "."),
        vendor_id: value?.vendor_id,
        project_id: isVendorRealization === true ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
      };

      const res = await storeSchema.actions.vendorPlanning(payload);
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

  const handleUploadDocDelivery = async (e, i) => {
    e.preventDefault();
    try {
      const value = dataFieldsDocDelivery[i];
      const payload = {
        tipe_dokumen: "04", // dokumen delivery
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_id: data?.PROJECT_ID,
        billing_id: toggleModal?.billing_id,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", value?.lampiran);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      handleViewDoc(e, toggleModal?.billing_id, true)
    } catch (error) {
      console.error(error);
    };
  };

  const handleSubmitHKP = async (e) => {
    e.preventDefault()
    swal.loading();
    try {
      const payload = {
        project_id: data?.PROJECT_ID,
        id_tab_status: 'HK1',
        kd_status: '200',
        type_status: 'PR01'
      }
      const res = await storeSchema.actions.insertProjectStatus(payload);
      if (res?.status === true) {
        await swal.success(res?.message);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
    } catch (error) {
      console.error(error);
    };
  };

  const handleEditDetail = async (e, sub_data) => {
    e.preventDefault();
    navigation('/add-billing-realization', {
      state: {
        ...location.state,
        sub_project: 'Add Vendor Billing',
        sub_data,
      },
    });
  };

  const handleViewDoc = async (e, billing_id, callback) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getBillingDocument(billing_id);
      if (res?.status === true) {
        swal.close();
        let dataDok = []
        await res?.data?.DOKUMEN_PENDUKUNG && res?.data?.DOKUMEN_PENDUKUNG?.forEach(item => {
          dataDok.push({
            project_id: item?.PROJECT_ID,
            billing_id: billing_id,
            dokumen_id: item?.DOKUMEN_ID,
            jns_dokumen: item?.JNS_DOKUMEN,
            no_dokumen: item?.NO_DOKUMEN,
            tgl_dokumen: item?.TGL_DOKUMEN.substring(0, 10),
            lampiran: item?.URL_DOKUMEN,
            status: {
              canUpload: false,
              canDelete: true,
            },
          })
        });
        setDataFieldsDocDelivery(dataDok)
        dispatch(setToggleModal({ isOpen: (callback === true ? toggleModal.isOpen : !toggleModal.isOpen), modal: "documentDeliveryDetail", data: res?.data?.DOKUMEN_PENDUKUNG }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddFieldDoc = () => {
    setDataFieldsDocDelivery([
      ...dataFieldsDocDelivery,
      dummyFieldDocDelivery,
    ])
  };

  const handleChangeDocDelivery = (e, i) => {
    const values = [...dataFieldsDocDelivery];
    if (e.target.files) {
      values[i][e.target.name] = e.target.files[0];
    } else {
      values[i][e.target.name] = e.target.value;
    }
    setDataFieldsDocDelivery(values);
  };

  const handleRemoveFieldDocDelivery = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFieldsDocDelivery];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
        handleViewDoc(e, toggleModal?.billing_id, true)
      } else {
        values.splice(i, 1);
        setDataFieldsDocDelivery(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <Modal
        title="Document Delivery"
        modal={"documentDeliveryDetail"}
        size={'max-w-6xl w-11/12'}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => dispatch(setToggleModal({ isOpen: false, modal: "" }))}
            >
              Close
            </button>
          </>
        }
      >
        <div type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary my-3 w-60 ' onClick={handleAddFieldDoc}>
          <RxPlusCircled size='20px' /> Add Document
        </div>
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
                <td className={isBillingRealization ? 'min-w-40' : 'w-1/4'}>
                  <select
                    name={"jns_dokumen"}
                    className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeDocDelivery(e, index)}
                    value={item?.jns_dokumen}
                    disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                  >
                    <option key={0} value="" disabled></option>
                    {optDocDelivery?.map((data, i) => {
                      return (
                        <option key={i + 1} value={data?.value} selected={data?.value === item?.jns_dokumen}>{data?.label}</option>
                      )
                    })}
                  </select>
                </td>
                <td className={isBillingRealization ? 'min-w-40' : 'w-1/4'} >
                  <input
                    type="text"
                    name={"no_dokumen"}
                    className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                    value={item?.no_dokumen}
                    onChange={(e) => {
                      if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                        return
                      };
                      handleChangeDocDelivery(e, index)
                    }}
                    disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                  />
                </td>
                <td className='w-1/6'>
                  <input
                    type="date"
                    name={"tgl_dokumen"}
                    className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                    value={item?.tgl_dokumen}
                    onChange={(e) => {
                      if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                        return
                      };
                      handleChangeDocDelivery(e, index)
                    }}
                    disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                  />
                </td>
                <td className='flex gap-3'>
                  {item?.status?.canDelete ? (
                    <input
                      type="text"
                      name={"lampiran"}
                      className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                      value={"Open Dokumen Delivery"}
                      onClick={() => window.open(item?.lampiran, "_blank")}
                    />
                  ) : (
                    <input
                      type="file"
                      name={"lampiran"}
                      className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                      onChange={(e) => {
                        if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                          return
                        };
                        handleChangeDocDelivery(e, index)
                      }}
                      disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                    />
                  )}
                  {/* {(data?.FLAG_EDIT) && ( */}
                  <div className='flex items-center'>
                    {item?.status?.canUpload && (
                      <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadDocDelivery(e, index)}>
                        <AiOutlineSave />
                      </div>
                    )}
                    <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldDocDelivery(e, index)}>
                      <IoMdTrash />
                    </div>
                  </div>
                  {/* )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Vendor {isVendorRealization === true || sub_pro ? 'Billing' : 'Planning'}</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-auto'>
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerTable?.map((title, i) => {
                    return (
                      <th key={i} className={(isBillingRealization && sub_pro) ? '' : 'w-1/2'}>{title}</th>
                    )
                  })}
                  {isBillingRealization && sub_pro && (
                    <th>Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {!sub_pro && dataFields2?.map((item, index) => (
                  <tr key={index}>
                    <td className='w-1/2'>
                      <select
                        name={"vendor_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChangePlanning(e, index)}
                        value={item?.vendor_id}
                        disabled={item?.status?.canDelete}
                      >
                        <option key={0} value="" disabled></option>
                        {optVendor?.map((data, i) => {
                          return (
                            <option key={i + 1} value={data?.value} >{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='flex gap-3'>
                      <CurrencyInput
                        name='nilai_kontrak'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChangeCurrencyPlanning(value, name, index)
                        }}
                        value={item?.nilai_kontrak}
                        disabled={item?.status?.canDelete}
                      />
                      {(
                        isVendorRealization ||
                        (
                          data?.FLAG_EDIT &&
                          (isDetailModalAkselerasi !== true) &&
                          data?.FLAG_VENDOR === 1
                        )
                      ) && (
                          <div className='flex items-center'>
                            {item?.status?.canUpload && (
                              <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadPlanning(e, index)}>
                                <AiOutlineSave />
                              </div>
                            )}
                            <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldPlanning(e, index)}>
                              <IoMdTrash />
                            </div>
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
                {sub_pro && dataFieldsVendor?.map((item, index) => (
                  <tr key={index}>
                    <td className='w-100'>
                      <input
                        type="text"
                        name='termin'
                        className='input input-sm input-bordered rounded-[25px] w-100 bg-white'
                        onChange={(e) => handleChangeVendor(e, index)}
                        value={item?.termin}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td>
                      <CurrencyInput
                        name='est_billing'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrencyVendor(value, name, index)
                        }}
                        value={item?.est_billing}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td>
                      <input
                        type="month"
                        name={"est_periode_billing"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.est_periode_billing}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChangeVendor(e, index)
                        }}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className='flex gap-3'>
                      <CurrencyInput
                        name='real_billing'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrencyVendor(value, name, index)
                        }}
                        value={item?.real_billing}
                        disabled={true}
                      />
                    </td>
                    <td>
                      <input
                        type="month"
                        name={"real_periode_billing"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.real_periode_billing}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChangeVendor(e, index)
                        }}
                        disabled={true}
                      />
                    </td>
                    <td>
                      <div disabled={item?.status?.canDelete === true ? false : true} type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary w-56 hover:bg-blue-100' onClick={(e) => handleViewDoc(e, item?.billing_id)}>
                        View Attachment <span className='text-zinc-400'>| {item?.total_dokumen} Files</span> <span className='bg-primary text-blue-50 rounded-[50%] pt-0 p-1 '>{'>'}</span>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-3'>
                        {item?.status?.canUpload ? (
                          <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadVendorBilling(e, index)}>
                            <AiOutlineSave />
                          </div>
                        ) : (
                          <>
                            {!sub_pro && (
                              <div className='btn btn-sm bg-white' onClick={(e) => handleEditDetail(e, item)}>
                                <HiOutlinePencilAlt />
                              </div>
                            )}
                          </>
                        )}
                        <div className='btn btn-sm bg-red-500 text-white' onClick={(e) => handleRemoveField(e, index)}>
                          <IoMdTrash />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(
            isVendorRealization || sub_pro ||
            (
              data?.FLAG_EDIT &&
              (isDetailModalAkselerasi !== true) &&
              data?.FLAG_VENDOR === 1
            )
          ) && (
              <div className="flex justify-between mt-3">
                {(isBillingRealization !== true || sub_pro) && (
                  <div type="button" disabled={(dataFields2.filter(a => a.status.canUpload === true).length) === 1 ? true : false || (dataFieldsVendor.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary w-60' onClick={sub_pro ? handleAddField : handleAddFieldPlanning}>
                    <RxPlusCircled size='20px' /> Add Vendor {isVendorRealization || isBillingRealization === true ? 'Billing' : 'Planning'}
                  </div>
                )}
                {(isVendorRealization !== true && isBillingRealization !== true) && (
                  <div className='btn btn-sm btn-primary rounded-[25px] text-white' onClick={handleSubmitHKP}>
                    Submit To HKP <FaArrowRight />
                  </div>
                )}
              </div>
            )}
        </div >
      </div >
      {!sub_pro && (isBillingRealization || isVendorRealization) && (
        // {/* LIST VENDOR FINAL */}
        <div className="card border-2 my-5">
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>List Vendor</div>
          <div className="card-body">
            <div className="max-h-64 overflow-auto">
              <table className='table table-sm table-pin-rows'>
                <thead>
                  <tr className='bg-white'>
                    {headerListVendor?.map((title, i) => {
                      return (
                        <th key={i}>{title}</th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataFields?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          name="vendor_id"
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={item?.status?.canDelete}
                        >
                          <option value="" disabled></option>
                          {optVendor?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.vendor_id}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name='no_kontrak'
                          className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                          onChange={(e) => handleChange(e, index)}
                          value={item?.no_kontrak}
                          disabled={item?.status?.canDelete}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name='judul_kontrak'
                          className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                          onChange={(e) => handleChange(e, index)}
                          value={item?.judul_kontrak}
                          disabled={item?.status?.canDelete}
                        />
                      </td>
                      <td className='flex gap-3'>
                        <CurrencyInput
                          name='nilai_kontrak'
                          size='-sm'
                          onChange={(value, name) => {
                            if (item?.status?.canDelete) {
                              return
                            };
                            handleChangeCurrency(value, name, index)
                          }}
                          value={item?.nilai_kontrak}
                          disabled={item?.status?.canDelete}
                        />
                        <div className='flex items-center gap-3'>
                          {item?.status?.canUpload ? (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                              <AiOutlineSave />
                            </div>
                          ) : (
                            <div className='btn btn-sm bg-white' onClick={(e) => handleEditDetail(e, item)}>
                              <HiOutlinePencilAlt />
                            </div>
                          )}
                          {!isBillingRealization && (
                            <div className='btn btn-sm bg-red-500 text-white' onClick={(e) => handleRemoveField(e, index)}>
                              <IoMdTrash />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(!sub_pro && !isBillingRealization) && (
              <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary w-60' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add Vendor
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default VendorPlanning