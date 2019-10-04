/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  Field, formValueSelector, getFormMeta,
} from 'redux-form';

const planRequired = value => (value ? undefined : 'Plan을 선택해 주세요:)');

class TestFormPay extends Component {
  state = {
    planPrice: 0,
    targetPrice: 0,
    registerPrice: 0,
  }

  componentDidMount() {
    let planPriceValue = 0;
    const { planList, planValue } = this.props;
    console.log(planList);
    const getPlanPriceValue = () => {
      if (planList === undefined || planList === [] || planList.length === 0) {
        planPriceValue = 0;
      } else if (planValue === undefined) {
        planPriceValue = 0;
      } else {
        planPriceValue = planList.find(p => p.name === planValue).price_amount;
      }
      console.log(planPriceValue);

      return planPriceValue;
    };

    getPlanPriceValue();
    this.getExtraPrice();
    this.getRegisterPrice();
    this.setState({ planPrice: planPriceValue });
  }

  componentDidUpdate(prevProps) {
    const { extraValues, isRegisterReq } = this.props;
    if (prevProps.extraValues !== extraValues) {
      this.getExtraPrice();
    }

    if (prevProps.isRegisterReq !== isRegisterReq) {
      this.getRegisterPrice();
    }
  }

  getExtraPrice = () => {
    let extraPriceValue = 0;
    const { extraValues, extraInfoCategory } = this.props;
    const exValue1Check = extraValues.filter(ex1 => ex1.name === extraInfoCategory[0]).length;
    const exValue2Check = extraValues.filter(ex1 => ex1.name === extraInfoCategory[1]).length;
    const exValue3Check = extraValues.filter(ex1 => ex1.name === extraInfoCategory[2]).length;
    const totalCheck = [
      (3000 * 15 * exValue1Check),
      (2000 * 15 * exValue2Check),
      (3000 * 15 * exValue3Check),
    ];

    extraPriceValue = totalCheck.length < 1 ? 0 : totalCheck.reduce((acc, cur) => acc + cur);

    this.setState({ targetPrice: extraPriceValue });
  };

  getRegisterPrice = () => {
    const { isRegisterReq } = this.props;

    if (isRegisterReq !== '아니오') this.setState({ registerPrice: 3000 * 15 });
  }

  handleInputFocus = () => {
    const { couponValue, fields } = this.props;
    const { active } = fields.pay.coupon;
    const isCouponValid = couponValue !== 'WELCOME_BACK' && couponValue !== undefined;

    if (active && isCouponValid) this.inputEl.focus();
  };

  FormRadio = (valueProps) => {
    const { planList, isDisabled } = this.props;
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
                this.setState({ planPrice: p.price_amount });
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

  render() {
    const { couponValue, isDisabled, submitErrorMsg } = this.props;
    const { planPrice, targetPrice, registerPrice } = this.state;
    const { handleInputFocus, FormRadio } = this;
    const totalPrice = parseInt(planPrice, 10)
      + parseInt(targetPrice, 0)
      + parseInt(registerPrice, 0);
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
      {
        title: '해당 사항 없음',
        type: '',
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
                          <p className={`coupon__number${submitErrorMsg ? '--error' : ''}`}>
                            <span className="input__placeholder">코드 입력: </span>
                            <Field
                              name="couponNum"
                              type="text"
                              component={FormInput}
                              label="pay.couponNum"
                              placeholder="코드를 입력해주세요"
                              setRef={(input) => { this.inputEl = input; }}
                              disabled={isDisabled}
                              submitError={!!submitErrorMsg}
                            />
                            {submitErrorMsg && <span className="msg--error">{submitErrorMsg}</span>}
                          </p>
                        )
                        : (
                          <p className={`coupon__serial${submitErrorMsg ? '--error' : ''}`}>
                            <span className="input__placeholder">시리얼 넘버 입력: </span>
                            <Field
                              name="couponNum"
                              type="text"
                              component={FormInput}
                              label="pay.couponNum"
                              placeholder="시리얼 넘버를 입력해주세요"
                              setRef={(input) => { this.inputEl = input; }}
                              disabled={isDisabled}
                              submitError={!!submitErrorMsg}
                            />
                            {submitErrorMsg && <span className="msg--error">{submitErrorMsg}</span>}
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
  }
}

const selector = formValueSelector('testForm');
const mapStateToProps = state => ({
  couponValue: selector(state, 'pay.coupon'),
  planValue: selector(state, 'pay.plan'),
  fields: getFormMeta('testForm')(state),
});

export default connect(
  mapStateToProps,
)(TestFormPay);
