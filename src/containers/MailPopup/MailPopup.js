import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { togglePopup } from 'modules/popup';
import './MailPopup.scss';

const valueFieldState = {
  value: '',
  valid: true,
  typeMismatch: false,
  errMsg: '', // this is where our error message gets across
};

class MailPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
      isAlert: false,
      company: {
        ...valueFieldState,
        fieldName: 'Company',
        required: true,
        requiredTxt: '소속 단체의 명칭을 작성해 주세요',
      },
      name: {
        ...valueFieldState,
        fieldName: 'Name',
        required: true,
        requiredTxt: '작성하신 분의 성함을 작성해 주세요',
      },
      contact: {
        ...valueFieldState,
        fieldName: 'Contact',
        required: true,
        requiredTxt: '정확한 상담 안내를 받으실 휴대폰 번호가 필요해요',
        formatErrorTxt: '올바른 휴대폰 번호를 입력해 주세요.',
      },
      email: {
        ...valueFieldState,
        fieldName: 'Email',
        required: true,
        requiredTxt: '이메일 주소를 입력해 주세요',
        formatErrorTxt: '이메일 주소가 올바르지 않습니다',
      },
      category: {
        ...valueFieldState,
        fieldName: 'Categories',
        required: true,
        requiredTxt: '문의 유형을 선택해 주세요',
      },
      message: {
        ...valueFieldState,
        fieldName: 'Massages',
        required: true,
        requiredTxt: '문의 내용을 입력해 주세요',
      },
      allFieldsValid: false,
      allValid: false,
    };
  }

  componentDidUpdate() {
    const { isOpen } = this.props;

    if (isOpen) this.onTouchMove();
    if (this.popup) this.preventScroll(this.popup);
  }

  ErrorTxt = ({ txt }) => (
    <span className="form-item__errortxt">{txt}</span>
  );

  Loading = () => (
    <div className="box__loading-mail">
      <div className="container--loading-mail">
        <span className="loading-mail--bar">Loading</span>
      </div>
    </div>
  );

  Alert = () => {
    const { isAlert } = this.state;
    return (
      <div className={`box__alert${isAlert ? ' alert' : ''}`}>
        <strong>문의가 완료되었습니다.</strong>
        <span>
          빠른 답변드리도록 하겠습니다.
          <br />
          메인으로 이동합니다.
        </span>
      </div>
    );
  }

  reduceFormValues = (formElements) => {
    const arrElements = Array.prototype.slice.call(formElements);
    const formValues = arrElements
      .filter(elem => elem.name.length > 0)
      .map((x) => {
        const { typeMismatch } = x.validity;
        const { name, type, value } = x;
        return {
          name,
          type,
          typeMismatch,
          value,
          valid: x.checkValidity(),
        };
      })
      .reduce((acc, currVal) => {
        const { value, valid, typeMismatch } = currVal;
        const {
          fieldName,
          requiredTxt,
          formatErrorTxt,
        // eslint-disable-next-line react/destructuring-assignment
        } = this.state[currVal.name];
        acc[currVal.name] = {
          value,
          valid,
          typeMismatch,
          fieldName,
          requiredTxt,
          formatErrorTxt,
        };
        return acc;
      }, {});
    return formValues;
  };

  // eslint-disable-next-line arrow-body-style
  checkAllFieldsValid = (formValues) => {
    return !Object.keys(formValues)
      .map(x => formValues[x])
      .some(field => !field.valid);
  };

  onChange = (e) => {
    const elem = e.target;
    const elemValue = {
      value: '',
      valid: true,
    };
    const checkValues = () => {
      const {
        company, category, email, name, contact, message,
      } = this.state;

      const checkCompany = company.valid && company.value.length > 0;
      const checkCategory = category.valid && category.value.length > 0;
      const checkEmail = email.valid && email.value.length > 0;
      const checkName = name.valid && name.value.length > 0;
      const checkContact = contact.valid && contact.value.length > 0;
      const checkMassage = message.valid && message.value.length > 0;

      return (
        checkCompany && checkCategory && checkEmail && checkName && checkContact && checkMassage
      ) === true;
    };

    elemValue.value = elem.value;
    elemValue.valid = elem.checkValidity();

    this.setState(prevState => ({
      [elem.name]: Object.assign(prevState[elem.name], elemValue),
    }));

    if (checkValues()) this.setState({ allValid: checkValues() });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formValues = this.reduceFormValues(form.elements);
    const allFieldsValid = this.checkAllFieldsValid(formValues);

    console.log(allFieldsValid);

    if (allFieldsValid) {
      this.onSubmitMail(formValues, allFieldsValid);
    }

    this.setState({ ...formValues, allFieldsValid });
  };

  onSubmitMail = (formValues, allFieldsValid) => {
    if (allFieldsValid) {
      // send data to mail
      const baseURL = process.env.REACT_APP_API_URL;
      const company = formValues.company.value;
      const category = formValues.category.value;
      const contact = formValues.contact.value;
      const name = formValues.name.value;
      const email = formValues.email.value;
      const message = formValues.message.value;
      const body = {
        service_name: name,
        client_name: company,
        client_phone_number: contact,
        client_email: email,
        inquiry_category: category,
        inquiry_content: message,
      };

      console.log('Now Loading');
      this.setState({ isSending: true, ...formValues, allFieldsValid });

      axios.post(`${baseURL}/inquiries/`, body)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            this.setState({ isSending: false });
            this.setState({ isAlert: true });
            setTimeout(() => {
              this.setState({ isAlert: false }, () => {
                this.onReset(allFieldsValid);
                this.handleMailPopup();
              });
            }, 2000);
          } else {
            alert('시스템 오류로 인해 메일 전송에 실패했습니다.\nhi.dbdlab@gmail.com로 문의해 주세요.');
            this.setState({
              isSending: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);

          alert('시스템 오류로 인해 메일 전송에 실패했습니다.\nhi.dbdlab@gmail.com로 문의해 주세요.');
          this.setState({
            isSending: false,
          });
        });
    }
  };

  onReset = () => {
    const {
      category, email, message, name, contact, company,
    } = this.state;
    const init = {
      category: { ...category, value: '', valid: true },
      email: { ...email, value: '', valid: true },
      message: { ...message, value: '', valid: true },
      name: { ...name, value: '', valid: true },
      contact: { ...contact, value: '', valid: true },
      company: { ...company, value: '', valid: true },
    };

    this.setState({ allFieldsValid: false, allValid: false, ...init });
    this.form.reset();
  };

  preventScroll = (el) => {
    const { scrollTop, offsetHeight, scrollHeight } = el;

    if (scrollTop === 0) {
      el.scrollTo(0, 1);
      return true;
    }

    if (scrollTop + offsetHeight >= scrollHeight) {
      el.scrollTo(0, scrollHeight - offsetHeight - 1);
      return true;
    }

    return false;
  };

  handleTouchMove = (e) => {
    const { isOpen } = this.props;

    if (isOpen) e.preventDefault();
  };

  onTouchMove = () => {
    const wrap = document.querySelector('.wrap');
    const body = document.querySelector('body');
    const windowWidth = window.innerWidth;
    const { isOpen } = this.props;

    if (isOpen && windowWidth < 1200) {
      window.addEventListener('touchmove', this.handleTouchMove, {
        passive: false,
      });
      body.setAttribute('style', 'height: 100%; overflow: hidden');
      wrap.setAttribute('style', 'height: 100%; overflow: hidden');
    }
  };

  handleMailPopup = () => {
    const wrap = document.querySelector('.wrap');
    const body = document.querySelector('body');
    const windowWidth = window.innerWidth;
    // eslint-disable-next-line no-shadow
    const { togglePopup } = this.props;

    if (windowWidth < 1200) body.removeAttribute('style');
    wrap.removeAttribute('style');
    // e.preventDefault()
    window.removeEventListener('touchmove', this.handleTouchMove);
    this.onReset();
    // this.setState(prevState => ({ value: !prevState.value }));
    togglePopup(false);
  };

  render() {
    const {
      company,
      category,
      email,
      name,
      contact,
      message,
      isSending,
      allFieldsValid,
      allValid,
    } = this.state;
    const { isOpen, isPop } = this.props;
    const {
      preventScroll, ErrorTxt, Loading, Alert,
    } = this;
    const renderCompanyValidationError = company.valid ? '' : <ErrorTxt txt={company.requiredTxt} />;
    const renderNameValidationError = name.valid ? '' : <ErrorTxt txt={name.requiredTxt} />;
    const renderContactValidationError = contact.valid ? '' : <ErrorTxt txt={contact.formatErrorTxt} />;
    const renderCategoryValidationError = category.valid ? '' : <ErrorTxt txt={category.requiredTxt} />;
    const renderEmailValidationError = email.valid ? '' : <ErrorTxt txt={email.typeMismatch ? email.formatErrorTxt : email.requiredTxt} />;
    const renderMsgValidationError = message.valid ? '' : <ErrorTxt txt={message.requiredTxt} />;
    const renderLoaing = isSending ? <Loading /> : null;

    return (
      <div className={`container--popup${isOpen || isPop ? ' popup--open' : ''}`}>
        <div className="container-inner">
          <div
            className="box-popup"
            ref={(popup) => { this.popup = popup; }}
            onScroll={e => preventScroll(e.currentTarget)}
            onTouchMove={(e) => {
              if (!preventScroll(e.currentTarget)) e.stopPropagation();
            }}
          >
            <h1 className="popup__title">문의하기</h1>
            <form className="form" ref={(ref) => { this.form = ref; }} method="POST" onSubmit={this.onSubmit} noValidate>
              <fieldset>
                <legend>메일 문의</legend>
                <div className="formbox__left">
                  <p className="form__inputbox">
                    <label htmlFor="company">
                      <span>기업명/서비스명*</span>
                      <input
                        placeholder="(주)서비스"
                        aria-describedby="(주)서비스"
                        type="text"
                        name="company"
                        onChange={this.onChange}
                        className={`form-item__input${company.valid ? '' : ' input--error'}`}
                        required
                      />
                    </label>
                    {renderCompanyValidationError}
                  </p>
                  <p className="form__inputbox">
                    <label htmlFor="name">
                      <span>이름*</span>
                      <input
                        placeholder="태수투"
                        aria-describedby="태수투"
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        className={`form-item__input${name.valid ? '' : ' input--error'}`}
                        required
                      />
                    </label>
                    {renderNameValidationError}
                  </p>
                  <p className="form__inputbox">
                    <label htmlFor="contact">
                      <span>휴대폰 번호*</span>
                      <input
                        placeholder="0101232641"
                        aria-describedby="0101232641"
                        type="tel"
                        name="contact"
                        onChange={this.onChange}
                        pattern="^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}"
                        maxLength="11"
                        className={`form-item__input${contact.valid ? '' : ' input--error'}`}
                        required
                      />
                    </label>
                    {renderContactValidationError}
                  </p>
                  <p className="form__inputbox">
                    <label htmlFor="email">
                      <span>이메일*</span>
                      <input
                        placeholder="test@realdopt.com"
                        aria-describedby="이메일 입력"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        className={`form-item__input${email.valid ? '' : ' input--error'}`}
                        required
                      />
                    </label>
                    {renderEmailValidationError}
                  </p>
                </div>
                <div className="formbox__right">
                  <p className="form__selectbox">
                    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                    <label htmlFor="category">
                      <span>문의 카테고리*</span>
                      <select
                        name="category"
                        className={`form-item__select${category.valid ? '' : ' select--error'}`}
                        defaultValue=""
                        onChange={this.onChange}
                        required
                      >
                        <option value="" disabled>선택해주세요</option>
                        <option value="plan">plan</option>
                        <option value="테스트 설계">테스트 설계</option>
                        <option value="가격 문의">가격 문의</option>
                        <option value="리얼답 리포트">리얼답 리포트</option>
                        <option value="엑셀러레이터, 인큐베이터 협업">엑셀러레이터, 인큐베이터 협업</option>
                        <option value="데모데이, 창업경진대회 협업">데모데이, 창업경진대회 협업</option>
                      </select>
                    </label>
                    {renderCategoryValidationError}
                  </p>
                  <p className="form__textbox">
                    <label htmlFor="message">
                      <span>문의 내용*</span>
                      <textarea
                        className={`form-item__textarea${message.valid ? '' : ' textbox--error'}`}
                        rows="6"
                        name="message"
                        onChange={this.onChange}
                        aria-describedby="문의 내용 입력"
                        placeholder="문의 내용 입력"
                        required
                      />
                    </label>
                    {renderMsgValidationError}
                  </p>
                </div>
                <div className="box__button">
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button type="reset" className="btn__cancle" onClick={this.handleMailPopup}>취소</button>
                  <button type="submit" className={`btn__submit${allFieldsValid || allValid ? ' submit' : ''}`}>문의하기</button>
                </div>
              </fieldset>
            </form>
            {renderLoaing}
            <Alert />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.popup.isOpen,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailPopup);
