import { useEffect, useRef, useState } from 'react'
import { setDimensionHeight, setToggleSidebar } from '../../../redux/n2n/global';
import { useDispatch, useSelector } from 'react-redux';
import LogoPSD from '../../../assets/psd_logo_blue.svg'
import BtnDropdown from '../../../assets/btn_dropdown.svg'
import { decodeData } from '../../../global/helper/jwt';
import { getCookies, removeCookies } from '../../../global/helper/cookie';

const Header = () => {
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const { dimensionComponent, dimensionScreenW, toggleSidebar, check } = useSelector((state) => state.global)
  const [loginData, setLoginData] = useState({});
  useEffect(() => {
    const get = async () => {
      // const decode = await decodeData(localStorage.getItem('loginData'));
      const decode = await decodeData(getCookies('loginData'));
      setLoginData(decode);
    };
    get();
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      // eslint-disable-next-line no-inner-declarations
      function handleResize() {
        dispatch(setDimensionHeight(contentRef.current.offsetHeight))
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [dispatch, toggleSidebar]);

  return (
    <>
      <div ref={contentRef} className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : 'z-10'} fixed py-2 px-6 bg-base-100 shadow-lg`} style={{ width: '-webkit-fill-available' }}>
        <div className='flex flex-row justify-between'>
          <div className='flex gap-5'>
            <label htmlFor="left-sidebar-drawer" className="btn drawer-button" onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}>
              <div>
                <div className='burger-icon'></div>
                <div className='burger-icon'></div>
                <div className='burger-icon'></div>
              </div>
            </label>
            {(!toggleSidebar || (dimensionScreenW <= 767)) && (
              <div className='flex items-center'>
                {/* <LogoPSD /> */}
                <img src={LogoPSD}></img>
              </div>
            )}
          </div>
          {/* <h1 className="text-2xl font-semibold ml-2">{"pageTitle"}</h1> */}


          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex gap-3">
                <div className='btn btn-ghost btn-circle avatar'>
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                {dimensionScreenW > 767 && (
                  <>
                    <div>
                      <p className='font-semibold'>{loginData?.NAMA}</p>
                      <p className='text-xs font-medium'>{loginData?.NAMA_SUB}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                      {/* <BtnDropdown /> */}
                      <img src={BtnDropdown} />
                    </div>
                  </>
                )}
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <p className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </p>
                </li>
                <li><p>Settings</p></li>
                <li><p onClick={() => {
                  removeCookies('loginData');
                  removeCookies('accountAccess');
                  window.location.href = '/login'
                }}>Logout</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header