import React from 'react';
import './FormTextArea.scss';

const FormTextArea = ({
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
}) => {
  const handleHeight = (e) => {
    const { target } = e;

    target.addEventListener('keydown', () => {
      target.style.cssText = `height: ${target.scrollHeight}px`;
    });
  };

  return (
    <span className={
      `box-textarea__text${touched && error ? '--error' : ''}${active ? '--active' : ''}`
    }
    >
      <label htmlFor={label}>
        <textarea
          rows="1"
          maxLength="100"
          {...input}
          type={type}
          placeholder={placeholder}
          ref={setRef}
          disabled={disabled}
          onChange={e => input.onChange(e, handleHeight(e))}
          value={defaultValue !== undefined ? defaultValue : input.value}
        />
      </label>
      {touched && ((error && <span className="msg--error">{error}</span>) || (warning && <span className="msg--warning">{warning}</span>))}
    </span>
  );
};

export default FormTextArea;
