import React from 'react';
import './LoadingIndicator.scss';

const LoadingIndicator = () => (
  <div className="box__loading">
    <span className="item__text">Loading</span>
    <i className="item__loading-line">dot</i>
    <i className="item__loading-line">dot</i>
    <i className="item__loading-line">dot</i>
  </div>
);

export default LoadingIndicator;
