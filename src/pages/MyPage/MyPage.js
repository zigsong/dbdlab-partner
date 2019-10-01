/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import {
  getAuthSelf,
  getAccount,
  postAvatarUpdate,
  patchAccountUpdate,
} from 'modules/auth';
import { togglePopup } from 'modules/popup';
import LoadingIndicator from 'components/LoadingIndicator';
import PageTemplate from 'containers/PageTemplate';
import NewPasswordPopup from 'containers/NewPasswordPopup';
import FormInput from 'components/FormInput';
import './MyPage.scss';

const nameRequired = value => (value ? undefined : '이름을 입력해주세요');
const nameLength = value => (parseInt(value.length, 10) > 64 ? '이름이 너무 길어요' : undefined);
const phoneNumRequired = value => (value ? undefined : '연락처를 입력해주세요');
const phoneNumRegexp = value => (value && !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(value) ? '연락처 형식을 다시 확인해주세요' : undefined);

class MyPage extends Component {
  state = {
    isLoading: false,
    isProfileTab: true,
    onEdit: false,
    selectedFile: null,
  }

  componentDidMount() {
    const { props } = this;
    const authenticate = async () => {
      await props.getAuthSelf()
        .then((res) => {
          console.log(res);
          props.getAccount(res.data.id);
        });
    };

    this.setState({ isLoading: true });
    authenticate()
      .then(this.setState({ isLoading: false }));
  }

