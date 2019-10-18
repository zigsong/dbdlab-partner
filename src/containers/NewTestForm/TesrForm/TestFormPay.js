/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  Field, formValueSelector, getFormMeta,
} from 'redux-form';
import { getTest, getTestPrice } from 'modules/test';
import { getPlanList } from 'modules/plan';

const planRequired = value => (value ? undefined : 'Plan을 선택해 주세요:)');

class TestFormPay extends Component {
  mounted = false;

  state = {
    planPrice: 0,
    targetPrice: 0,
    registerPrice: 0,
    discountPrice: 0,
    orderedPrice: 0,
    chargedPrice: 0,
  }

  componentDidMount() {
    const {
      planValue,
      getPlanList,
      testId,
      getTestPrice,
    } = this.props;

    this.mounted = true;

    getPlanList();
    getTestPrice(testId, planValue).then((res) => {
      console.log(res);
      this.setState({
        planPrice: res.data.plan_price,
        targetPrice: res.data.target_extra_price,
        registerPrice: res.data.register_price,
        discountPrice: res.data.discounted_price,
        orderedPrice: res.data.ordered_price,
        chargedPrice: res.data.charged_price,
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { planValue, couponValue, fields } = this.props;

    if (prevProps.planValue !== planValue) {
      this.getTestPriceValue(couponValue);
    }

    if (prevProps.fields.pay !== fields.pay) {
      this.getTestPriceValue(couponValue);
    }

    if (prevProps.couponValue !== couponValue) {
      this.getTestPriceValue(couponValue);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getTestPriceValue = (cType) => {
    const {
      testId, planValue, getTestPrice,
    } = this.props;
    console.log(cType);

    getTestPrice(testId, planValue, cType)
      .then((res) => {
        console.log(res);
        this.setState({
          planPrice: res.data.plan_price,
          targetPrice: res.data.target_extra_price,
          registerPrice: res.data.register_price,
          discountPrice: res.data.discounted_price,
          orderedPrice: res.data.ordered_price,
          chargedPrice: res.data.charged_price,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
      });
  }

  handleInputFocus = () => {
    const { couponValue, fields } = this.props;
    const { active } = fields.pay.coupon;
    const isCouponValid = couponValue !== 'WELCOME_BACK' && couponValue !== undefined;

    if (active && isCouponValid) this.inputEl.focus();
  };

  FormRadio = (valueProps) => {
    const { isDisabled } = this.props;
    const { input, meta, planList } = valueProps;
    const hasError = meta.touched && meta.error;

    return (
      <>
        {planList.map((p, idx) => (
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
            <span className="plan__desc--eng">{p.description}</span>
            { idx === 0 ? <span className="plan__desc--kor">테스트만 진행합니다.</span> : <span className="plan__desc--kor">테스트 + 후속 컨설팅을 진행합니다 </span> }
          </span>
        ))}
        {hasError && <span className="msg--error">{meta.error}</span>}
      </>
    );
  };

  render() {
    const {
      planList,
      couponValue,
      isDisabled,
      submitErrorMsg,
      fields,
    } = this.props;
    const {
      planPrice,
      targetPrice,
      registerPrice,
      discountPrice,
      chargedPrice,
    } = this.state;
    const planPriceInt = parseInt(planPrice, 10);
    const targetPriceInt = parseInt(targetPrice, 10);
    const registerPriceInt = registerPrice === undefined ? 0 : parseInt(registerPrice, 10);
    const { handleInputFocus, FormRadio } = this;
    const totalPrice = planPriceInt + targetPriceInt + registerPriceInt;
    const couponTypeMeta = fields.pay !== undefined ? fields.pay.coupon : undefined;
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
        price: planPriceInt === 0 ? 'PLAN을 선택해주세요' : `${planPriceInt}원`,
      },
      {
        title: '타겟 정보 추가',
        price: `${targetPriceInt}원`,
      },
      {
        title: '회원가입',
        price: `${registerPriceInt}원`,
      },
    ];
    console.log(couponValue);

    return (
      <div className="field-wrapper--pay">
        <section className="field__section">
          <span className="field__title">
            <strong className="title">PLAN 선택하기*</strong>
          </span>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="pay.plan">
            <Field
              planList={planList}
              name="plan"
              component={FormRadio}
              validate={planRequired}
              disabled={isDisabled}
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
                  <span className="price">{discountPrice}</span>
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
                            {submitErrorMsg && couponTypeMeta.touched && <span className="msg--error">{submitErrorMsg}</span>}
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
                            {submitErrorMsg && couponTypeMeta.touched && <span className="msg--error">{submitErrorMsg}</span>}
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
                  {chargedPrice}
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
  test: state.test,
  couponValue: selector(state, 'pay.coupon'),
  planValue: selector(state, 'pay.plan'),
  fields: getFormMeta('testForm')(state),
  testPrice: state.test.testPrice,
  planList: state.plan.planList,
});

const mapDispatchToProps = dispatch => ({
  getTest: tId => dispatch(getTest(tId)),
  getTestPrice: (tId, pName, couponValue) => dispatch(getTestPrice(tId, pName, couponValue)),
  getPlanList: () => dispatch(getPlanList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestFormPay);
