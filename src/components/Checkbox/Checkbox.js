import React from 'react';
import './Checkbox.scss';

const Checkbox = ({
  input, checked, label, disabled,
}) => (
  <span className="box-input__checkbox">
    <label htmlFor={input.name}>
      <input
        type="checkbox"
        checked={checked}
        value={checked}
        disabled={disabled}
        // name={input.name}
        {...input}
      />
      {label}
    </label>
  </span>
);

export default Checkbox;
