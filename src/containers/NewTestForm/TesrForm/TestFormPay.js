/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  Field, formValueSelector, getFormMeta,
} from 'redux-form';

const planRequired = value => (value ? undefined : 'Plan을 선택해 주세요:)');

const TestFormPay = (props) => {
  let inputEl = useRef(null);
  const { couponValue, planList, isDisabled } = props;
  const coupon = [
    {
      title: '한달이내에 리얼답을 사용한 적이 있습니다',
      price: 12345,
    },
    {
      title: '추천코드가 있습니다',
      price: 123456,
    },
    {
      title: '다른 누군가로 부터 시리얼 넘버를 받았습니다',
      price: 0,
    },
  ];
  const receipt = [
    {
      title: '테스트 비용',
      price: 370000,
    },
    {
      title: '타겟 정보 추가',
      price: 0,
    },
    {
      title: '회원가입',
      price: 12345,
    },
  ];

  const getPlanTotalPrice = () => {
    const extraPrice = receipt.reduce((prev, curr) => ({ price: prev.price + curr.price }));
    return (
      <strong className="total__price">
        <span>Total</span>
        <strong>
          {extraPrice.price}
          <i>원</i>
        </strong>
      </strong>
    );
  };

  const getTotalPrice = () => {
    const categoryPrice = receipt.reduce((prev, curr) => ({ price: prev.price + curr.price }));
    const couponPrice = couponValue === undefined ? 0 : parseInt(couponValue, 10);
    const totalPrice = categoryPrice.price - couponPrice;
    return (
      <strong className="total__price">
        <span>Total</span>
        <strong>
          {totalPrice}
          <i>원</i>
        </strong>
      </strong>
    );
  };

  const handleInputFocus = () => {
    const { active } = props.fields.pay.coupon;

    if (active) inputEl.focus();
  };

  const FormRadio = (valueProps) => {
    const { input, meta } = valueProps;
    const hasError = meta.touched && meta.error;

    return (
      <>
        {planList.map(p => (
          <span className={`box-input__radio${hasError ? '--error' : ''}`} key={p.name}>
            <input
              type="radio"
              name={input.name}
              onFocus={e => input.onFocus(e, input.onChange(p.name))}
              onChange={input.onChange}
              checked={p.name === input.value}
              value={p.name}
              disabled={isDisabled}
            />
            <strong className="plan__name">{p.name}</strong>
            <span className="plan__desc">{p.description}</span>
            <span className="plan__date">YY.MM.DD</span>
          </span>
        ))}
        {hasError && <span className="msg--error">{meta.error}</span>}
      </>
    );
  };

  return (
    <div className="field-wrapper--pay">
      <section className="field__section">
        <span className="field__title">
          <strong className="title">PLAN 선택하기*</strong>
        </span>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="pay.plan">
          <Field
            name="plan"
            component={FormRadio}
            validate={planRequired}
          />
        </label>
      </section>
      <section className="field__section">
        <div className="field__receipt">
          <span className="field__title">
            <strong className="title">결제 정보</strong>
          </span>
          <div className="receipt__detail">
            {receipt.map(r => (
              <p className="receipt__extra" key={r.title}>
                <span className="extra__title">{r.title}</span>
                <strong className="extra__price">
                  {r.price}
                  <i>원</i>
                </strong>
              </p>
            ))}
          </div>
          <p className="plan__total">
            {getPlanTotalPrice()}
          </p>
          <div className="receipt__coupon">
            <span className="coupon__title">
              <strong className="title">Coupon</strong>
              <strong className="coupon__price">
                -
                <span className="price">{couponValue === undefined ? 0 : couponValue}</span>
                원
              </strong>
            </span>
            <div className="coupon__detail">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="pay.coupon">
                {coupon.map(c => (
                  <span className="box-input__radio" key={c.title}>
                    <Field
                      name="coupon"
                      type="radio"
                      component="input"
                      value={String(c.price)}
                      onChange={() => handleInputFocus()}
                      disabled={isDisabled}
                    />
                    <span className="coupon__name">{c.title}</span>
                  </span>
                ))}
              </label>
              <p className="coupon__number">
                <span className="input__placeholder">코드 입력: </span>
                <Field
                  name="couponNum"
                  type="text"
                  component={FormInput}
                  label="pay.couponNum"
                  placeholder="코드를 입력해주세요"
                  setRef={(input) => { inputEl = input; }}
                  disabled={isDisabled}
                />
              </p>
            </div>
          </div>
          <p className="receipt__total">
            {getTotalPrice()}
            <span className="receipt__text">VAT 포함</span>
          </p>
        </div>
      </section>
    </div>
  );
};

const selector = formValueSelector('testForm');

export default connect(state => ({
  couponValue: selector(state, 'pay.coupon'),
  fields: getFormMeta('testForm')(state),
}))(TestFormPay);
