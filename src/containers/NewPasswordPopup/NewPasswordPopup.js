/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PopupTemplate from 'components/PopupTemplate';
import {
  getAuthSelf,
  getAccount,
  putPasswordUpdate,
} from 'modules/auth';
import PasswordForm from './PasswordForm';
import './NewPasswordPopup.scss';

class NewPasswordPopup extends Component {
  static defaultProps = {
    show: false,
  };

  componentDidMount() {
    const { props } = this;
    const authenticate = async () => {
      await props.getAuthSelf()
        .then((res) => {
          console.log(res);
          props.getAccount(res.data.id);
        });
    };

    authenticate();
  }

  render() {
    const {
      show,
      onPopup,
      id,
      email,
    } = this.props;

    return (
      <PopupTemplate isShow={show} title="비밀번호 수정">
        <PasswordForm
          onPopup={onPopup}
          onSubmit={this.onSubmit}
          accountInfo={{ id, email }}
        />
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
)(NewPasswordPopup);
