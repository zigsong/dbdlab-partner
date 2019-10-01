import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import {
  reduxForm,
  Field,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import { putPasswordUpdate } from 'modules/auth';

const prevPwRequired = value => (value ? undefined : '지금 사용 중인 비밀번호를 입력해주세요');
const nextPwRequired = value => (value ? undefined : '새로운 비밀번호를 입력해 주세요');

class PasswordForm extends Component {
  state = {
    errMsgNew: '',
    errMsgCur: '',
  }

  onReset = () => {
    const { reset, onPopup } = this.props;
    reset();
    onPopup(false);
  }

  onSubmit = (values) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    // eslint-disable-next-line no-shadow
    const { reset, onPopup, accountInfo } = this.props;
    const { email } = accountInfo;
    return sleep(100).then(() => {
      if (values.currentPw === undefined) {
        throw new SubmissionError({
          currentPw: '비밀번호를 작성해 주세요',
          _error: '비밀번호를 작성해 주세요',
        });
      } else if (values.currentPw.length < 2) {
        throw new SubmissionError({
          currentPw: '비밀번호를 다시 한 번 확인해 주세요',
          _error: '비밀번호를 다시 한 번 확인해 주세요',
        });
      } else if (values.nextPw === undefined) {
        throw new SubmissionError({
          nextPw: '비밀번호를 작성해 주세요',
          _error: '비밀번호를 작성해 주세요',
        });
      } else if (values.nextPw.length < 2) {
        throw new SubmissionError({
          nextPw: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
          _error: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
        });
      } else if (values.nextPw.length > 20) {
        throw new SubmissionError({
          nextPw: '비밀번호는 20자 미만으로 사용해 주세요',
          _error: '비밀번호는 20자 미만으로 사용해 주세요',
        });
      } else if (!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\|[\]{};:'",.<>/?])*.{6,}$/.test(values.nextPw)) {
        throw new SubmissionError({
          nextPw: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
          nextRePw: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
          _error: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
        });
      } else if (values.nextRePw === undefined) {
        throw new SubmissionError({
          nextRePw: '비밀번호를 작성해 주세요',
          _error: '비밀번호를 작성해 주세요',
        });
      } else if (!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\|[\]{};:'",.<>/?])*.{6,}$/.test(values.nextRePw)) {
        throw new SubmissionError({
          nextPw: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
          nextRePw: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
          _error: '공백 없이 영문 + 숫자 조합 6자리 이상 작성하세요',
        });
      } else if (values.nextRePw !== values.nextPw) {
        throw new SubmissionError({
          nextPw: '새로운 비밀번호가 일치하지 않습니다',
          nextRePw: '새로운 비밀번호가 일치하지 않습니다',
          _error: '새로운 비밀번호가 일치하지 않습니다',
        });
      } else {
        const { props } = this;
        const { currentPw, nextPw } = values;

        props.putPasswordUpdate(email, currentPw, nextPw)
          .then(() => {
            reset();
            this.setState({
              errMsgNew: undefined,
              errMsgCur: undefined,
            }, () => onPopup(false));
          })
          .catch((err) => {
            const errMsgNew = err.response.data.new_password !== undefined
              ? err.response.data.new_password[0]
              : undefined;
            const errMsgCur = err.response.data.password !== undefined
              ? err.response.data.password[0]
              : undefined;

            this.setState({
              errMsgNew,
              errMsgCur,
            });
          });
      }
    });
  };

  render() {
    const { onReset, onSubmit } = this;
    const { handleSubmit, fieldValues } = this.props;
    const { errMsgNew, errMsgCur } = this.state;
    const currentPw = fieldValues !== undefined ? fieldValues.currentPw : undefined;
    const nextPw = fieldValues !== undefined ? fieldValues.nextPw : undefined;
    const nextRePw = fieldValues !== undefined ? fieldValues.nextRePw : undefined;

    return (
      <form name="pw" className="form-pw" onSubmit={handleSubmit(values => onSubmit(values))}>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">현재 사용중인 비밀번호</strong>
          </span>
          <Field
            name="currentPw"
            type="password"
            label="currentPw"
            placeholder="현재 사용 중인 비밀번호"
            component={FormInput}
            validate={prevPwRequired}
          />
          {errMsgCur ? <span className="msg--error">{errMsgCur}</span> : null}
        </p>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">새 비밀번호</strong>
          </span>
          <Field
            name="nextPw"
            type="password"
            label="nextPw"
            placeholder="문자 + 숫자 6자 이상"
            component={FormInput}
            validate={nextPwRequired}
          />
          {errMsgNew ? <span className="msg--error">{errMsgNew}</span> : null}
        </p>
        <p className="form__data-wrapper">
          <span className="wrapper__title">
            <strong className="title">새 비밀번호 확인</strong>
          </span>
          <Field
            name="nextRePw"
            type="password"
            label="nextRePw"
            placeholder="문자 + 숫자 6자 이상"
            component={FormInput}
            validate={nextPwRequired}
          />
          {errMsgNew ? <span className="msg--error">{errMsgNew}</span> : null}
        </p>
        <div className="form__btn-wrapper">
          <button type="button" className="btn-cancle" onClick={onReset}>취소</button>
          <button type="submit" className={`btn-submit${currentPw !== undefined && nextPw !== undefined && nextRePw !== undefined ? '--active' : ''}`}>수정하기</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putPasswordUpdate: (email, name, phone) => dispatch(putPasswordUpdate(email, name, phone)),
});

export default connect(
  state => ({
    fieldValues: getFormValues('pwForm')(state),
  }),
  mapDispatchToProps,
)(reduxForm({
  form: 'pwForm',
})(PasswordForm));
