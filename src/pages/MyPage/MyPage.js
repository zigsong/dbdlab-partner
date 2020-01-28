/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import {
  getAuthSelf,
  getAccount,
  postAvatarUpdate,
  patchAccountUpdate,
} from 'modules/auth';
import config from 'modules/config';
import { togglePopup } from 'modules/popup';
import { getProjectList } from 'modules/project';
import { getVoucherOrderList, getTestOrderList } from 'modules/order';
import { getNotifications } from 'modules/notification';
import PageTemplate from 'containers/PageTemplate';
import NewPasswordPopup from 'containers/NewPasswordPopup';
import OrderConfirmPopup from 'containers/OrderConfirmPopup';
import UnauthorizedPopup from 'components/UnauthorizedPopup';
import LoadingIndicator from 'components/LoadingIndicator';
import ToastAlert from 'components/ToastAlert';
import FormInput from 'components/FormInput';
import './MyPage.scss';

const nameRequired = value => (value ? undefined : '이름을 입력해주세요');
const nameLength = value => (parseInt(value.length, 10) > 10 ? '이름이 너무 길어요' : undefined);
const phoneNumRequired = value => (value ? undefined : '연락처를 입력해주세요');
const phoneNumRegexp = value => (value && !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(value) ? '연락처 형식을 다시 확인해주세요' : undefined);

class MyPage extends Component {
  state = {
    isLoading: false,
    isAuthError: false,
    isProfileTab: true,
    onEdit: false,
    selectedFile: null,
    projectList: [],
    activityList: [],
    voucherList: [],
    testList: [],
    toastTitle: '',
    toastSubtitle: '',
    isToastShow: false,
    isPwShow: false,
    isBillShow: false,
    billIdx: 0,
  }

