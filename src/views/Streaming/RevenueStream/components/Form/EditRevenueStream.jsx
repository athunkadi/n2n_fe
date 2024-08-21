import React from 'react'
import { Label, Select } from '../../../../../components/atoms'
import CurrencyInput from '../../../../../components/atoms/CurrencyInput'

const EditRevenueStream = ({ dataDetail, setDataDetail, detailDocDelivery, displayStatus, setDisplayStatus }) => {

  const valueNaN = (value) => {
    return isNaN(value) ? 0 : parseInt(value)
  }

  const options = [
    {
      label: 'Yes',
      value: 'T',
    },
    {
      label: 'No',
      value: 'F',
    },
  ]

  const optionsInvoice = [
    {
      label: 'Final',
      value: 'T',
    },
    {
      label: 'Draft',
      value: 'F',
    },
  ]

  const handleChange = (e) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleChangeCurrency = (value, name) => {
    if (name === 'PPH' || name === 'NOMINAL_PELUNASAN' || name === 'DENDA_PAJAK' || name === 'BIAYA_LAIN' || name === 'NOMINAL_DPP') {
      setDataDetail((prev) => {
        return {
          ...prev,
          'PPN_TARIF': valueNaN(valueNaN(dataDetail?.NOMINAL_DPP) !== 0 ? (valueNaN(dataDetail?.NOMINAL_DPP) * valueNaN(dataDetail?.PPN) / 100) : 0),
          'NOMINAL_INVOICE': valueNaN(valueNaN(dataDetail?.NOMINAL_DPP) + (valueNaN(valueNaN(dataDetail?.NOMINAL_DPP) !== 0 ? (valueNaN(dataDetail?.NOMINAL_DPP) * valueNaN(dataDetail?.PPN) / 100) : 0))),
          'OUTSTANDING': dataDetail?.WAPU === 'T' ? ((valueNaN(dataDetail?.NOMINAL_INVOICE) - valueNaN(dataDetail?.PPN_TARIF)) - (valueNaN(dataDetail?.NOMINAL_PELUNASAN) + valueNaN(dataDetail?.DENDA_PAJAK) + parseInt(valueNaN(dataDetail?.PPH)) + valueNaN(dataDetail?.BIAYA_LAIN))) : ((valueNaN(dataDetail?.NOMINAL_INVOICE)) - (valueNaN(dataDetail?.NOMINAL_PELUNASAN) + valueNaN(dataDetail?.DENDA_PAJAK) + parseInt(valueNaN(dataDetail?.PPH)) + valueNaN(dataDetail?.BIAYA_LAIN)))
        };
      });
    }
    setDataDetail((prev) => {
      return {
        ...prev,
        [name]: valueNaN(value),
      };
    });
  };

  const handleChangeOpt = (e, name) => {
    if (name === 'STATUS_INVOICE' && e?.value === 'T') {
      setDisplayStatus({
        pelunasan: false
      })
    }
    if (name === 'STATUS_INVOICE' && e?.value === 'F') {
      setDisplayStatus({
        pelunasan: true
      })
      setDataDetail((prev) => {
        return {
          ...prev,
          "STATUS_PELUNASAN": null,
          "NOMINAL_PELUNASAN": '',
          "TANGGAL_PELUNASAN": '',
          "DENDA_PAJAK": '',
          "PPH": '',
          "BIAYA_LAIN": '',
          "OUTSTANDING": '',
        };
      });
    }
    if (name === 'STATUS_INVOICE' && e?.value === '') {
      setDisplayStatus({
        pelunasan: true
      })
      setDataDetail((prev) => {
        return {
          ...prev,
          "STATUS_PELUNASAN": '',
          "NOMINAL_PELUNASAN": '',
          "TANGGAL_PELUNASAN": '',
          "DENDA_PAJAK": '',
          "PPH": '',
          "BIAYA_LAIN": '',
          "OUTSTANDING": '',
        };
      });
    }
    setDataDetail((prev) => {
      return {
        ...prev,
        [name]: e?.value,
      };
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <Label
        label='ID Project'
        children={
          <input
            type="text"
            className="input input-bordered rounded-[25px] bg-white"
            name='PROJECT_NO'
            value={dataDetail?.PROJECT_NO}
            disabled
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
            value={dataDetail?.PROJECT_NAME}
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
                value={dataDetail?.CUSTOMER_NAME}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Termin'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='TERMIN'
                value={dataDetail?.TERMIN}
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
                value={dataDetail?.PORTOFOLIO}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Margin'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='MARGIN_PRESENTASE'
                value={dataDetail?.MARGIN_PRESENTASE}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Status Billing'
            children={
              <input
                type="text"
                className="input input-bordered rounded-[25px] bg-white"
                name='URAIAN_STATUS'
                value={dataDetail?.URAIAN_STATUS}
                disabled
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='COGS'
            children={
              <CurrencyInput
                name='COGS'
                value={dataDetail?.COGS}
                disabled
              />
            }
          />
        </div>
      </div>
      <div className='card border-2 mt-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>PYMAD</div>
        <div className='card-body'>
          <div className='max-h-64'>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Status PYMAD'
                  children={
                    <Select
                      name='STATUS_PYMAD'
                      className='pl-0'
                      options={options}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nominal PYMAD'
                  children={
                    <CurrencyInput
                      name='NOMINAL_PYMAD'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.NOMINAL_PYMAD}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Tanggal BAST'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='TANGGAL_BAST'
                      onChange={handleChange}
                      value={dataDetail?.TANGGAL_BAST?.substring(0, 10)}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card border-2 mt-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>INVOICE</div>
        <div className='card-body'>
          <div className=''>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Status Invoice'
                  children={
                    <Select
                      name='STATUS_INVOICE'
                      className='pl-0'
                      options={optionsInvoice}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: (dataDetail?.STATUS_INVOICE === null ? dataDetail?.STATUS_INVOICE : (dataDetail?.STATUS_INVOICE === 'T' ? 'Final' : 'Draft')), value: dataDetail?.STATUS_INVOICE }}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='No Invoice'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='NO_INVOICE'
                      onChange={handleChange}
                      value={dataDetail?.NO_INVOICE}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Tanggal Invoice'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='TANGGAL_INVOICE'
                      onChange={handleChange}
                      value={dataDetail?.TANGGAL_INVOICE?.substring(0, 10)}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='WAPU'
                  children={
                    <Select
                      name='WAPU'
                      className='pl-0'
                      options={options}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: (dataDetail?.WAPU === null ? dataDetail?.WAPU : (dataDetail?.WAPU === 'T' ? 'Yes' : 'No')), value: dataDetail?.WAPU }}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Nominal DPP'
                  children={
                    <CurrencyInput
                      name='NOMINAL_DPP'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.NOMINAL_DPP}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label={`Nominal PPN (${dataDetail?.PPN}%)`}
                  children={
                    <CurrencyInput
                      name='PPN_TARIF'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.PPN_TARIF}
                      disabled={true}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nominal Invoice'
                  children={
                    <CurrencyInput
                      name='NOMINAL_INVOICE'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.NOMINAL_INVOICE}
                      disabled={true}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='No Faktur Pajak'
                  children={
                    <input
                      type="text"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='NO_FAKTUR'
                      onChange={handleChange}
                      value={dataDetail?.NO_FAKTUR}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Tanggal Faktur'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='TANGGAL_FAKTUR'
                      onChange={handleChange}
                      value={dataDetail?.TANGGAL_FAKTUR?.substring(0, 10)}
                    />
                  }
                />
              </div>
              <div className='w-full'>
              </div>
              <div className='w-full'>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>PELUNASAN</div>
        <div className='card-body'>
          <div className=''>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Status Pelunasan'
                  children={
                    <Select
                      name='STATUS_PELUNASAN'
                      className='pl-0'
                      options={optionsInvoice}
                      isDisabled={displayStatus?.pelunasan}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: (dataDetail?.STATUS_PELUNASAN === null ? dataDetail?.STATUS_PELUNASAN : (dataDetail?.STATUS_PELUNASAN === 'T' ? 'Final' : 'Draft')), value: dataDetail?.STATUS_PELUNASAN }}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nominal Pelunasan'
                  children={
                    <CurrencyInput
                      name='NOMINAL_PELUNASAN'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.NOMINAL_PELUNASAN}
                      disabled={displayStatus?.pelunasan}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Tanggal Pelunasan'
                  children={
                    <input
                      type="date"
                      className="input input-bordered rounded-[25px] bg-white"
                      name='TANGGAL_PELUNASAN'
                      onChange={handleChange}
                      value={dataDetail?.TANGGAL_PELUNASAN?.substring(0, 10)}
                      disabled={displayStatus?.pelunasan}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Denda Pajak'
                  children={
                    <CurrencyInput
                      name='DENDA_PAJAK'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.DENDA_PAJAK}
                      disabled={displayStatus?.pelunasan}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='PPh 23'
                  children={
                    <CurrencyInput
                      name='PPH'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.PPH}
                      disabled={displayStatus?.pelunasan}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Biaya Lain'
                  children={
                    <CurrencyInput
                      name='BIAYA_LAIN'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.BIAYA_LAIN}
                      disabled={displayStatus?.pelunasan}
                    />
                  }
                />
              </div>
            </div>
            <hr className='border-t-2 mt-5'/>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Nominal Outstanding'
                  children={
                    <CurrencyInput
                      name='OUTSTANDING'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.OUTSTANDING}
                      disabled={true}
                    />
                  }
                />
              </div>
              <div className='w-full'>
              </div>
              <div className='w-full'>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-1' />
      {/* <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>DOKUMEN PENDUKUNG</div>
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
      </div> */}
    </div>
  )
}

export default EditRevenueStream