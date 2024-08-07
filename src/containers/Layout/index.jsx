import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageContent from './PageContent'
import Sidebar from './sidebar/Sidebar'
import { setCheck, setDimensionScreenW, setMenu } from '../../redux/n2n/global';
import store from '../../global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookies } from '../../global/helper/cookie';
import { swal } from '../../global/helper/swal';

const Layout = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const layoutRef = useRef();
  const { dimensionScreenW, toggleSidebar, check, menu } = useSelector((state) => state.global)
  // const loginData = localStorage.getItem("loginData");
  const loginData = getCookies("loginData");
  const accountAccess = getCookies("accountAccess");

  useEffect(() => {
    if (!loginData || !accountAccess) {
      navigation('/login');
    } else {
      if (menu && (!location?.state)) {
        navigation(menu[0]?.path, menu[0])
      }
    }
  }, [loginData, accountAccess, location?.state, menu, navigation])

  useEffect(() => {
    const get = async () => {
      swal.loading()
      try {
        const res = await store.actions.getListMenu(accountAccess?.kode);
        if (res?.message === 'Success') {
          swal.close()
          dispatch(setMenu(res?.data?.menu));
        } else {
          swal.error(res?.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (loginData && accountAccess) {
      get();
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (layoutRef.current) {
      // eslint-disable-next-line no-inner-declarations
      function handleResize() {
        dispatch(setDimensionScreenW(layoutRef.current.offsetWidth))
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [dispatch, toggleSidebar]);

  return (
    <>
      <div className="drawer md:drawer-open" ref={layoutRef}>
        <input id="left-sidebar-drawer" type="checkbox" onChange={() => { if (dimensionScreenW < 768) dispatch(setCheck(!check)) }} className="drawer-toggle" checked={check} />
        <Sidebar />
        <PageContent />
      </div>
    </>
  )
}

export default Layout