/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import PopupTemplate from 'components/PopupTemplate';
import ToastAlert from 'components/ToastAlert';
import { togglePopup } from 'modules/popup';
import { patchVoucher, patchTestOrder } from 'modules/order';
import TaxBillForm from './TaxBillForm';
import './OrderConfirmPopup.scss';

class OrderConfirmPopup extends Component {
  state = {
    hasComplete: false,
  }

  handleStep = (step) => {
    let stepTxt;
    switch (step) {
      case true:
        stepTxt = '입금 완료';
        break;
      case false:
        stepTxt = '입금 대기 중';
        break;
      case 'APPLY':
        stepTxt = '테스트 작성중';
        break;
      case 'REGISTER':
        stepTxt = '신청 대기중';
        break;
      case 'PAYMENT':
        stepTxt = '입금 대기중';
        break;
      case 'TESTING':
        stepTxt = '테스트 진행중';
        break;
      case 'COMPLETED':
        stepTxt = '테스트 완료';
        break;
      default:
        stepTxt = '입금 완료';
        break;
    }

    return stepTxt;
  }

  onReset = (e) => {
    e.preventDefault();
    console.log(this.props);
    const { reset, togglePopup } = this.props;

    reset();
    togglePopup(false);
  }

  onSubmit = (values) => {
    console.log(values);
    const {
      isVoucher,
      testId,
      voucherId,
      planAmount,
      patchVoucher,
      togglePopup,
      reset,
    } = this.props;
    const { company, companyRegistNum, email } = values.tax;
    const hasAllValues = !!company && !!companyRegistNum && !!email;

    if (hasAllValues) {
      if (isVoucher) {
        patchVoucher(
          company,
          companyRegistNum,
          email,
          voucherId,
          planAmount,
          true,
        )
          .then((res) => {
            console.log(res);
            this.setState({
              hasComplete: true,
            }, () => {
              setTimeout(() => {
                this.setState({ hasComplete: false });
                reset();
                togglePopup(false);
              }, 2000);
            });
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
            console.log(err.message);
          });
      } else {
        patchTestOrder(
          voucherId,
          undefined,
          undefined,
          // testOrder.plan.name,
          // testOrder.plan.description,
          // testOrder.ordered_price,
          undefined,
          undefined,
          // testOrder.is_paid,
          undefined,
          true,
          email,
          company,
          companyRegistNum,
        )
          .then(() => {
            this.setState({
              hasComplete: true,
            }, () => {
              setTimeout(() => {
                this.setState({ hasComplete: false });
                reset();
                togglePopup(false);
              }, 2000);
            });
          });
      }
    }
  }

  render() {
    const { handleStep, onReset } = this;
    const {
      isOpen,
      isTaxBillReq,
      testName,
      planName,
      planAmount,
      paidDate,
      step,
      price,
      isVoucher,
      fieldValue,
      handleSubmit,
    } = this.props;
    const { hasComplete } = this.state;
    const amount = planAmount === undefined ? '1개' : `${planAmount}개`;
    const hasFieldValue = fieldValue !== undefined
      ? Object.keys(fieldValue.tax).length : undefined;

    return (
      <PopupTemplate isShow={isOpen}>
        <div className="popup__contents--confirm">
          <h2 className="popup__subtitle">이용해주셔서 감사합니다</h2>
          <section className="contents__section">
            <article className="section__info">
              {isVoucher
                ? (
                  <>
                    <strong className="info__title">구매목록</strong>
                    <span className="info__desc">{planName}</span>
                  </>
                )
                : (
                  <>
                    <strong className="info__title">테스트명</strong>
                    <span className="info__desc">{testName}</span>
                  </>
                )
              }
              <strong className="info__title">구매개수</strong>
              <span className="info__desc">{amount}</span>
              <strong className="info__title">구매일자</strong>
              <span className="info__desc">{paidDate}</span>
            </article>
            <article className="section__info">
              <strong className="info__title">입금정보</strong>
              <span className="info__desc">
                디비디랩주식회사
                <br />
                036-107482-04-016
              </span>
              <strong className="info__title">입금액</strong>
              <span className="info__desc--price">
                {price}
                <i>원</i>
              </span>
            </article>
            <article className="section__info">
              <strong className="info__title">상태</strong>
              <span className="info__desc--step">{handleStep(step)}</span>
            </article>
          </section>
          <section className="contents__section">
            <article className="section__info">
              <strong className="info__title">세금계산서</strong>
              <span className={`info__desc${isTaxBillReq ? '--bill' : ''}`}>{isTaxBillReq ? '신청' : '미신청'}</span>
            </article>
            <TaxBillForm />
          </section>
        </div>
        <div className="box-btn">
          <button type="button" className="btn-cancle" onClick={e => onReset(e)}>취소</button>
          <button type="button" className={`btn-submit${hasFieldValue > 2 ? '--active' : ''}`} onClick={handleSubmit(values => this.onSubmit(values))}>확인</button>
        </div>
        {hasComplete
          ? (
            <ToastAlert
              title="신청이 완료되었어요 :)"
              subtitle="빠른 안내 드리도록 하겠습니다"
              isShow={hasComplete}
            />
          )
          : null}
      </PopupTemplate>
    );
  }
}

const getFormData = (state) => {
  const fieldValue = getFormValues('orderConfirmForm')(state);
  return { fieldValue };
};

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
  patchVoucher: (
    company,
    companyRegistNum,
    email,
    voucherId,
    voucherAmount,
    hasTaxBillReq,
  ) => dispatch(patchVoucher(
    company,
    companyRegistNum,
    email,
    voucherId,
    voucherAmount,
    hasTaxBillReq,
  )),
  patchTestOrder: (
    oId,
    cCode,
    cType,
    planName,
    planDesc,
    originPrice,
    discountedPrice,
    totalPrice,
    isPaid,
    paidDate,
    hasTaxBillReq,
    taxEmail,
    taxCompany,
    taxCompanyRegistNum,
  ) => dispatch(patchTestOrder(
    oId,
    cCode,
    cType,
    planName,
    planDesc,
    originPrice,
    discountedPrice,
    totalPrice,
    isPaid,
    paidDate,
    hasTaxBillReq,
    taxEmail,
    taxCompany,
    taxCompanyRegistNum,
  )),
});

export default connect(
  getFormData,
  mapDispatchToProps,
)(reduxForm({
  form: 'orderConfirmForm',
})(OrderConfirmPopup));
