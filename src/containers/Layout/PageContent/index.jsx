import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import routes from '../../../routes'
import Header from '../Header';
import Page404 from '../../../views/404'
import { setDimensionWidth } from '../../../redux/n2n/global';

const PageContent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainContentRef = useRef(null);
    const { dimensionComponent, toggleSidebar } = useSelector(state => state.global);
    document.title = "POTTER " + (location?.state?.menu?.name ? ("| " + location?.state?.menu?.name) : '') + (location?.state?.menu?.submenu?.name ? ` - ${location?.state?.menu?.submenu?.name}` : "");

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [])

    useEffect(() => {
        if (mainContentRef.current) {
            // eslint-disable-next-line no-inner-declarations
            function handleResize() {
                dispatch(setDimensionWidth(mainContentRef.current.offsetWidth))
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [dispatch, toggleSidebar]);


    return (
        <div className="drawer-content flex flex-col ">
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-y-auto pt-0 px-0" style={{ marginTop: dimensionComponent.height }} ref={mainContentRef}>
                {/* <Suspense fallback={<SuspenseContent />}> */}
                <Routes>
                    {
                        routes.map((route, key) => {
                            return (
                                <Route
                                    key={key}
                                    exact={true}
                                    path={`${route.path}`}
                                    element={<route.component />}
                                />
                            )
                        })
                    }

                    {/* Redirecting unknown url to 404 page */}
                    <Route path="*" element={<Page404 />} />
                </Routes>
                {/* </Suspense> */}
            </main>
        </div>
    )
}

export default PageContent