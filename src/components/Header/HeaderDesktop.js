/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'modules/auth';
import GlobalNav from './GlobalNav';
import LocalNav from './LocalNav';
import './HeaderDesktop.scss';

class HeaderDesktop extends Component {
  mounted = false;

  state = {
    isExtended: false,
  };

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      const el = document.querySelectorAll('.header')[0];

      this.setState({ top: el.offsetTop, height: el.offsetHeight });
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('onload', this.handleScroll);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState({ isExtended: false });
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('onload', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({ scroll: window.scrollY });

    const el = document.querySelectorAll('.contents')[0];
    const header = document.querySelectorAll('.header')[0];
    const { scroll, top, height } = this.state;
    const { isHeaderfixed } = this.props;

    if (scroll > (top + height)) {
      el.style.paddingTop = `${height}px`;
      header.className = 'header header--sticky';
    } else {
      el.style.paddingTop = 0;
      header.className = isHeaderfixed ? 'header header--fixed' : 'header';
    }
  }

  handleBlur = (e) => {
    e.preventDefault();

    if (this.mounted) {
      setTimeout(() => {
        this.setState(prevState => ({
          isExtended: !prevState.isExtended,
        }));
      }, 500);
    }
  }

  render() {
    const {
      global,
      avatar_url,
      projectName,
      dispatch,
    } = this.props;
    const { isExtended } = this.state;

    return (
      <header className="header">
        <div className="header-inner">
          <div className="wrapper">
            {
              global
                ? <GlobalNav />
                : <LocalNav projectName={projectName} />
            }
            <section className="header__profile">
              {avatar_url !== ''
                ? (
                  <>
                    <button
                      className={`btn${isExtended ? '--active' : ''}`}
                      type="button"
                      onClick={() => this.setState(prevState => ({
                        isExtended: !prevState.isExtended,
                      }))}
                      onBlur={e => this.handleBlur(e)}
                    >
                      <i className="btn__icon">
                        {avatar_url !== '' ? <img src={avatar_url} alt="프로필" /> : '🙂' }
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
          </div>
        </div>
      </header>
    );
  }
}

export default connect()(HeaderDesktop);
