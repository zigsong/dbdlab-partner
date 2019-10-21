import React, { useState, useEffect } from 'react';
import './ToastAlert.scss';

const ToastAlert = (props) => {
  const { title, subtitle, isShow } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => { setActive(isShow); }, 100);
    setTimeout(() => { setActive(false); }, 1900);
  }, []);

  return (
    <div className={`box__alert${active ? ' alert' : ''}`}>
      <strong>{title}</strong>
      <span>{subtitle}</span>
    </div>
  );
};

export default ToastAlert;
