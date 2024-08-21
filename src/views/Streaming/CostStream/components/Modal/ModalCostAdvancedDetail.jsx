import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useSelector } from 'react-redux';
import { IoCalendarOutline, IoRibbonOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdCash, IoIosAlarm } from 'react-icons/io';
import { formatCurrency } from 'global/helper/formatCurrency';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { RiCoinsLine } from "react-icons/ri";
import { GrNotes, GrTask } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import format from 'date-fns/format';

const ModalCostAdvancedDetail = () => {
  const { toggleModal } = useSelector(state => state.global);

  const data = [
    {
      label: 'No PR',
      data: toggleModal?.data?.NO_PR || '-',
      logo: <IoDocumentTextOutline />,
    },
    {
      label: 'No Nodin',
      data: toggleModal?.data?.NO_NODIN || '-',
      logo: <IoDocumentTextOutline />,
    },
    {
      label: 'Tanggal CA',
      data: toggleModal?.data?.TANGGAL_COST && toggleModal?.data?.TANGGAL_COST !== null ? format(new Date(toggleModal?.data?.TANGGAL_COST.substring(0, 10)), 'dd/MM/yyyy') : '',
      logo: <IoCalendarOutline />,
    },
    {
      label: 'Nominal CA',
      data: formatCurrency(toggleModal?.data?.NILAI_COST),
      logo: <AiOutlineDollar />,
    },
    {
      label: 'Nominal Realisasi',
      data: formatCurrency(toggleModal?.data?.NILAI_REALISASI),
      logo: <AiOutlineDollar />,
    },
    {
      label: 'Aging CA',
      data: toggleModal?.data?.AGING_CA || '-',
      logo: <IoIosAlarm />,
    },
    {
      label: 'Jumlah Pelunasan',
      data: formatCurrency(toggleModal?.data?.NILAI_PELUNASAN),
      logo: <RiCoinsLine />,
    },
    {
      label: 'Status Invoice Pre-Payment',
      data: toggleModal?.data?.STATUS_INVOICE === "T" ? "Yes"
        : (
          toggleModal?.data?.STATUS_INVOICE === "F" ? "No"
            : "-"
        ),
      logo: <IoRibbonOutline />,
    }
  ]

  return (
    <Modal
      title="Cost Detail"
      modal={"costDetail"}
      // size={"w-11/12 max-w-2xl"}
      size={"w-11/12 max-w-5xl"}
      // buttonFooter={null}
    >
      <div className='relative'>
        {/* <BgModal width={'-webkit-fill-available'} />
        <div className='absolute top-3 left-5 border-l-2 pl-5'>
          <h3 className="font-bold max-[320px]:text-lg min-[320px]:text-sm text-white">{toggleModal?.data?.PROJECT_NAME}</h3>
          <div className='flex gap-3 text-white justify-center items-center'>
            <p className="text-sm">{toggleModal?.data?.PROJECT_NO}</p>
            <span className="">|</span>
            <p className="text-sm">{toggleModal?.data?.PORTOFOLIO}</p>
          </div>
        </div> */}
        <div className='flex flex-row p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
          <div className='border-l-2'></div>
          <div className='flex flex-col gap-3'>
            <div className='flex-row flex items-center gap-5'>
              <div className='font-bold'>
                {toggleModal?.data?.PROJECT_NAME}
              </div>
              <div className='rounded-full bg-gray-500/50 text-white px-4'>
                Paid
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm items-center">
              <div>{toggleModal?.data?.PROJECT_NO}</div>
              <div>|</div>
              <div>{toggleModal?.data?.PORTOFOLIO_UR}</div>
            </div>
          </div>
        </div>
        <div className='sm:grid sm:grid-cols-3 gap-5 mt-3'>
          {data?.map(item => {
            return (
              <div className='flex items-center min-[320px]:mb-4 lg:mb-0'>
                <div className='flex justify-center items-center border rounded-xl p-2 mr-5 bg-gray-100'>{item?.logo}</div>
                <div>
                  <div className='font-bold text-xs'>{item?.label}</div>
                  <div className='text-xs'>{item?.data}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ModalCostAdvancedDetail