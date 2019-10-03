import React from 'react';
import './ToastAlert.scss';

const ToastAlert = (props) => {
  const { title, subtitle, isShow } = props;

  return (
    <div className={`box__alert${isShow ? ' alert' : ''}`}>
      <strong>{title}</strong>
      <span>{subtitle}</span>
    </div>
  );
};

export default ToastAlert;
