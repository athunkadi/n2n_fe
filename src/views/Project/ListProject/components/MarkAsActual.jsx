import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { RxPlusCircled } from 'react-icons/rx';
import { useLocation, useNavigate } from 'react-router-dom'
import CreateProject from '@src/assets/CreateProject.svg'
import MergeProject from '@src/assets/MergeProject.svg'
import { AsyncSelect, Label, Select } from '@src/components/atoms';
import CurrencyInput from '@src/components/atoms/CurrencyInput';
import storeSchema from '@src/global/store';
import { IoMdTrash } from 'react-icons/io';
import { swal } from '@src/global/helper/swal';

const MarkAsActual = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { menu, ur_status, kd_status } = location?.state;

  const dummyField = {
    project_id: '',
    project_no: '',
    project_name: '',
  };
  const [dataFields, setDataFields] = useState([dummyField]);
  const [projectType, setProjectType] = useState('Merge');
  const [projectNormal, setProjectNormal] = useState({})
  const [customer, setCustomer] = useState({});

  const [dataCreateProject, setDataCreateProject] = useState({
    project_no: '',
    project_name: '',
    project_type_id: '1',
    portofolio_ur: '',
    portofolio_id: '',
    category_ur: '',
    category_id: '',
    // est_cogs: '',
    // est_nilai_penawaran: '',
    cogs: '',
    nilai_penawaran: '',
    contract_no: '',
    nilai_kontrak: '',
    contract_start: '',
    contract_end: '',
    persentase_penawaran: 0,
    persentase_kontrak: 0,
    margin_penawaran: 0,
    margin_kontrak: 0,
    ur_area: '',
    kd_area: '',
    id_tab_status: 'SA1',
    kd_status: '003',
  });

  // option list
  const [portofolio, setPortofolio] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [area, setArea] = useState([]);

  // get option list
  useEffect(() => {
    const optionPortofolio = async () => {
      try {
        const res = await storeSchema.actions.getPortofolio();
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.portofolio,
              value: item?.portofolio_id,
              data: item,
            }
          })
          setPortofolio(option);
        } else {
          setPortofolio([]);
        };
      } catch (error) {
        console.error(error);
      }
    };
    const optionKategori = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis('category_id');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setKategori(option);
        } else {
          setKategori([]);
        };
      } catch (error) {
        console.error(error);
      }
    };
    const optionArea = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis('kd_area');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setArea(option);
        } else {
          setArea([]);
        };
      } catch (error) {
        console.error(error);
      }
    };

    optionPortofolio();
    optionKategori();
    optionArea();
  }, []);

  const handleChangeCreateProject = (e) => {
    setDataCreateProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleChangeCurrency = (value, name) => {
    if (name === 'nilai_penawaran' && (dataCreateProject?.cogs !== '' || dataCreateProject?.cogs !== 0)) {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          margin_penawaran: (value - dataCreateProject?.cogs),
          persentase_penawaran: ((value - dataCreateProject?.cogs) / value).toFixed(2) * 100,
        };
      });
    }
    if (name === 'nilai_kontrak' && (dataCreateProject?.cogs !== '' || dataCreateProject?.cogs !== 0)) {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          margin_kontrak: (value - dataCreateProject?.cogs),
          persentase_kontrak: ((value - dataCreateProject?.cogs) / value).toFixed(2) * 100,
        };
      });
    }
    setDataCreateProject((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeOpt = (e, name) => {
    if (name === "project_no") {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          [name]: e.label,
        };
      });
    } else {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          [name === "area" ? ("ur_" + name) : (name + "_ur")]: e.label,
          [name === "area" ? ("kd_" + name) : (name + "_id")]: e.value,
        };
      });
    }
  };

  const handleProjectAkselerasi = (e, i) => {
    const values = [...dataFields];
    values[i].project_id = e?.data?.PROJECT_ID;
    values[i].project_no = e?.data?.PROJECT_NO;
    values[i].project_name = e?.data?.PROJECT_NAME;
    setDataFields(values);
  };

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
      values.splice(i, 1);
      setDataFields(values);
    } catch (error) {
      console.error(error);
    };
  };

  const handleMarkAsActual = async (e) => {
    e.preventDefault();
    try {
      const projectAkselerasi = dataFields?.map((v) => {
        return v?.project_id;
      });
      const form = {
        project_actual_id: projectType === "Merge" ? projectNormal?.value : "",
        project_id: projectAkselerasi,
        ...(projectType === "Create" && {
          new_project: {
            project_kategori_id: "1",
            project_type_id: dataCreateProject?.project_type_id,
            project_name: dataCreateProject?.project_name,
            project_no: dataCreateProject?.project_no,
            id_tab_status: dataCreateProject?.id_tab_status,
            portofolio_id: dataCreateProject?.portofolio_id,
            category_id: dataCreateProject?.category_id,
            // est_nilai_penawaran: dataCreateProject?.est_nilai_penawaran?.replace(",", "."),
            // est_cogs: dataCreateProject?.est_cogs?.replace(",", "."),
            nilai_penawaran: dataCreateProject?.nilai_penawaran?.replace(",", "."),
            cogs: dataCreateProject?.cogs?.replace(",", "."),
            contract_no: dataCreateProject?.contract_no,
            nilai_kontrak: dataCreateProject?.nilai_kontrak?.replace(",", "."),
            contract_start: dataCreateProject?.contract_start,
            contract_end: dataCreateProject?.contract_end,
            customer_id: customer?.value,
            kd_area: dataCreateProject?.kd_area,
            kd_status: dataCreateProject?.kd_status,
            persentase_kontrak: dataCreateProject?.persentase_kontrak,
            persentase_penawaran: dataCreateProject?.persentase_penawaran,
            margin_kontrak: dataCreateProject?.margin_kontrak,
            margin_penawaran: dataCreateProject?.margin_penawaran,
          },
        }),
      };
      const res = await storeSchema.actions.markAsActualID(form);
      if (res?.status === true) {
        await swal.success(res?.message);
        navigation("/list-project", { state: { menu, ur_status, kd_status } });
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
      <div className='flex gap-5 items-center'>
        <div className='flex items-center gap-4'>
          <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/list-project", { state: { menu, ur_status, kd_status } })} />
          <p className='text-lg font-bold'>Mark as Actual</p>
        </div>
      </div>
      <hr className='my-5' />
      {/* Card Project Akselerasi */}
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>
          Project Akselerasi
        </div>
        <div className='card-body'>
          <div className='max-h-48 overflow-auto'>
            <table className='table table-lg'>
              <tbody>
                {dataFields?.map((item, index) => (
                  <tr key={index}>
                    <td className='w-[95%]'>
                      <AsyncSelect
                        name='project_name'
                        loadOptions={(value, callBack) => {
                          const get = async () => {
                            try {
                              const res = await storeSchema.actions.getProjectByType('2', value);
                              // filter data yang sudah diselect
                              const filteredRes = res?.data?.filter(vRes =>
                                !dataFields?.some(vDataFields => vDataFields?.project_id === vRes?.PROJECT_ID)
                              );
                              const data = filteredRes?.map((v) => {
                                return {
                                  label: v.PROJECT_NO + ' - ' + v.PROJECT_NAME,
                                  value: v.PROJECT_ID,
                                  data: v,
                                };
                              });
                              callBack(data);
                            } catch (err) {
                              callBack([]);
                            }
                          };
                          get();
                        }}
                        onChange={(e) => {
                          handleProjectAkselerasi(e, index);
                        }}
                        value={item?.project_id ? {
                          label: item?.project_no + ' - ' + item?.project_name,
                          value: item?.project_id
                        } : {}}
                      />
                    </td>
                    <td>
                      <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                        <IoMdTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Project Akselerasi
          </div>
        </div>
      </div>

      <div>
        <div className='text-lg font-bold'>
          Select the project type
        </div>
        <div className='flex justify-between items-center gap-5 my-3'>
          <div
            className={`card h-32 border-2 w-full hover:cursor-pointer hover:border-blue-500 ${projectType === 'Merge' ? "border-primary" : ""}`}
            onClick={() => setProjectType('Merge')}
          >
            <div className='card-body items-center'>
              {/* <MergeProject /> */}
              <img src={MergeProject} />
              <div>
                Merge Project
              </div>
            </div>
          </div>
          <div
            className={`card h-32 border-2 w-full hover:cursor-pointer hover:border-blue-500 ${projectType === 'Create' ? "border-primary" : ""}`}
            onClick={() => setProjectType('Create')}
          >
            <div className='card-body items-center'>
              {/* <CreateProject /> */}
              <img src={CreateProject} />
              <div>
                Create Project
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='my-5'>
        <div className='text-lg font-bold'>
          {projectType === 'Merge' ? 'Merge Project To :' : 'Create Project :'}
        </div>
        {projectType === 'Merge' ? (
          <div>
            <Label
              label='Project Actual'
              children={
                <AsyncSelect
                  name='project_name'
                  loadOptions={(value, callBack) => {
                    const get = async () => {
                      try {
                        const res = await storeSchema.actions.getProjectByType('1', value);
                        const data = res?.data?.map((v) => {
                          return {
                            label: v.PROJECT_NO + ' - ' + v.PROJECT_NAME,
                            value: v.PROJECT_ID,
                            data: v,
                          };
                        });
                        callBack(data);
                      } catch (err) {
                        callBack([]);
                      }
                    };
                    get();
                  }}
                  onChange={(e) => {
                    setProjectNormal({
                      label: e?.label,
                      value: e?.value,
                      data: e?.data,
                    })
                  }}
                  value={projectNormal}
                />
              }
            />
            <Label
              label='Nama Project'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='PROJECT_NAME'
                  value={projectNormal?.data?.PROJECT_NAME}
                  disabled
                />
              }
            />
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Nama Customer'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='CUSTOMER_NAME'
                      value={projectNormal?.data?.CUSTOMER_NAME}
                      disabled
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Portofolio'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='PORTOFOLIO'
                      value={projectNormal?.data?.PORTOFOLIO}
                      disabled
                    />
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <Label
              label='ID Project'
              tooltip
              dataTip='Pilih ID Project Akselerasi yang akan digunakan'
              positionTip='right'
              children={
                <Select
                  name='project_no'
                  className='pl-0'
                  options={dataFields?.filter(item => item.project_no !== "")?.map((v) => {
                    return {
                      label: v?.project_no,
                      value: v?.project_no,
                    }
                  })}
                  onChange={(e, { name }) => handleChangeOpt(e, name)}
                  value={{ label: dataCreateProject?.project_no, value: dataCreateProject?.project_no }}
                />
              }
            />
            <Label
              label='Nama Project'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white"
                  name='project_name'
                  onChange={handleChangeCreateProject}
                  value={dataCreateProject?.project_name}
                />
              }
            />
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Tipe Project'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='project_type_id'
                      value={'Normal'}
                      disabled
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Portofolio'
                  children={
                    <Select
                      name='portofolio'
                      className='pl-0'
                      options={portofolio}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: dataCreateProject?.portofolio_ur, value: dataCreateProject?.portofolio_id }}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Kategori'
                  children={
                    <Select
                      name='category'
                      className='pl-0'
                      options={kategori}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: dataCreateProject?.category_ur, value: dataCreateProject?.category_id }}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nama Customer'
                  children={
                    <AsyncSelect
                      name='customer'
                      loadOptions={(value, callBack) => {
                        const get = async () => {
                          try {
                            const res = await storeSchema.actions.getCustomers(value);
                            const data = res?.data?.map((v) => {
                              return {
                                label: v.customer_name,
                                value: v.customer_id,
                              };
                            });
                            callBack(data);
                          } catch (err) {
                            callBack([]);
                          }
                        };
                        get();
                      }}
                      onChange={(e) => {
                        setCustomer(e);
                      }}
                      value={customer}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='COGS'
                  children={
                    <CurrencyInput
                      name='cogs'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.cogs}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nilai Penawaran'
                  children={
                    <CurrencyInput
                      name='nilai_penawaran'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.nilai_penawaran}
                    />
                  }
                />
              </div>
              {/* <div className='w-full'>
                <Label
                  label='Estimasi COGS'
                  children={
                    <CurrencyInput
                      name='est_cogs'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.est_cogs}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Estimasi Nilai Penawaran'
                  children={
                    <CurrencyInput
                      name='est_nilai_penawaran'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.est_nilai_penawaran}
                    />
                  }
                />
              </div> */}
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Nomor Kontrak'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='contract_no'
                      onChange={handleChangeCreateProject}
                      value={dataCreateProject?.contract_no}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nilai Kontrak'
                  children={
                    <CurrencyInput
                      name='nilai_kontrak'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.nilai_kontrak}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Start Project'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='contract_start'
                      onChange={handleChangeCreateProject}
                      value={dataCreateProject?.contract_start?.substring(0, 10)}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='End Project'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='contract_end'
                      onChange={handleChangeCreateProject}
                      value={dataCreateProject?.contract_end?.substring(0, 10)}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Area'
                  children={
                    <Select
                      name='area'
                      className='pl-0'
                      options={area}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: dataCreateProject?.ur_area, value: dataCreateProject?.kd_area }}
                    />
                  }
                />
              </div>
              <div className='w-full'>
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label={`Nilai Gross Margin Penawaran (${dataCreateProject?.persentase_penawaran}%)`}
                  children={
                    <CurrencyInput
                      name='margin_penawaran'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.margin_penawaran}
                      disabled={true}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label={`Nilai Gross Margin Kontrak (${dataCreateProject?.persentase_kontrak}%)`}
                  children={
                    <CurrencyInput
                      name='margin_kontrak'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.margin_kontrak}
                      disabled={true}
                    />
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className='my-5' />

      <div className='flex justify-end mb-10'>
        <button className='btn btn-primary rounded-[25px]' onClick={handleMarkAsActual}>
          Save
        </button>
      </div>
    </div>
  )
}

export default MarkAsActual