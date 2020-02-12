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
  readOnly,
}) => {
  const { onChange } = input;

  return (
    <span className={
    `box-input__text${!disabled && touched && error ? '--error' : ''}${active ? '--active' : ''}`
  }
    >
      <label htmlFor={label}>
        <input
          {...input}
          type={type === 'number' ? 'text' : type}
          placeholder={placeholder}
          ref={setRef}
          disabled={disabled}
          onChange={(event) => {
            if (type === 'number') {
              event.target.value = event.target.value.replace(/[^0-9]/g, '');
            }
            onChange(event);
          }}
          value={defaultValue !== undefined ? defaultValue : input.value}
          readOnly={readOnly !== undefined ? readOnly : false}
        />
      </label>
      {!disabled && touched && ((error && <span className="msg--error">{error}</span>) || (warning && <span className="msg--warning">{warning}</span>))}
    </span>
  );
};

export default FormInput;
