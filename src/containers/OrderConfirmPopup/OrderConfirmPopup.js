/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import PopupTemplate from 'components/PopupTemplate';
import { togglePopup } from 'modules/popup';
import TaxBillForm from './TaxBillForm';
import './OrderConfirmPopup.scss';

class OrderConfirmPopup extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  onReset = (e) => {
    e.preventDefault();
    console.log(this.props);
    const { reset, togglePopup } = this.props;

    reset();
    togglePopup(false);
  }

  render() {
    const { onReset } = this;

    const {
      isOpen,
      planName,
      planAmount,
      paidDate,
      step,
      price,
      isVoucher,
      hasTestId,
    } = this.props;
    console.log(isVoucher);
    console.log(hasTestId);
    const amount = planAmount === 'undefined개' ? '1개' : planAmount;

    return (
      <PopupTemplate isShow={isOpen} title="이용해주셔서 감사합니다">
        <section className="contents__section">
          <article className="section__info">
            {isVoucher
              ? <strong className="info__title">구매목록</strong>
              : <strong className="info__title">테스트명</strong>
            }
            <span className="info__desc">{planName}</span>
            <strong className="info__title">구매개수</strong>
            <span className="info__desc">{amount}</span>
            <strong className="info__title">구매일자</strong>
            <span className="info__desc">{paidDate}</span>
          </article>
          <article className="section__info">
            <strong className="info__title">입금정보</strong>
            <span className="info__desc">
              신한은행
              <br />
              110-431978-910
              <br />
              김종건
            </span>
            <strong className="info__title">입금액</strong>
            <span className="info__desc--price">
              {price}
              <i>원</i>
            </span>
          </article>
          <article className="section__info">
            <strong className="info__title">상태</strong>
            <span className="info__desc">{step}</span>
          </article>
        </section>
        <section className="contents__section">
          <article className="section__info">
            <strong className="info__title">세금계산서</strong>
            <span className="info__desc">{step}</span>
          </article>
          <TaxBillForm />
        </section>
        <div className="box-btn">
          <button type="button" className="btn-cancle" onClick={e => onReset(e)}>취소</button>
          <button type="button" className="btn-submit">확인</button>
        </div>
      </PopupTemplate>
    );
  }
}

const getFormData = (state) => {
  const fieldValue = getFormValues('taxForm')(state);
  return { fieldValue };
};

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
});

export default connect(
  getFormData,
  mapDispatchToProps,
)(reduxForm({
  form: 'orderConfirmForm',
})(OrderConfirmPopup));
