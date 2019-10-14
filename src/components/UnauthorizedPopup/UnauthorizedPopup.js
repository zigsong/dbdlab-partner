import React from 'react';
import { connect } from 'react-redux';
import PopupTemplate from 'components/PopupTemplate';
import { togglePopup } from 'modules/popup';
import './UnauthorizedPopup.scss';

const UnauthorizedPopup = (props) => {
  const redirect = () => {
    const { inviteToken, pId } = props;
    const { protocol } = window.location;
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
    const deleteTokenCookie = () => new Promise(() => {
      if (hasTokenCookie !== undefined) {
        const setTokenCookie = (expireDate) => {
          const date = new Date();
          date.setTime(date.getTime() + expireDate * 24 * 60 * 60 * 1000);
          document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=realdopt.com`;
          // document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=localhost`;
        };
        setTokenCookie(-1);
      }
    });

    console.log(inviteToken);

    if (inviteToken !== undefined) {
      deleteTokenCookie().then(
        window.location.assign(`${protocol}//${process.env.REACT_APP_COMPANY_URL}/login/${inviteToken}&project_id=${pId}`),
      );
    } else {
      deleteTokenCookie().then(
        window.location.assign(`${protocol}//${process.env.REACT_APP_COMPANY_URL}/login`),
      );
    }
  };

  return (
    <PopupTemplate isShow title="Login Failed">
      <p className="box-popup__unauthorized">
        로그인이 필요합니다.
        <br />
        다시 로그인 해 주세요 :)
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
