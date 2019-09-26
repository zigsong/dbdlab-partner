/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  Field, formValueSelector, getFormMeta,
} from 'redux-form';

const planRequired = value => (value ? undefined : 'Plan을 선택해 주세요:)');

const TestFormPay = (props) => {
  let inputEl = useRef(null);
  const [planPrice, setPlanPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [registerPrice, setRegisterPrice] = useState(0);
  // const [couponDiscount, setCouponDiscount] = useState(0);
  console.log(props);
  const { couponValue, planList, isDisabled } = props;
  const totalPrice = planPrice + targetPrice + registerPrice;
  const couponDiscount = couponValue !== undefined ? totalPrice * 0.03 : 0;
  const coupon = [
    {
      title: '한달이내에 리얼답을 사용한 적이 있습니다',
      type: 'WELCOME_BACK',
    },
    {
      title: '추천코드가 있습니다',
      type: 'RECOMMEND',
    },
    {
      title: '다른 누군가로 부터 시리얼 넘버를 받았습니다',
      type: 'VOUCHER',
    },
  ];
  const receipt = [
    {
      title: '테스트 비용',
      price: planPrice === 0 ? 'PLAN을 선택해주세요' : `${planPrice}원`,
    },
    {
      title: '타겟 정보 추가',
      price: `${targetPrice}원`,
    },
    {
      title: '회원가입',
      price: `${registerPrice}원`,
    },
  ];

  const handleInputFocus = () => {
    const { active } = props.fields.pay.coupon;
    const isCouponValid = couponValue !== 'WELCOME_BACK' && couponValue !== undefined;

    if (active && isCouponValid) inputEl.focus();
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
              onFocus={(e) => {
                input.onFocus(e, input.onChange(p.name));
                setPlanPrice(p.price_amount);
              }}
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
                  {/* <i>원</i> */}
                </strong>
              </p>
            ))}
          </div>
          <p className="plan__total">
            <strong className="total__price">
              <span>Total</span>
              <strong>
                {totalPrice}
                <i>원</i>
              </strong>
            </strong>
          </p>
          <div className="receipt__coupon">
            <span className="coupon__title">
              <strong className="title">Coupon</strong>
              <strong className="coupon__price">
                -
                <span className="price">{couponDiscount}</span>
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
                      value={c.type}
                      onChange={() => handleInputFocus()}
                      disabled={isDisabled}
                    />
                    <span className="coupon__name">{c.title}</span>
                  </span>
                ))}
              </label>
              {couponValue !== 'WELCOME_BACK' && couponValue !== undefined
                ? (
                  <>
                    {couponValue === 'RECOMMEND'
                      ? (
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
                      )
                      : (
                        <p className="coupon__serial">
                          <span className="input__placeholder">시리얼 넘버 입력: </span>
                          <Field
                            name="couponNum"
                            type="text"
                            component={FormInput}
                            label="pay.couponNum"
                            placeholder="시리얼 넘버를 입력해주세요"
                            setRef={(input) => { inputEl = input; }}
                            disabled={isDisabled}
                          />
                        </p>
                      )
                    }
                  </>
                )
                : null
              }
            </div>
          </div>
          <p className="receipt__total">
            <strong className="total__price">
              <span>Total</span>
              <strong>
                {totalPrice - couponDiscount}
                <i>원</i>
              </strong>
            </strong>
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
  planValue: selector(state, 'pay.plan'),
  fields: getFormMeta('testForm')(state),
}))(TestFormPay);