  // eslint-disable-next-line consistent-return
  handleFileInput = (e) => {
    const { props } = this;
    const formData = new FormData();

    if (!e.target.files[0]) return false;

    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      const { selectedFile } = this.state;
      formData.append('file', selectedFile);
      props.postAvatarUpdate(formData)
        .then(res => console.log(res))
        .catch((err) => {
          console.log(err);
          alert('이미지 파일을 선택해 주세요:)');
        });
    });
  }

  handleTabToggle = () => {
    this.setState(prevState => ({
      isProfileTab: !prevState.isProfileTab,
    }));
  }

  handleEdit = () => {
    this.setState(prevState => ({
      onEdit: !prevState.onEdit,
    }));
  }

  handlePwPopup = (e) => {
    const { props } = this;

    e.preventDefault();
    props.togglePopup(true);
  }

  onReset = () => {
    const { reset, onPopup } = this.props;
    reset();
    onPopup(false);
  }

  onSubmit = (values) => {
    const { props, handleEdit } = this;
    const { id, email } = props;
    const { name, phone } = values;
    console.log('submit');
    console.log(values);

    props.patchAccountUpdate(
      id,
      email,
      name,
      phone,
    ).then(() => {
      handleEdit();
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      alert('입력하신 정보를 다시 확인해 주세요 :(');
    });
  }

  render() {
    const {
      avatar_url,
      email,
      prevName,
      togglePopup,
      isOpen,
      handleSubmit,
      fieldValues,
    } = this.props;
    const name = fieldValues !== undefined ? fieldValues.name : undefined;
    const phone = fieldValues !== undefined ? fieldValues.phone : undefined;
    const { isProfileTab, isLoading, onEdit } = this.state;
    const {
      handleFileInput,
      handleTabToggle,
      handleEdit,
      handlePwPopup,
      onSubmit,
      onReset,
    } = this;
    const teamList = [
      'abc', 'def', 'ghi', 'jkl',
    ];
    const logList = [
      {
        activity: '님이 ‘리뷰남기기v1.2’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘디비디랩’ 팀에 소속되었습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘더 테스터’ 프로젝트를 생성했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.3’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.4’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.5’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.6’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
    ];

    return (
      isLoading
        ? <LoadingIndicator />
        : (
          <PageTemplate>
            <section className="contents__account">
              <div className="contents-inner">
                <ul className="account__tablist">
                  <li className={`tablist__item${isProfileTab ? '--active' : ''}`}>
                    <button type="button" className="btn-tab" onClick={() => handleTabToggle()}>Profile</button>
                  </li>
                  <li className={`tablist__item${isProfileTab ? '' : '--active'}`}>
                    <button type="button" className="btn-tab" onClick={() => handleTabToggle()}>Payment</button>
                  </li>
                </ul>
                {isProfileTab
                  ? (
                    <div className="account__info">
                      <section className="info__profile">
                        <h2 className="info__title--hidden">Account</h2>
                        <form className="profile__image" encType="multipart/form-data">
                          <span className="box-image">
                            <img src={avatar_url} alt="프로필" />
                          </span>
                          <span className="box-input">
                            <label htmlFor="profile">
                              <input type="file" name="profile" onChange={e => handleFileInput(e)} />
                            </label>
                          </span>
                        </form>
                        <span className="profile__desc">
                          <strong className="desc__name">
                            {prevName !== undefined && prevName !== ''
                              ? prevName
                              : email.substring(0, email.indexOf('@'))
                            }
                          </strong>
                          <button type="button" className="btn-edit" onClick={() => handleEdit()}>Edit profile</button>
                          <span className="desc__mail">{email}</span>
                        </span>
                      </section>
                      {onEdit
                        ? (
                          <form className="form-account" onSubmit={handleSubmit(values => onSubmit(values))}>
                            <section className="form__section">
                              <p className="form__data-wrapper">
                                <span className="wrapper__title">
                                  <strong className="title">이름*</strong>
                                </span>
                                <Field
                                  name="name"
                                  type="text"
                                  label="name"
                                  placeholder="텍스트 입력"
                                  component={FormInput}
                                  validate={[nameRequired, nameLength]}
                                />
                              </p>
                              <p className="form__data-wrapper">
                                <span className="wrapper__title">
                                  <strong className="title">연락처*</strong>
                                </span>
                                <Field
                                  name="phone"
                                  type="tel"
                                  label="phone"
                                  placeholder="‘-’ 제외하고 입력"
                                  component={FormInput}
                                  validate={[phoneNumRequired, phoneNumRegexp]}
                                />
                              </p>
                            </section>
                            <section className="form__section">
                              <p className="form__data-wrapper">
                                <span className="wrapper__title">
                                  <strong className="title">비밀번호</strong>
                                </span>
                                <button type="button" className="btn-changePw" onClick={e => handlePwPopup(e)}>비밀번호 수정</button>
                              </p>
                            </section>
                            <div className="form__btn-wrapper">
                              <button type="button" className="btn-cancle" onClick={() => handleEdit()}>취소</button>
                              <button type="submit" className={`btn-submit${name !== undefined && name !== '' && phone !== undefined && phone !== '' ? '--active' : ''}`}>확인</button>
                            </div>
                          </form>
                        )
                        : (
                          <>
                            <section className="info__teams">
                              <h2 className="info__title">Teams</h2>
                              <ul className="teams__list">
                                {teamList.map(t => (
                                  <li className="list__item" key={t}>
                                    <Link to="/test">{t}</Link>
                                  </li>
                                ))}
                              </ul>
                            </section>
                            <section className="info__activity">
                              <h2 className="info__title">Activity</h2>
                              <ul className="activity__list">
                                {logList.map(l => (
                                  <li className="list__item" key={l.activity}>
                                    <div className="box-item">
                                      <span className="box-image">
                                        <img src={avatar_url} alt="프로필" />
                                      </span>
                                      <p className="box-text">
                                        <span className="text__activity">
                                          <strong className="name">
                                            {prevName !== undefined && prevName !== ''
                                              ? prevName
                                              : email.substring(0, email.indexOf('@'))
                                            }
                                          </strong>
                                          <span className="activity">{l.activity}</span>
                                        </span>
                                        <span className="text__date">{l.date}</span>
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          </>
                        )
                      }
                    </div>
                  )
                  : (
                    <div className="payment__info">
                      <div className="wrapper-inner">
                        <ul className="info__list">
                          <li className="list__item">
                            <div className="box-payment">
                              <span className="payment__title">단일구매</span>
                              <strong className="payment__plan">PLAN 01</strong>
                              <span className="payment__step">테스트 진행 중</span>
                            </div>
                            <div className="box-paid">
                              <strong className="paid__total">
                                222500
                                <i>원</i>
                              </strong>
                              <span className="paid__date">
                                <span>구매일자: </span>
                                2019. 7. 23.
                              </span>
                            </div>
                          </li>
                          <li className="list__item">
                            <div className="box-payment">
                              <span className="payment__title">단일구매</span>
                              <strong className="payment__plan">PLAN 01</strong>
                              <span className="payment__step">테스트 진행 중</span>
                            </div>
                            <div className="box-paid">
                              <strong className="paid__total">
                                222500
                                <i>원</i>
                              </strong>
                              <span className="paid__date">
                                <span>구매일자: </span>
                                2019. 7. 23.
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )
                }
              </div>
            </section>
            <NewPasswordPopup show={isOpen} onPopup={togglePopup} handleSubmit={handleSubmit} />
          </PageTemplate>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const {
    id,
    avatar_url,
    email,
    phone_number,
  } = state.auth.users;
  const prevName = state.auth.users.name;
  const { isOpen } = state.popup;
  const initData = {
    name: prevName,
    phone: phone_number,
  };
  const fieldValues = getFormValues('accountForm')(state);

  return ({
    id,
    avatar_url,
    email,
    prevName,
    phone_number,
    initialValues: initData,
    isOpen,
    fieldValues,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getAccount: id => dispatch(getAccount(id)),
  postAvatarUpdate: file => dispatch(postAvatarUpdate(file)),
  patchAccountUpdate: (
    id,
    email,
    name,
    phone,
  ) => dispatch(patchAccountUpdate(
    id,
    email,
    name,
    phone,
  )),
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'accountForm',
  enableReinitialize: true,
})(MyPage));
