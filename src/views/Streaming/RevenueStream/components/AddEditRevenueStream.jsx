import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom';
import EditRevenueStream from './Form/EditRevenueStream';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
// import TabDokumen from 'views/Streaming/RevenueStream/components/TabDokumen';
import TabDokumen from './TabDokumen';

const AddEditRevenueStream = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, menu, data } = location?.state;

  const [dataDetail, setDataDetail] = useState({});
  const [dataBil, setDataBil] = useState({});
  const [detailDocDelivery, setDetailDocDelivery] = useState({});
  const [displayStatus, setDisplayStatus] = useState({
    pelunasan: true
  })

  const getDetailBillingRevenue = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailBillingRevenue(data?.billing_id);
      const resDoc = await storeSchema.actions.getBillingDocument(data?.billing_id);

      if (res?.status === true) {
        await setDataDetail(res?.data);
        await setDataBil(res?.data);
        if (res?.data?.STATUS_INVOICE === 'T') {
          setDisplayStatus({
            pelunasan: false
          })
        }
        let nominal_pymad = res?.data?.DOKUMEN_BILLING?.length > 0 ? res?.data?.DOKUMEN_BILLING.reduce((total, item) => total + item.REAL_BILLING, 0) : 0
        setDataDetail((prev) => {
          return {
            ...prev,
            "NOMINAL_PYMAD": res?.data?.NOMINAL_PYMAD !== null ? parseInt(res?.data?.NOMINAL_PYMAD) : parseInt(nominal_pymad),
            "NOMINAL_DPP": res?.data?.NOMINAL_DPP !== null ? parseInt(res?.data?.NOMINAL_DPP) : parseInt(nominal_pymad),
            "PPN_TARIF": (res?.data?.NOMINAL_DPP !== null ? parseInt(res?.data?.NOMINAL_DPP) : parseInt(nominal_pymad)) * parseInt(res?.data?.PPN) / 100,
            "NOMINAL_INVOICE": (res?.data?.NOMINAL_DPP !== null ? parseInt(res?.data?.NOMINAL_DPP) : parseInt(nominal_pymad)) + ((res?.data?.NOMINAL_DPP !== null ? parseInt(res?.data?.NOMINAL_DPP) : parseInt(nominal_pymad)) * parseInt(res?.data?.PPN) / 100),
          };
        });
        swal.close();
      } else {
        swal.error(res?.message);
      }

      if (resDoc?.status === true) {
        swal.close();
        setDetailDocDelivery(resDoc.data);
      } else {
        swal.error(resDoc?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (project === "Entry Data Revenue Stream") {
      getDetailBillingRevenue();
    };
    // eslint-disable-next-line
  }, [project]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      swal.loading();
      const payload = {
        ...(dataDetail?.BILLING_REVENUE_ID !== null && {
          billing_revenue_id: dataDetail?.BILLING_REVENUE_ID,
        }),
        billing_id: dataDetail?.BILLING_ID,
        status_pymad: dataDetail?.STATUS_PYMAD,
        nominal_pymad: dataDetail?.NOMINAL_PYMAD?.toString().replace(",", ".") ?? null,
        tanggal_bast: dataDetail?.TANGGAL_BAST,
        no_invoice: dataDetail?.NO_INVOICE,
        tanggal_invoice: dataDetail?.TANGGAL_INVOICE,
        status_invoice: dataDetail?.STATUS_INVOICE,
        nominal_invoice: dataDetail?.NOMINAL_INVOICE?.toString().replace(",", ".") ?? null,
        no_faktur: dataDetail?.NO_FAKTUR,
        tanggal_faktur: dataDetail?.TANGGAL_FAKTUR,
        status_pelunasan: dataDetail?.STATUS_PELUNASAN,
        nominal_pelunasan: dataDetail?.NOMINAL_PELUNASAN?.toString().replace(",", ".") ?? null,
        tanggal_pelunasan: dataDetail?.TANGGAL_PELUNASAN,
        denda_pajak: dataDetail?.DENDA_PAJAK?.toString().replace(",", ".") ?? null,
        pph: dataDetail?.PPH?.toString().replace(",", ".") ?? null,
        ppn: 11,
        ppn_tarif: dataDetail?.PPN_TARIF?.toString().replace(",", ".") ?? null,
        wapu: dataDetail?.WAPU,
        biaya_lain: dataDetail?.BIAYA_LAIN?.toString().replace(",", ".") ?? null,
        outstanding: dataDetail?.OUTSTANDING?.toString().replace(",", ".") ?? null,
        nominal_dpp: dataDetail?.NOMINAL_DPP?.toString().replace(",", ".") ?? null
      };

      const res = await storeSchema.actions.dataRevenueStream(payload);

      if (dataBil?.STATUS_INVOICE !== 'T' && payload?.status_invoice === 'T' && payload?.status_pelunasan !== 'T') {
        const payload = {
          project_id: dataDetail?.BILLING_ID,
          id_tab_status: '',
          kd_status: '402',
          type_status: 'BL01'
        }
        await storeSchema.actions.insertProjectStatus(payload);
      }

      if (parseInt(dataBil?.OUTSTANDING) !== 0 && payload?.status_pelunasan === 'T' && parseInt(payload?.outstanding) === 0) {
        const payload = {
          project_id: dataDetail?.BILLING_ID,
          id_tab_status: '',
          kd_status: '401',
          type_status: 'BL01'
        }
        await storeSchema.actions.insertProjectStatus(payload);
      }

      if (parseInt(dataBil?.OUTSTANDING) === 0 && payload?.status_pelunasan === 'T' && parseInt(payload?.outstanding) !== 0) {
        const payload = {
          project_id: dataDetail?.BILLING_ID,
          id_tab_status: '',
          kd_status: '400',
          type_status: 'BL01'
        }
        await storeSchema.actions.insertProjectStatus(payload);
      }

      if (res?.status === true) {
        await swal.success(res?.message);
      } else {
        swal.error(res?.message);
      };
      getDetailBillingRevenue();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/revenue-stream", { state: { menu } })} />
            <p className='text-lg font-bold'>{project}</p>
          </div>
        </div>
        {/* FORM */}
        <EditRevenueStream dataDetail={dataDetail} setDataDetail={setDataDetail} detailDocDelivery={detailDocDelivery} displayStatus={displayStatus} setDisplayStatus={setDisplayStatus} />
        <hr className='my-5' />
        <TabDokumen
          data={dataDetail}
          getDetailProject={getDetailBillingRevenue}
          detailDocDelivery={detailDocDelivery}
        />
        <div className='flex justify-end'>
          <button className='btn btn-primary text-white rounded-[25px] px-5 my-5' onClick={handleSave}>
            Save
          </button>
        </div>
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditRevenueStream