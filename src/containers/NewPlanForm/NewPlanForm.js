import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Field, reduxForm, getFormMeta, change,
} from 'redux-form';
import PageTemplate from 'containers/PageTemplate';
import FormInput from 'components/FormInput';
import Checkbox from 'components/Checkbox';
import './NewPlanForm.scss';

const companyNameRequried = value => (value ? undefined : '기업명을 입력해주세요');
const applicantRequired = value => (value ? undefined : '이름을 입력해주세요');
const accountNameRequired = value => (value ? undefined : '입금자명을 입력해주세요');
const emailRequired = value => (value ? undefined : '이메일을 입력해주세요');
const emailRegexp = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? '이메일 형식을 다시 확인해주세요' : undefined);
const contactRequired = value => (value ? undefined : '연락처를 입력해주세요');
// const AfterSubmitForm = () => (
//   <div className="box-info">
//     <p className="info__desc">
//       <strong>플루토를 이용해주셔서 감사합니다.</strong>
//       <br />
//       아래 계좌정보로 입금해주시면 확인 후,
//       <br />
//       등록하신 메일로 코드를 발송해드리겠습니다.
//     </p>
//     <p className="info__account">
//       <span className="account__title">입금계좌</span>
//       <strong className="account__desc">신한은행    110-431978-910    김종건</strong>
//       <span className="account__title">입금액</span>
//       <strong className="account__desc">2,400,000원</strong>
//     </p>
//   </div>
// );