  componentDidMount() {
    const { props } = this;
    const { match, location } = props;
    const { path } = match;
    const { protocol } = window.location;
    const { search } = location;
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') >= 0);

    const deleteTokenCookie = () => new Promise(() => {
      if (hasTokenCookie !== undefined) {
        const setTokenCookie = (expireDate) => {
          const date = new Date();
          date.setTime(date.getTime() + expireDate * 24 * 60 * 60 * 1000);
          Cookies.remove('token', {
            domain: process.env.REACT_APP_DEPLOY_ENV === 'LOCAL' ? undefined : 'realdopt.com',
            path: process.env.REACT_APP_DEPLOY_ENV === 'LOCAL' ? undefined : '/'
          });
        };
        setTokenCookie(-1);

        alert('바우처를 구매하신 계정으로 로그인 해주세요 :)');
      } else {
        console.log('not logged in');
        alert('바우처를 구매하신 계정으로 로그인 해주세요 :)');
      }
    });
    const authenticate = async () => {
      await props.getAuthSelf()
        .then((res) => {
          props.getAccount(res.data.id);
        });
      await props.getProjectList()
        .then((res) => {
          this.setState({ projectList: res.data.results });
        });
      await props.getNotifications()
        .then(() => {
          const { notiList } = this.props;
          if (notiList.length > 10) notiList.splice(10);
          this.setState({ activityList: notiList });
        });
      await props.getVoucherOrderList()
        .then(() => {
          const { voucherList } = this.props;
          this.setState({ voucherList });
        });
      await props.getTestOrderList()
        .then(() => {
          const { testList } = this.props;
          this.setState({ testList });
        });
    };

    this.setState({ isLoading: true });
    authenticate()
      .then(() => {
        if (path === '/my/payment') {
          const { email } = this.props;
          const inviteEmail = search.includes('user_email') ? search.split('=')[1] : '';

          if (search.includes('user_email') && inviteEmail !== email) {
            deleteTokenCookie().then(
              window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login/?&user_email=${inviteEmail}&project_id=`),
            );
          }

          this.setState({
            isProfileTab: false,
          });
        }

        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        // const { status } = err.response;
        console.log(err.response);
        const stat = err.response.status !== undefined ? err.response.status : undefined;
        if (stat !== undefined && stat === 401) {
          this.setState({
            isLoading: false,
            isAuthError: true,
          });
        }
      });
  }

  getDate = (value) => {
    const getValue = new Date(value);
    const day = getValue.getDate();
    const month = getValue.getMonth() + 1;
    const year = getValue.getFullYear();
    const date = `${year}. ${month} .${day}`;

    return date;
  };

  setPaymentStep = (voucherAmount, testStep) => {
    let text;
    if (voucherAmount > 0) {
      text = `${voucherAmount}개`;
    } else {
      switch (testStep) {
        case undefined:
          text = '';
          break;
        case 'APPLY':
          text = '테스트 작성중';
          break;
        case 'REGISTER':
          text = '신청 대기중';
          break;
        case 'PAYMENT':
          text = '입금 대기중';
          break;
        case 'TESTING':
          text = '테스트 진행중';
          break;
        case 'COMPLETED':
          text = '테스트 완료';
          break;
        default:
          text = '테스트 작성중';
          break;
      }
    }

    return text;
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
        .then()
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

    this.setState({ isPwShow: true });
    props.togglePopup(true);
  }

  handleTaxBillPopup = (e, idx) => {
    const { props } = this;

    e.preventDefault();
    this.setState({
      isBillShow: true,
      billIdx: idx,
    });
    props.togglePopup(true);
  }

  handleActivityLog = (activity) => {
    const type = activity.target_content_type;
    const name = activity.actor.name !== undefined && activity.actor.name !== '' ? activity.actor.name : activity.actor.email.substring(0, activity.actor.email.indexOf('@'));

    switch (type) {
      case '테스트':
        return activity.verb.replace('{actor}', name).replace("'{target}'", activity.target.title);
      case '프로젝트':
        return activity.verb.replace('{actor}', name).replace("'{target}'", activity.target.name);
      case 'voucher order':
        return activity.verb.replace('{actor}', name).replace("'{target}'", activity.target.plan.name);
      default:
        return activity.verb.replace('{actor}', name).replace("'{target}'", activity.target.name);
    }
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

    props.patchAccountUpdate(
      id,
      email,
      name,
      phone,
    ).then(() => {
      this.setState({
        toastTitle: 'Saved!',
        toastSubtitle: '성공적으로 수정되었어요:)',
        isToastShow: true,
      });
      setTimeout(() => handleEdit(), 2200);
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
      location,
    } = this.props;
    const name = fieldValues !== undefined ? fieldValues.name : undefined;
    const phone = fieldValues !== undefined ? fieldValues.phone : undefined;
    const {
      projectList,
      activityList,
      voucherList,
      testList,
      isProfileTab,
      isLoading,
      isAuthError,
      onEdit,
      toastTitle,
      toastSubtitle,
      isToastShow,
      isBillShow,
      isPwShow,
      billIdx,
    } = this.state;
    const {
      getDate,
      setPaymentStep,
      handleFileInput,
      handleTabToggle,
      handleEdit,
      handlePwPopup,
      handleTaxBillPopup,
      handleActivityLog,
      onSubmit,
    } = this;
    const { search } = location;

    return (
      <>
        {isAuthError ? <UnauthorizedPopup inviteToken={search} /> : (
          <>
            {isLoading
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
                                      {projectList.map(p => (
                                        <li className="list__item" key={p.id}>
                                          <Link to={`/project/${p.id}`}>{p.name}</Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </section>
                                  <section className="info__activity">
                                    <h2 className="info__title">Activity</h2>
                                    <ul className="activity__list">
                                      {activityList.map(a => (
                                        <li className="list__item" key={a.timestamp}>
                                          <div className="box-item">
                                            <span className="box-image">
                                              <img
                                                src={a.actor.avatar_url}
                                                alt={a.actor.name !== undefined && a.actor.name !== ''
                                                  ? a.actor.name
                                                  : a.actor.email.substring(0, a.actor.email.indexOf('@'))}
                                              />
                                            </span>
                                            <p className="box-text">
                                              <span className="text__activity">
                                                <span className="activity">
                                                  {handleActivityLog(a)}
                                                </span>
                                              </span>
                                              <span className="text__date">{getDate(a.timestamp)}</span>
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
                                {voucherList
                                  .concat(testList)
                                  .sort((a, b) => a.created_at - b.created_at)
                                  .map((p, idx) => (
                                    <li className="list__item" key={p.code}>
                                      <button
                                        type="button"
                                        className="box-payment"
                                        onClick={e => handleTaxBillPopup(e, idx)}
                                      >
                                        <span className="payment__title">
                                          {p.voucher_amount > 0 ? '대량구매' : '단일구매'}
                                        </span>
                                        <strong className="payment__plan">{p.plan.name}</strong>
                                        <span className={`payment__step${p.test === undefined ? '' : `--${p.test.step.toLowerCase()}`}`}>
                                          {setPaymentStep(
                                            p.voucher_amount,
                                            p.test !== undefined ? p.test.step : undefined,
                                          )}
                                        </span>
                                      </button>
                                      <div className="box-paid">
                                        <strong className="paid__total">
                                          {p.test !== undefined
                                            ? p.charged_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            : p.ordered_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                          <i>원</i>
                                        </strong>
                                        <span className="paid__date">
                                          <span>구매일자: </span>
                                          {getDate(p.created_at)}
                                        </span>
                                      </div>
                                      {isBillShow && billIdx === idx
                                        ? (
                                          <OrderConfirmPopup
                                            isOpen={isOpen}
                                            isVoucher={p.voucher_amount > 0}
                                            onSubmit={(email, company, companyRegistNum) => {
                                              p.is_tax_bill_requested = true;
                                              p.tax_bill_company_name = company;
                                              p.tax_bill_receive_email = email;
                                              p.company_registration_number = companyRegistNum;
                                            }}
                                            isTaxBillReq={p.is_tax_bill_requested}
                                            voucherId={p.id !== undefined ? p.id : undefined}
                                            testId={p.test !== undefined ? p.test.id : undefined}
                                            testName={
                                              p.test !== undefined ? p.test.title : undefined
                                            }
                                            planName={p.plan.name}
                                            planAmount={p.voucher_amount}
                                            paidDate={getDate(p.created_at)}
                                            step={p.test !== undefined ? p.test.step : p.is_paid}
                                            price={p.test !== undefined ? p.charged_price : p.ordered_price}
                                          />
                                        )
                                        : null
                                      }
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </section>
                  {isPwShow
                    ? (
                      <NewPasswordPopup
                        show={isOpen}
                        onPopup={togglePopup}
                        handleSubmit={handleSubmit}
                      />
                    )
                    : null}
                  {isToastShow
                    ? (
                      <ToastAlert
                        title={toastTitle}
                        subtitle={toastSubtitle}
                        isShow={isToastShow}
                      />
                    )
                    : null}
                </PageTemplate>
              )}
          </>
        )}
      </>
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
  const { notiList } = state.notification;
  const { voucherList } = state.order;
  const { testList } = state.order;
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
    notiList,
    voucherList,
    testList,
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
  getProjectList: () => dispatch(getProjectList()),
  getVoucherOrderList: () => dispatch(getVoucherOrderList()),
  getTestOrderList: () => dispatch(getTestOrderList()),
  getNotifications: () => dispatch(getNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'accountForm',
  enableReinitialize: true,
})(MyPage));
