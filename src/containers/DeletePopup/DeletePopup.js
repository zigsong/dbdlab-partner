/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PopupTemplate from 'components/PopupTemplate';
import {
  getAuthSelf,
  getAccount,
  putPasswordUpdate,
} from 'modules/auth';
import './DeletePopup.scss';

class DeletePopup extends Component {
  static defaultProps = {
    show: false,
  };

  componentDidMount() {
    const { props } = this;
    const authenticate = async () => {
      await props.getAuthSelf()
        .then((res) => {
          props.getAccount(res.data.id);
        });
    };

    authenticate();
  }

  render() {
    const {
      show, onPopup, handleDelete,
    } = this.props;

    return (
      <PopupTemplate isShow={show} title="계정 삭제">
        <div style={{ maxWidth: '218px' }}>
          <p>계정을 삭제하시겠습니까? 프로젝트, 테스트, 구매 내역 등의 데이터가 모두 유실될 수 있습니다. 또한 이 작업은 되돌릴 수 없습니다.</p>
        </div>
        <div className="form-pw" style={{ marginTop: '30px' }}>
          <button type="button" className="btn-cancle" onClick={() => onPopup(false)}>취소</button>
          <button type="submit" className="btn-submit--active" onClick={() => handleDelete()}>삭제</button>
        </div>
      </PopupTemplate>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    id,
    avatar_url,
    email,
    name,
    phone_number,
  } = state.auth.users;
  const { isOpen } = state.popup;

  return ({
    id,
    avatar_url,
    email,
    name,
    phone_number,
    isOpen,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getAccount: id => dispatch(getAccount(id)),
  putPasswordUpdate: (email, name, phone) => dispatch(putPasswordUpdate(email, name, phone)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletePopup);
