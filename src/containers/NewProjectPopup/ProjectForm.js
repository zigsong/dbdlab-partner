/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import Checkbox from 'components/Checkbox';
import {
  Field, reduxForm, getFormValues, getFormMeta, change,
} from 'redux-form';

class ProjectForm extends Component {
  componentDidMount() {
    const { fieldValue, initialValues, change } = this.props;
    const same = fieldValue !== undefined ? fieldValue.same : initialValues.same;

    if (same === undefined) change('same', true);
  }

  componentDidUpdate() {
    const { fieldValue, change } = this.props;
    const service = fieldValue !== undefined ? fieldValue.service : undefined;
    const same = fieldValue !== undefined ? fieldValue.same : undefined;
    if (same === undefined) change('same', true);
    if (same) change('company', service);
  }

  handleInputValue = () => {
    const { fieldValue, change } = this.props;
    const service = fieldValue !== undefined ? fieldValue.service : undefined;
    const same = fieldValue !== undefined ? fieldValue.same : undefined;

    if (same) {
      change('company', service);
    }
  };

  handleCheckboxValue = () => {
    const { change } = this.props;
    change('same', false);
  }

  onReset = () => {
    const { reset, onPopup } = this.props;
    reset();
    onPopup(false);
  }

  render() {
    const {
      handleSubmit,
      fieldValue,
      initialValues,
      fieldMeta,
      isLoading,
    } = this.props;
    const service = fieldValue !== undefined ? fieldValue.service : undefined;
    const same = fieldValue !== undefined ? fieldValue.same : initialValues.same;
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
            disabled={isLoading}
            onChange={() => this.handleInputValue()}
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
              isChecked={same}
              disabled={isLoading}
              onChange={() => this.handleInputValue()}
            />
          </span>
          <Field
            name="company"
            type="text"
            label="company"
            placeholder="텍스트 입력"
            disabled={isLoading}
            component={FormInput}
            onChange={() => this.handleCheckboxValue()}
          />
        </p>
        <div className="form__btn-wrapper">
          <button type="button" className="btn-cancle" onClick={onReset} disabled={isLoading}>취소</button>
          <button
            type="submit"
            className={`btn-submit${service !== undefined && fieldMeta.service.visited && !isLoading ? '--active' : ''}`}
            onClick={handleSubmit}
            disabled={!(service !== undefined && fieldMeta.service.visited && !isLoading)}
          >
            프로젝트 만들기
          </button>
        </div>
      </form>
    );
  }
}

const getFormData = (state) => {
  const fieldValue = getFormValues('projectForm')(state);
  const fieldMeta = getFormMeta('projectForm')(state);
  const initData = { same: true };

  return {
    fieldValue,
    fieldMeta,
    initialValues: initData,
  };
};

const mapDispatchToProps = dispatch => ({
  change: dispatch(change()),
});

export default connect(
  getFormData,
  mapDispatchToProps,
)(reduxForm({
  form: 'projectForm',
  enableReinitialize: true,
})(ProjectForm));
