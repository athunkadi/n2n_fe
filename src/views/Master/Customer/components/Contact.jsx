import React, { useEffect, useState } from 'react'
import storeSchema from '@global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from '@global/helper/swal';
// import CurrencyInput from 'components/atoms/CurrencyInput';
import { IoMdTrash } from 'react-icons/io';

const Contact = ({ location, data, getDetailCustomer }) => {
  let customer_id = location?.state?.data?.customer_id
  const dummyField = {
    customer_contact_id: "",
    nama_contact: "",
    address: "",
    email: "",
    phone: "",
    jabatan: "",
    gender: "",
    birthdate: "",
    membawahi: "",
    description: "",
    customer_id: customer_id,
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['Nama', 'Alamat', 'Email', 'Phone', 'Jabatan', 'Gender', 'Tanggal Lahir', 'Membawahi', 'Deskripsi','']
  const [dataFields, setDataFields] = useState([dummyField]);

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
    const contactCust = data?.CONTACT_CUSTOMER;
    if (contactCust?.length > 0) {
      const newData = contactCust?.map((value) => {
        return {
          customer_contact_id: value?.CUSTOMER_CONTACT_ID,
          nama_contact: value?.NAMA_CONTACT,
          address: value?.ADDRESS,
          email: value?.EMAIL,
          phone: value?.PHONE,
          jabatan: value?.JABATAN,
          gender: value?.GENDER,
          birthdate: value?.BIRTHDATE?.substring(0, 10),
          membawahi: value?.MEMBAWAHI,
          description: value?.DESCRIPTION,
          customer_id: value?.CUSTOMER_ID,
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
        const res = await storeSchema.actions.deleteContactCustomer(targetValue?.customer_contact_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailCustomer();
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
        nama_contact: value?.nama_contact,
        address: value?.address,
        email: value?.email,
        phone: value?.phone,
        jabatan: value?.jabatan,
        gender: value?.gender,
        birthdate: value?.birthdate?.substring(0, 10),
        membawahi: value?.membawahi,
        description: value?.description,
        customer_id: data?.CUSTOMER_ID,
      };

      const res = await storeSchema.actions.insertContactCustomer(payload);
      if (res?.status === true) {
        await swal.success(res?.message);
      } else {
        await swal.error(res?.message);
      };
      getDetailCustomer();
    } catch (error) {
      console.error(error);
    };
  };

  console.log('dataFields', dataFields);

  return (
    <>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Contact Customer</div>
        <div className='card-body'>
          <div className='min-w-6xl overflow-auto'>
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
                    <td className='min-w-48'>
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='nama_contact'
                        value={item?.nama_contact}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-60'>
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='address'
                        value={item?.address}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-48'>
                      <input
                        type="email"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='email'
                        value={item?.email}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-40'>
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='phone'
                        value={item?.phone}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-52'>
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='jabatan'
                        value={item?.jabatan}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-36'>
                      <select
                        name={"gender"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.gender}
                        disabled={item?.status?.canDelete}
                      >
                        <option key={0} value=""></option>
                        <option key={1} value="L" >Laki-Laki</option>
                        <option key={2} value="P" >Perempuan</option>
                      </select>
                    </td>
                    <td className='min-w-40'>
                      <input
                        type="date"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='birthdate'
                        value={item?.birthdate}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-60'>
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='membawahi'
                        value={item?.membawahi}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className="min-w-60">
                      <input
                        type="text"
                        className="input w-full input-sm input-bordered rounded-[25px] bg-white"
                        name='description'
                        value={item?.description}
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
                      />
                    </td>
                    <td className='min-w-30'>
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