import React from 'react';
import './Checkbox.scss';

const Checkbox = ({
  input, checked, label, disabled, meta: { touched, error },
}) => (
  <span className="box-input__checkbox">
    <label htmlFor={input.name}>
      <input
        type="checkbox"
        defaultChecked={checked}
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
