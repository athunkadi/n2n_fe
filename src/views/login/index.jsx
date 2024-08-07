import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import storeSchema from '../../global/store';
import POTTER_LOGO from '../../assets/potter_logo.svg';
import BATIK from '../../assets/BATIK.png';
import BgModal from '../../assets/bg_modal.svg';
import PSD_LOGO from '../../assets/psd_logo_blue.svg';
import ShowIcon from '../../assets/icons/view.png';
import HideIcon from '../../assets/icons/hide.png';
import { decodeData, encodeData } from '../../global/helper/jwt';
import { getCookies, setCookies } from '../../global/helper/cookie';
import { Label, Modal } from '../../components/atoms';
import { setToggleModal } from '../../redux/n2n/global';
import { swal } from '../../global/helper/swal';
import { FaInfoCircle } from "react-icons/fa";

const Login = () => {
  document.title = 'POTTER | Login';
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const loginRef = useRef();
  const [width, setWidth] = useState(0);
  const [dataLogin, setDataLogin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState({});
  const [access, setAccess] = useState([]);
  const [form, setForm] = useState({
    application_id: '6018',
    user_name: "",
    user_password: "",
  });
  const getLoginData = getCookies('loginData');

  useEffect(() => {

    const get = async () => {
      const decode = await decodeData(getLoginData);
      setDataLogin(decode);
    };

    if (getLoginData) {
      get();
    }
  }, [getLoginData])

  const handleChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const dataEncode = await encodeData(form);
      const res = await storeSchema.actions.login(dataEncode);
      swal.close();
      if (res?.status === true) {
        if (res?.flag === true) {
          setAccess(res?.access);
        } else {
          setCookies('accountAccess', JSON.stringify(res?.access[0]));
          window.location.href = '/'
        }
        setCookies('loginData', res?.data);
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "selectRole" }));
      } else {
        swal.error(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleRole = (e) => {
    setRole(JSON.parse(e.target.value))
  };

//   const handleResize = (params) => {
//     setWidth(params)
//   }

  const backgroundStyle = {
    backgroundImage: `url(${PSD_LOGO}), url(${BATIK})`,
    backgroundSize: 'auto, 450px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '20px 20px, right calc(100% + 10px)'
  };

  useEffect(() => {
    if (loginRef.current) {

      // eslint-disable-next-line no-inner-declarations
      function handleResize() {
        setWidth(loginRef.current.offsetWidth)
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <Modal
        title={"LIST ROLES"}
        modal={"selectRole"}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => {
                setCookies('accountAccess', JSON.stringify(role));
                dispatch(setToggleModal({ isOpen: false, modal: "" }))
                window.location.href = '/'
              }}
              disabled={!role?.kode}
            >
              Done
            </button>
          </>
        }
      >
        <div className='relative'>
          {/* <BgModal width={'-webkit-fill-available'} /> */}
          <img src={BgModal} width={'-webkit-fill-available'} className='min-h-20'></img>
          <div className='absolute top-3 left-5 border-l-2 pl-5'>
            <h3 className="font-bold text-lg text-white">{dataLogin?.NAMA}</h3>
            <div className='flex gap-3 text-white items-center'>
              <p className="text-sm">{dataLogin?.USERNAME}</p>
              <span className="">|</span>
              <p className="text-sm">{dataLogin?.NAMA_SUB}</p>
            </div>
          </div>
          <div className='mt-3'>
            <Label
              label='Choose Your Roles :'
            >
                <select
                className='select select-sm w-full input-bordered rounded-[25px] bg-white'
                onChange={handleRole}
                >
                    <option value={JSON.stringify({ kode: '', uraian: '' })}></option>
                    {access?.map(data => {
                    return (
                        <option key={data.id} value={JSON.stringify(data)}>{data?.uraian}</option>
                    )
                    })}
                </select>
            </Label>
            {/* <Label
              label='Choose Your Roles :'
              children={
                <select
                  className='select select-sm w-full input-bordered rounded-[25px] bg-white'
                  onChange={handleRole}
                >
                  <option value={JSON.stringify({ kode: '', uraian: '' })}></option>
                  {access?.map(data => {
                    return (
                      <option key={data.id} value={JSON.stringify(data)}>{data?.uraian}</option>
                    )
                  })}
                </select>
              }
            /> */}
          </div>
        </div>
      </Modal>
      <div ref={loginRef} className='flex md:items-center md:justify-center center w-screen h-screen bg-base-100' style={backgroundStyle}>
        <div className="md:card w-full shadow-2xl bg-base-100" style={{ width: width < 768 ? width : '550px' }}>
          <div className="card-body">
            <div className="card-title justify-center">

              <img className='card-title justify-center' src={POTTER_LOGO}></img>
            </div>
            <form onSubmit={handleLogin}>
              <div className='flex flex-col p-5 gap-2'>
                <p className='text-2xl font-bold'>Sign In</p>
                <p className='flex text-sm'>Welcome back, Please login to your account. <span className="text-xs ml-1 tooltip tooltip-primary" data-tip="Gunakan akun portalsi untuk login ke aplikasi ini"><FaInfoCircle /></span></p>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-sm font-medium">Username</span>
                  </div>
                  <input name="user_name" type="text" placeholder="Username" className="input input-bordered rounded-[25px] px-3 py-2 text-base" onChange={handleChange} />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-sm font-medium">Password</span>
                  </div>
                  <div className='join items-center'>
                  <input name="user_password" type={showPassword ? "text" : "password"} placeholder="Password" className="input input-bordered rounded-[25px] px-3 py-2 text-base w-full" onChange={handleChange} />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute w-max right-6 eye-position z-50 pr-10"
                  >
                    {showPassword ? (
                      <img
                        width={24}
                        height={24}
                        src={ShowIcon}
                        alt="eye-logo"
                        className="cursor-pointer"
                      />
                    ) : (
                      <img
                        width={24}
                        height={24}
                        src={HideIcon}
                        alt="eye-logo"
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  </div>
                </label>

                <div className="flex justify-between my-1">
                  <label className="flex items-center gap-3 px-0 cursor-pointer">
                    <input type="checkbox" defaultChecked className="checkbox" />
                    <span className="">Remember me</span>
                  </label>
                </div>

                <button className="btn btn-primary rounded-[25px] text-white">Login</button>
                <div
                  className='underline text-red-500 ml-auto cursor-pointer hover:text-red-700'
                  onClick={() => window.open('https://portalsi.pelindo.co.id/Auth/ForgotPassword', '_blank')}
                >
                  Forgot Password?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login