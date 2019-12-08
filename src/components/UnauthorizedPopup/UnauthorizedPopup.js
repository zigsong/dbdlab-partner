import React from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PopupTemplate from 'components/PopupTemplate';
import { togglePopup } from 'modules/popup';
import config from 'modules/config';
import './UnauthorizedPopup.scss';

const UnauthorizedPopup = (props) => {
  const redirect = () => {
    const { inviteToken, pId, tId } = props;
    const { protocol } = window.location;
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') >= 0);
    const deleteTokenCookie = () => new Promise(() => {
      if (hasTokenCookie !== undefined) {
        Cookies.remove('token');
      }
    });

    if (inviteToken !== undefined && inviteToken !== '') {
      if (inviteToken.includes('user_email') && pId === undefined) {
        // voucher mypage
        const inviteEmail = inviteToken.substring(12);

        deleteTokenCookie().then(
          window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login/?&user_email=${inviteEmail}&project_id=`),
        );
      } else if (pId > 0 && pId !== '' && pId !== undefined && tId === undefined) {
        // invite team
        deleteTokenCookie().then(
          window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login/${inviteToken}&project_id=${pId}`),
        );
      }
    } else if ((pId && tId) > 0 && tId !== undefined) {
      // test
      deleteTokenCookie().then(
        window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login/?test_id=${tId}&project_id=${pId}`),
      );
    } else {
      deleteTokenCookie().then(
        window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login`),
      );
    }
  };

  return (
    <PopupTemplate isShow title="Login Failed :(">
      <p className="box-popup__unauthorized">
        회원가입 또는
        <br />
        로그인이 필요합니다.
        <br />
        <button type="button" onClick={() => redirect()}>확인</button>
      </p>
    </PopupTemplate>
  );
};

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => (dispatch(togglePopup(isOpen))),
});

export default connect(
  null,
  mapDispatchToProps,
)(UnauthorizedPopup);
