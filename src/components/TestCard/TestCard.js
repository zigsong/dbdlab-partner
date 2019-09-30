import React from 'react';
import { Link } from 'react-router-dom';
import './TestCard.scss';

const TestCard = (props) => {
  const setStepState = (step, manager) => {
    switch (step) {
      case 'apply':
        return (
          <span className="test__state">매니저 배정중</span>
        );
      case 'register':
        return (
          <span className="test__state--on">
            {manager !== null ? `${manager}매니저` : '매니저 배정중' }
          </span>
        );
      case 'payment':
      case 'testing':
      case 'completed':
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

  const {
    tId,
    pId,
    tTitle,
    step,
    staff,
    createDate,
  } = props;

  return (
    <Link to={`/project/${pId}/test/${tId}`} key={tId} className="test">
      <div className="card-test" key={tId}>
        <p className="card-test__test">
          {setStepState(step, staff)}
          <span className="test__title">{tTitle}</span>
        </p>
        <p className="card-test__info">{getDate(createDate)}</p>
      </div>
    </Link>
  );
};

export default TestCard;
