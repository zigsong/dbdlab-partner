import React from 'react';
import { Link } from 'react-router-dom';
import './TestCard.scss';

const TestCard = (props) => {
  const setStepState = (step, staff) => {
    const setManagerName = () => {
      let name;
      if (staff !== null) {
        name = staff.name !== '' ? `${staff.name}매니저` : `${staff.email.substring(0, staff.email.indexOf('@'))}매니저`;
      } else {
        name = '매니저 배정중';
      }

      return name;
    };

    switch (step) {
      case 'apply':
        return (
          <span className="test__state">매니저 배정중</span>
        );
      case 'register':
        return (
          <span className="test__state--on">
            {setManagerName()}
          </span>
        );
      case 'payment':
      case 'testing':
      case 'completed':
        return (
          <span className="test__state--off">
            {setManagerName()}
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
