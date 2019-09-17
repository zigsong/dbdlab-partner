import React from 'react';
import { Link } from 'react-router-dom';

const GlobalNav = (props) => {
  const { projectName } = props;

  return (
    <section className="header__nav nav-local">
      <Link to="/" className="btn__back">
        <i className="icon">돌아가기</i>
        <span className="text">
          <span className="name__company">{projectName}</span>
          의 사용성테스트
        </span>
      </Link>
    </section>
  );
};

export default GlobalNav;
