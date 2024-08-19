import { useDispatch, useSelector } from 'react-redux'
import { setToggleModal } from '../../redux/n2n/global';

const Modal = ({
  // eslint-disable-next-line react/prop-types
  closeToggle = true, children, title, modal, size, buttonFooter = <button className="btn">Close</button>,
}) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  return (
    <dialog className={`modal ${toggleModal?.isOpen && (toggleModal?.modal === modal) ? 'modal-open' : ''} text-left`}>
      <div className={`modal-box bg-white ${size === 'fullscreen' ? 'max-w-screen-2xl' : size}`}>
        <p className='text-lg font-bold'>{title}&nbsp;</p>
        <hr className='my-3' />
        <div className='overflow-y-auto max-h-96 p-3'>
          {children}
        </div>
        <hr className='my-3' />
        <div className="modal-action">
          <form method="dialog" onSubmit={() => dispatch(setToggleModal({ isOpen: false, modal: '' }))}>
            {closeToggle && (
              <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button>
            )}
            {/* if there is a button, it will close the modal */}
            {buttonFooter}
            {/* <button className="btn ml-3">check</button> */}
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default Modal