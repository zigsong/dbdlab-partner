import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import { FormSection, Field, reduxForm, getFormMeta } from 'redux-form';

const companyRequired = value => (value ? undefined : '이름을 입력해주세요');
const registNumRequired = value => (value ? undefined : '연락처를 입력해주세요');
const registNumRegexp = value => (value && !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(value) ? '연락처 형식을 다시 확인해주세요' : undefined);
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
    const { handleSubmit, serviceName, fieldMeta } = this.props;
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
            validate={[registNumRequired, registNumRegexp]}
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
          <button type="submit" className={`btn-submit${serviceName !== undefined && fieldMeta.service.visited ? '--active' : ''}`} onClick={handleSubmit}>신청하기</button>
        </div>
      </FormSection>
    );
  }
}

const getFormData = (state) => {
  const fieldMeta = getFormMeta('taxForm')(state);
  return { fieldMeta };
};

export default connect(
  getFormData,
)(reduxForm({
  form: 'taxForm',
})(TaxBillForm));