const NewPlanForm = (props) => {
  console.log(props);
  let inputEl01 = useRef(null);
  let inputEl02 = useRef(null);
  const [planValue, setPlanValue] = useState(0);
  const [isPlan, setPlan] = useState(0);
  const plan = [
    {
      title: 'plan 01',
      desc: 'Basic',
      expiredDate: 'YY.MM.DD',
      price: [
        { 1: '250,000' },
        { 2: '245,000' },
        { 3: '240,000' },
        { 4: '240,000' },
        { 5: '240,000' },
        { 6: '240,000' },
        { 7: '240,000' },
        { 8: '240,000' },
        { 9: '240,000' },
        { 10: '240,000' },
        { 11: '235,000' },
      ],
      expired: [
        { 1: 30 },
        { 2: 50 },
        { 3: 70 },
        { 4: 70 },
        { 5: 70 },
        { 6: 70 },
        { 7: 70 },
        { 8: 70 },
        { 9: 70 },
        { 10: 70 },
        { 11: 100 },
      ],
    },
    {
      title: 'plan 02',
      desc: 'Basic + Consulting',
      price: [
        { 1: '370,000' },
        { 2: '365,000' },
        { 3: '360,000' },
        { 4: '360,000' },
        { 5: '360,000' },
        { 6: '360,000' },
        { 7: '360,000' },
        { 8: '360,000' },
        { 9: '360,000' },
        { 10: '360,000' },
        { 11: '350,000' },
      ],
      expired: [
        { 1: 30 },
        { 2: 50 },
        { 3: 70 },
        { 4: 70 },
        { 5: 70 },
        { 6: 70 },
        { 7: 70 },
        { 8: 70 },
        { 9: 70 },
        { 10: 70 },
        { 11: 100 },
      ],
    },
  ];

  const getExpiredDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const expired = `${String(year).substring(2, 5)}.${`0${month}`.slice(-2)}.${`0${day}`.slice(-2)}`;

    return expired;
  };

  const getTotalPrice = () => {
    console.log(planValue);
    return (
      <strong className="total__price">
        <span>Total</span>
        <strong>
          {plan.map((p, idx) => (
            idx === isPlan
              ? p.price.map((s, index) => (
                planValue === index ? (
                  <>
                    {index === 0 ? 0 : <span>{s[index + 1]}</span>}
                  </>
                ) : null
              ))
              : null
          ))}
          <i>원</i>
        </strong>
      </strong>
    );
  };

  const getRadioValue = (e, idx) => {
    const { active } = props.fields.plan;
    const planName = e.target.value;
    const inputElem = idx === 0 ? inputEl01 : inputEl02;
    const handleInputFocus = () => { if (active && planName.includes('plan')) inputElem.focus(); };

    handleInputFocus();
  };

  const handleRadioValue = (e, idx) => {
    const { dispatch } = props;
    const initValue = '';

    console.log(!idx + 1);

    if (e.type === 'focus') {
      console.log('Focus!');
      dispatch(change('planForm', 'plan', `plan 0${idx + 1}`));
      dispatch(change('planForm', `plan0${!idx + 1}Amount`, initValue));
      setPlan(idx);
    }
  };

  const handleInputChange = (e, idx) => {
    const { value } = e.target;
    const amount = value === undefined ? 1 : parseInt(value, 10);
    setPlan(idx);
    getTotalPrice(value);

    if (amount === 0 || amount === 1) {
      setPlanValue(0);
    } else if (amount === 2) {
      setPlanValue(1);
    } else if (amount >= 3 && amount <= 11) {
      setPlanValue(amount - 1);
    } else if (amount > 11) {
      setPlanValue(10);
    } else {
      setPlanValue(0);
    }
  };

  return (
    <PageTemplate>
      <div className="contents__plan">
        <div className="contents-inner">
          <form className="form">
            <section className="field__section">
              <div className="field">
                <span className="field__title">
                  <strong className="title">기업명*</strong>
                </span>
                <Field
                  name="companyName"
                  type="text"
                  label="companyName"
                  placeholder="텍스트 입력"
                  component={FormInput}
                  validate={companyNameRequried}
                />
              </div>
              <div className="field">
                <span className="field__title">
                  <strong className="title">이름*</strong>
                </span>
                <Field
                  name="applicant"
                  type="text"
                  label="applicant"
                  placeholder="텍스트 입력"
                  component={FormInput}
                  validate={applicantRequired}
                />
              </div>
              <div className="field">
                <span className="field__title">
                  <strong className="title">입금자명*</strong>
                  <Field
                    name="sameName"
                    label="동일합니다"
                    component={Checkbox}
                  />
                </span>
                <Field
                  name="accountName"
                  type="text"
                  label="accountName"
                  placeholder="텍스트 입력"
                  component={FormInput}
                  validate={accountNameRequired}
                />
              </div>
              <div className="field">
                <span className="field__title">
                  <strong className="title">시리얼넘버 받을 이메일*</strong>
                </span>
                <Field
                  name="email"
                  type="email"
                  label="email"
                  placeholder="텍스트 입력"
                  component={FormInput}
                  validate={[emailRequired, emailRegexp]}
                />
              </div>
              <div className="field">
                <span className="field__title">
                  <strong className="title">연락처*</strong>
                </span>
                <Field
                  name="contact"
                  type="tel"
                  label="contact"
                  placeholder="‘-’ 제외하고 입력"
                  component={FormInput}
                  validate={contactRequired}
                />
              </div>
              <span className="field__info">
                ※ 이메일로 시리얼 넘버를 전송해드리기 때문에
                <br />
                반드시 정확한 이메일 주소를 입력해주세요!
              </span>
            </section>
            <section className="field__section">
              <div className="field">
                <span className="field__title">
                  <strong className="title">어떤 플랜을 구매하실 건가요?</strong>
                </span>
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label htmlFor="plan">
                  {plan.map((p, idx) => (
                    <span className="box-input__radio" key={p.title}>
                      <Field
                        name="plan"
                        component="input"
                        type="radio"
                        value={p.title}
                        onChange={e => getRadioValue(e, idx)}
                      />
                      <strong className="plan__name">{p.title}</strong>
                      <span className="plan__desc">{p.desc}</span>
                      <Field
                        name={`plan0${idx + 1}Amount`}
                        type="number"
                        component={FormInput}
                        label={`plan0${idx + 1}Amount`}
                        placeholder=""
                        onFocus={e => handleRadioValue(e, idx)}
                        onChange={e => handleInputChange(e, idx)}
                        setRef={idx === 0
                          ? (input) => { inputEl01 = input; }
                          : (input) => { inputEl02 = input; }
                        }
                      />
                      <span className="input__placeholder">개</span>
                      <span className="plan__date">
                        유효기간 :
                        {p.expired.map((date, index) => (
                          planValue === index
                            ? (
                              <>
                                {isPlan === idx
                                  ? <strong>{getExpiredDate(date[index + 1])}</strong>
                                  : <strong>{getExpiredDate(30)}</strong>}
                              </>
                            )
                            : null
                        ))}
                      </span>
                    </span>
                  ))}
                </label>
              </div>
              <p className="receipt__total">
                {getTotalPrice()}
              </p>
              <div className="field">
                <span className="field__title">
                  <strong className="title">약관에 동의해주세요*</strong>
                </span>
              </div>
            </section>
          </form>
        </div>
      </div>
    </PageTemplate>
  );
};

const getPlanValues = state => ({ fields: getFormMeta('planForm')(state) });

export default connect(getPlanValues)(reduxForm({
  form: 'planForm',
})(NewPlanForm));
