import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";

const Select = (props) => {
  const {
    id,
    onChange,
    value,
    options,
    defaultValue,
    isDisabled,
    className,
    ...rest
  } = props;
  const { dimensionScreenW, check } = useSelector((state) => state.global)
  return (
    <ReactSelect
      id={id}
      onChange={onChange}
      value={value}
      options={options}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      className={`${className} ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}
      styles={{
        control: (provided, state) => ({
          ...provided,
          height: '3rem',
          borderRadius: "25px",
          ...(state.isDisabled && {
            backgroundColor: '#DFDFDF',
          }),
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "25px",
          zIndex: 2
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: "25px",
        }),
        valueContainer: (provided) => ({
          ...provided,
          height: '3rem',
          borderRadius: "25px",
          alignContent: 'center',
          paddingLeft: '1rem',
        }),
      }}
      {...rest}
    />
  );
};

Select.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.object,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;