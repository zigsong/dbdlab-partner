import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TestCard.scss';

const TestCard = (props) => {
  const setStepState = (step, manager) => {
    switch (step) {
      case 'APPLY':
        return (
          <span className="test__state">매니저 배정중</span>
        );
      case 'REGISTER':
        return (
          <span className="test__state--on">
            {manager !== null ? `${manager}매니저` : '매니저 배정중' }
          </span>
        );
      case 'PAYMENT':
      case 'TESTING':
      case 'COMPLETED':
        return (
          <span className="test__state--off">
            {manager !== null ? `${manager}매니저` : '매니저 배정중' }
          </span>
        );
      default:
        return (
          <span className="test__state">매니저 배정중</span>
        );
    }
  };
  const getDate = (value) => {
    const getValue = new Date(value);
    const day = getValue.getDate();
    const month = getValue.getMonth() + 1;
    const year = getValue.getFullYear();
    const date = `${year}. ${month} .${day}`;

    return date;
  };

  const { test, pId } = props;

  return (
    Object.keys(test).map(t => (
      <Link to={`/project/${pId}/test/${test[t].id}`} key={test[t].id} className="test">
        <div className="card-test" key={test[t].id}>
          <p className="card-test__test">
            {setStepState(test[t].step, test[t].staff)}
            <span className="test__title">{test[t].title}</span>
          </p>
          <p className="card-test__info">{getDate(test[t].created_at)}</p>
        </div>
      </Link>
    ))
  );
};

export default TestCard;
