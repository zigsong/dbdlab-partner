import React from 'react';
import './PopupTemplate.scss';

const PopupTemplate = ({ isShow, title, children }) => (
  <div className={`popup${isShow ? '' : '--hidden'}`}>
    <section className="box-popup">
      <h1 className="popup__title">{title}</h1>
      <div className="popup__contents">
        {children}
      </div>
    </section>
  </div>
);

export default PopupTemplate;
