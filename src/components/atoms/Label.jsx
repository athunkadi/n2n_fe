import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';

const Label = ({ children, label, tooltip = false, positionTip, dataTip, data, required = false }) => {
  return (
    <label className='form-control'>
      <div className="label">
        <div>
          <span className="label-text text-base font-semibold">{label}</span>
          {tooltip && (
            <span className={`text-xs ml-1 tooltip tooltip-primary ${positionTip ? ('tooltip-' + positionTip) : ''}`} data-tip={dataTip}><FaInfoCircle /></span>
          )}
        </div>
      </div>
      {children}
      {!data && required && (
        <span className='ml-4 text-xs text-red-400'>*This field is required.</span>
      )}
    </label>
  )
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
  positionTip: PropTypes.string,
  dataTip: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object
  ]),
  required: PropTypes.bool
};

export default Label;