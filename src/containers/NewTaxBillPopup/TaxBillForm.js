import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  FormSection,
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';

const companyRequired = value => (value ? undefined : '이름을 입력해주세요');
const registNumRequired = value => (value ? undefined : '사업자 등록 번호를 입력해주세요');
const registNumRegexp = value => (value && !/([0-9]{3})([0-9]{2})([0-9]{5}$)/.test(value) ? '사업자 등록 번호를 다시 확인해주세요' : undefined);
const registNumLength = value => (value && parseInt(value.length, 10) > 10 ? '사업자 등록 번호를 다시 확인해주세요' : undefined);
const emailRequired = value => (value ? undefined : '이메일을 입력해주세요');
const emailRegexp = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? '이메일 형식을 다시 확인해주세요' : undefined);

class TaxBillForm extends Component {
  onReset = () => {
    const { reset, onPopup } = this.props;
    reset();
    onPopup(false);
  }

  render() {
    const { handleSubmit, fieldValue } = this.props;
    const { onReset } = this;
    return (
      <FormSection name="tax" className="form-tax" onSubmit={handleSubmit}>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">기업명*</strong>
          </span>
          <Field
            name="company"
            type="text"
            label="company"
            placeholder="텍스트 입력"
            component={FormInput}
            validate={companyRequired}
          />
        </p>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">사업자 등록 번호*</strong>
          </span>
          <Field
            name="companyRegistNum"
            type="text"
            label="companyRegistNum"
            placeholder="숫자만 입력"
            component={FormInput}
            validate={[registNumRequired, registNumRegexp, registNumLength]}
          />
        </p>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">이메일*</strong>
          </span>
          <Field
            name="email"
            type="text"
            label="email"
            placeholder="텍스트 입력"
            component={FormInput}
            validate={[emailRequired, emailRegexp]}
          />
        </p>
        <div className="form__btn-wrapper">
          <button type="button" className="btn-cancle" onClick={onReset}>취소</button>
          <button type="submit" className={`btn-submit${fieldValue !== undefined ? '--active' : ''}`} onClick={handleSubmit}>신청하기</button>
        </div>
      </FormSection>
    );
  }
}


const getFormData = (state) => {
  const fieldValue = getFormValues('taxForm')(state);
  return { fieldValue };
};

export default connect(
  getFormData,
)(reduxForm({
  form: 'taxForm',
})(TaxBillForm));
