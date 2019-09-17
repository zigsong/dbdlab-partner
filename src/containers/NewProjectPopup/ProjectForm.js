import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import Checkbox from 'components/Checkbox';
import {
  Field, reduxForm, formValueSelector, getFormMeta,
} from 'redux-form';

class ProjectForm extends Component {
  componentDidMount() {
    const { change, serviceName, isSame } = this.props;
    if (isSame) change('company', serviceName);
  }

  componentDidUpdate() {
    const { change, serviceName, isSame } = this.props;
    if (isSame) change('company', serviceName);
  }

  changeInputValue = () => {
    const { change, serviceName, isSame } = this.props;
    if (isSame) change('company', serviceName);
  };

  onReset = () => {
    const { reset, onPopup } = this.props;
    reset();
    onPopup(false);
  }

  required = value => (value ? undefined : 'Required');

  maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);

  minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);

  render() {
    const { handleSubmit, serviceName, fieldMeta } = this.props;
    const { onReset } = this;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">프로젝트명(서비스명)*</strong>
            <span className="subtitle">한글, 영문, 숫자 조합 최대 20자</span>
          </span>
          <Field
            name="service"
            type="text"
            label="service"
            placeholder="텍스트 입력"
            component={FormInput}
          />
          <span className="input__placeholder">의 사용성 테스트</span>
        </p>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">기업명</strong>
            <Field
              name="same"
              component={Checkbox}
              label="서비스명과 동일합니다"
              checked
              onChange={() => this.changeInputValue()}
            />
          </span>
          <Field
            name="company"
            type="text"
            label="company"
            placeholder="텍스트 입력"
            component={FormInput}
          />
        </p>
        <div className="form__btn-wrapper">
          <button type="button" className="btn-cancle" onClick={onReset}>취소</button>
          <button type="submit" className={`btn-submit${serviceName !== undefined && fieldMeta.service.visited ? '--active' : ''}`} onClick={handleSubmit}>프로젝트 만들기</button>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('projectForm');
const getFormData = (state) => {
  const isSame = selector(state, 'same');
  const serviceName = selector(state, 'service');
  const fieldMeta = getFormMeta('projectForm')(state);
  return { isSame, serviceName, fieldMeta };
};

export default connect(
  getFormData,
)(reduxForm({
  form: 'projectForm',
  enableReinitialize: true,
})(ProjectForm));
