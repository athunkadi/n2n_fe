import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsLightningCharge } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { swal } from '@src/global/helper/swal';
import storeSchema from '@src/global/store';
import { CbbPlanning, CostPersonilPlanning, DetailForm } from './Form';
import TabDokumen from './TabDokumen';
import { setToggleModal } from '../../../../redux/n2n/global';
import ModalCreateUpdateProject from './Modal/ModalCreateUpdateProject';
import { badgeStatus, markAsStatus, tabWon } from './DataDummy'
import { optionPortofolio, optionRefByJenis } from '@src/global/helper/functionOption';

const SalesFunnel = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const { project, menu, ur_status, kd_status, tab_status, data } = location?.state;
  document.title = 'POTTER | ' + project;

  const [markAs, setMarkAs] = useState({});
  const [tabActive, setTabActive] = useState(1);
  const [dataDetail, setDataDetail] = useState({
    PROJECT_ID: "",
    PROJECT_NO: "",
    PROJECT_KATEGORI_ID: "1",
    PROJECT_TYPE_UR: "",
    PROJECT_TYPE_ID: "",
    PROJECT_NAME: "",
    PORTOFOLIO_UR: "",
    PORTOFOLIO_ID: "",
    CATEGORY_ID: "",
    // EST_NILAI_PENAWARAN: "",
    // EST_COGS: "",
    NILAI_PENAWARAN: "",
    COGS: "",
    CONTRACT_NO: "",
    NILAI_KONTRAK: "",
    CUSTOMER_ID: "",
    KD_AREA: "",
    KD_STATUS: "",
    CONTRACT_START: "",
    CONTRACT_END: "",
    // MARGIN_PRESENTASE: "",
    MARGIN_PENAWARAN: 0,
    MARGIN_KONTRAK: 0,
    PERSENTASE_PENAWARAN: 0,
    PERSENTASE_KONTRAK: 0,
    PROJECT_OWNER: '',
    FLAG_EDIT: false,
  });
  const [dataCBB, setDataCBB] = useState({});
  const [dataCostPersonilPlanning, setDataCostPersonilPlanning] = useState({});
  const [customer, setCustomer] = useState([]);

  // option list
  const [portofolio, setPortofolio] = useState([]);
  const [tipeProject, setTipeProject] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [area, setArea] = useState([]);
  // get option list
  useEffect(() => {
    const fetchOption = async () => {
      setPortofolio(await optionPortofolio());
      setTipeProject(await optionRefByJenis('project_type_id'));
      setKategori(await optionRefByJenis('category_id'));
      setArea(await optionRefByJenis('kd_area'));
    };
    fetchOption();
  }, []);

  const getDetailProject = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProject(data?.project_id);
      if (res?.status === true) {
        setDataDetail(res?.data);
        setCustomer({ label: res?.data?.CUSTOMER_NAME, value: res?.data?.CUSTOMER_ID });
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getCBBPlanning = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getCBBPlanning(data?.project_id);
      if (res?.status === true) {
        setDataCBB(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getCostPersonilPlanning = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getCostPersonilPlanning(data?.project_id);
      if (res?.status === true) {
        setDataCostPersonilPlanning(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  let formComp;
  switch (tabActive) {
    case 1:
      formComp = <DetailForm
        options={{ portofolio, tipeProject, kategori, area }}
        locationState={{ project, menu, ur_status, kd_status }}
        navigation={navigation}
        customer={customer}
        setCustomer={setCustomer}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      />
      break;
    case 2:
      formComp = <CbbPlanning
        data={dataDetail}
        dataCBB={dataCBB}
        options={{ portofolio, tipeProject, kategori, area }}
        getDetailProject={getDetailProject}
        getCBBPlanning={getCBBPlanning}
      />
      break;
    case 3:
      formComp = <CostPersonilPlanning
        data={dataDetail}
        dataCostPersonilPlanning={dataCostPersonilPlanning}
        getDetailProject={getDetailProject}
        getCostPersonilPlanning={getCostPersonilPlanning}
      />
      break;
    default:
      formComp = null;
      break;
  };

  useEffect(() => {
    if (project === "Edit Project") {
      getDetailProject();
      getCBBPlanning();
      getCostPersonilPlanning();
    };
    // eslint-disable-next-line
  }, [project]);

  const handleSave = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const form = {
        ...(project === "Edit Project" && {
          project_id: data?.project_id ?? dataDetail?.PROJECT_ID,
          project_no: dataDetail?.PROJECT_NO,
        }),
        project_kategori_id: dataDetail?.PROJECT_KATEGORI_ID,
        project_type_id: dataDetail?.PROJECT_TYPE_ID,
        project_name: dataDetail?.PROJECT_NAME,
        portofolio_id: dataDetail?.PORTOFOLIO_ID,
        category_id: dataDetail?.CATEGORY_ID,
        est_nilai_penawaran: dataDetail?.EST_NILAI_PENAWARAN?.toString().replace(",", ".") ?? null,
        est_cogs: dataDetail?.EST_COGS?.toString().replace(",", "."),
        nilai_penawaran: dataDetail?.NILAI_PENAWARAN?.toString().replace(",", ".") ?? null,
        cogs: dataDetail?.COGS?.toString().replace(",", ".") ?? null,
        contract_no: dataDetail?.CONTRACT_NO,
        nilai_kontrak: dataDetail?.NILAI_KONTRAK?.toString().replace(",", ".") ?? null,
        customer_id: dataDetail?.CUSTOMER_ID,
        kd_area: dataDetail?.KD_AREA,
        kd_status: dataDetail?.KD_STATUS,
        contract_start: dataDetail?.CONTRACT_START,
        contract_end: dataDetail?.CONTRACT_END,
        margin_presentase: dataDetail?.MARGIN_PRESENTASE,
        margin_penawaran: dataDetail?.MARGIN_PENAWARAN,
        margin_kontrak: dataDetail?.MARGIN_KONTRAK,
        persentase_penawaran: dataDetail?.PERSENTASE_PENAWARAN,
        persentase_kontrak: dataDetail?.PERSENTASE_KONTRAK,
        project_owner: dataDetail?.PROJECT_OWNER,
        id_tab_status: 'SA1',
        ...(project === "Add Project" && {
          project_kategori_id: dataDetail?.PROJECT_KATEGORI_ID,
          kd_status: dataDetail?.PROJECT_TYPE_ID === "1" ? "001" : (dataDetail?.PROJECT_TYPE_ID === "2" ? "002" : null),
        }),
      };

      const res =
        project === "Add Project" ?
          await storeSchema.actions.insertNewProject(form) :
          await storeSchema.actions.updateProject(form);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "createUpdateProject", ...(project === "Add Project" && { data: res?.data?.project }) }));
        if (project === "Edit Project") {
          getDetailProject();
        };
      } else {
        swal.error(res?.message);
      };

    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    const indexStatus = markAsStatus?.findIndex(item => item.kd_status === kd_status);
    setMarkAs(markAsStatus[indexStatus + 1]);
    // eslint-disable-next-line
  }, [kd_status]);

  const handleMarkAs = async (e) => {
    e.preventDefault();
    try {
      const res = await storeSchema.actions.markAsProject({
        project_id: [(data?.project_id ?? dataDetail?.PROJECT_ID)],
        status: markAs?.kd_status,
        id_tab_status: 'SA1',
      });
      if (res?.status === true) {
        await swal.success(res?.message);
        navigation('/list-project', { state: { menu, ur_status, kd_status } })
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <ModalCreateUpdateProject dataDetail={dataDetail} />
      <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/list-project", { state: { menu, ur_status, kd_status, tab_status } })} />
            <p className='text-lg font-bold'>{project === "Edit Project" ? "Edit" : "Add"} Sales Funnel</p>
          </div>
          {project === "Edit Project" && (
            <>
              {badgeStatus[kd_status]}
              <div className='flex ml-auto gap-3'>
                {dataDetail?.TO_AKSELERASI === 1 && (
                  <button className='btn btn-sm bg-primary text-white rounded-[25px]' >
                    Mark as Akselerasi <BsLightningCharge />
                  </button>
                )}
                {dataDetail?.TO_MARK === 1 && (
                  <button className='btn btn-sm bg-green-700 text-white rounded-[25px]' onClick={handleMarkAs}>
                    Mark as {markAs?.ur_status} <FaArrowRight />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {/* FORM */}
        <div className='text-left'>
          {tabWon?.map((item) => {
            return (
              <div
                className={`btn btn-sm ${(item?.tab !== 1 && project === "Add Project") ? "btn-disabled" : ""} rounded-[25px] mr-3 ${tabActive === item.tab ? 'bg-primary text-white' : 'bg-white text-black'}`}
                onClick={() => setTabActive(item.tab)}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        {formComp}
        {(tabActive === 1 && (project === 'Add Project' || dataDetail?.FLAG_EDIT === true)) && (
          <div className='flex justify-end'>
            <button className='btn btn-primary text-white rounded-[25px] px-5 my-5' onClick={handleSave}>
              Save
            </button>
          </div>
        )}
        {(data?.project_id && tabActive === 1) && (
          <>
            <hr className={dataDetail?.FLAG_EDIT ? 'border-t-2 mb-6' : 'border-t-2 mb-6 mt-6'} />
            <TabDokumen
              data={dataDetail}
              getDetailProject={getDetailProject}
            />
          </>
        )}
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default SalesFunnel