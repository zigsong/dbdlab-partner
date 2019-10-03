/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'modules/auth';
import GlobalNav from './GlobalNav';
import LocalNav from './LocalNav';
import './HeaderDesktop.scss';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const [isExtended, setExtended] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const handleBlur = (e) => {
    e.preventDefault();
    if (isMounted) {
      setTimeout(() => {
        setExtended(false);
      }, 200);
    }

    return false;
  };

  useEffect(() => {
    setMounted(true);
    setExtended(false);

    return () => {
      setMounted(false);
      setExtended(false);
    };
  }, []);

  const { profile } = props;

  return (
    <section className="header__profile">
      {profile !== ''
        ? (
          <>
            <button
              className={`btn${isExtended ? '--active' : ''}`}
              type="button"
              onClick={() => setExtended(!isExtended)}
              onBlur={e => handleBlur(e)}
            >
              <i className="btn__icon">
                {profile !== '' ? <img src={profile} alt="프로필" /> : '🙂' }
                <span className="btn__text">프로필</span>
              </i>
            </button>
            <ul className={`profile__list${isExtended ? '--extended' : ''}`}>
              <li className="list__item"><Link to="/my">마이페이지</Link></li>
              <li className="list__item"><button type="button" onClick={() => { dispatch(logout()); }}>로그아웃</button></li>
            </ul>
          </>
        )
        : null}
    </section>
  );
};

const HeaderDesktop = (props) => {
  const { global, avatar_url, projectName } = props;

  return (
    <header className="header">
      <div className="header-inner">
        <div className="wrapper">
          {
            global
              ? <GlobalNav />
              : <LocalNav projectName={projectName} />
          }
          <UserProfile profile={avatar_url} />
        </div>
      </div>
    </header>
  );
};

export default HeaderDesktop;
