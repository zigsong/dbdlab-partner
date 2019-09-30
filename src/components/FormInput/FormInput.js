import React from 'react';
import './FormInput.scss';

const FormInput = ({
  input,
  type,
  label,
  placeholder,
  disabled,
  defaultValue,
  meta: {
    active, touched, error, warning,
  },
  setRef,
}) => (
  <span className={
    `box-input__text${touched && error ? '--error' : ''}${active ? '--active' : ''}`
  }
  >
    <label htmlFor={label}>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        ref={setRef}
        disabled={disabled}
        value={defaultValue !== undefined ? defaultValue : input.value}
      />
    </label>
    {touched && ((error && <span className="msg--error">{error}</span>) || (warning && <span className="msg--warning">{warning}</span>))}
  </span>
);

export default FormInput;
