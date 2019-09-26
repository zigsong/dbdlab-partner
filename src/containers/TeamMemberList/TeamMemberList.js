import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { reduxForm, Field } from 'redux-form';
import LoadingIndicator from 'components/LoadingIndicator';
import { getCategoryItem } from 'modules/category';
import './TeamMemberList.scss';

const categoryRequired = value => (value ? undefined : '카테고리를 선택해주세요');
const seriveInfoRequired = value => (value ? undefined : 'URL 또는 어플리케이션 명을 입력해주세요');
const servieRequired = value => (value ? undefined : '서비스명을 입력해주세요');

const DisabledLayer = () => (
  <div className="layer--disabled">아직은 입력하실 수 없어요!</div>
);

class TeamMemberList extends Component {
  state = {
    isDisabled: false,
    isLoading: false,
    isExtended: false,
    isLayerOpen: false,
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = async () => {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getCategoryItem(2);
    await props.getCategoryItem(3).then(this.setState({ isLoading: false }));
  };

  handleMenuToggle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isExtended: !prevState.isExtended }));
  }

  handleInvitePopupToggle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isLayerOpen: !prevState.isLayerOpen }));
  }

  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    const {
      handleSubmit,
      onReset,
      category,
      project,
      projectName,
      serviceInfoValue,
      serviceCategoryValue,
      serviceFormatValue,
      valid,
    } = this.props;
    const {
      isDisabled,
      isLoading,
      isExtended,
      isLayerOpen,
    } = this.state;
    const {
      handleMenuToggle,
      handleInvitePopupToggle,
      onSubmit,
    } = this;
    const service1Category = Object.keys(category).length > 0
      ? category[0].category_items.map(c => c.name) : [];
    const service2Category = Object.keys(category).length > 1
      ? category[1].category_items.map(c => c.name) : [];
    const memberList = project.members !== undefined ? project.members : [];

    return (
      isLoading
        ? <LoadingIndicator />
        : (
          <form className="team__form" onSubmit={handleSubmit(values => onSubmit(values))}>
            <div className="form-wrapper">
              <section className="form__section">
                <div className="field">
                  <span className="field__title">
                    <strong className="title">프로젝트명(서비스명)*</strong>
                  </span>
                  <Field
                    name="service"
                    type="text"
                    label="service"
                    placeholder="텍스트 입력"
                    component={FormInput}
                    disabled={isDisabled}
                    validate={[servieRequired]}
                  />
                </div>
                <div className="field">
                  <span className="field__title">
                    <strong className="title">기업명</strong>
                  </span>
                  <Field
                    name="company"
                    type="text"
                    label="company"
                    placeholder="텍스트 입력"
                    component={FormInput}
                    disabled={isDisabled}
                  />
                </div>
                <div className="field">
                  <span className="field__title">
                    <strong className="title">서비스 URL 또는 어플리케이션 명*</strong>
                  </span>
                  <Field
                    name="serviceInfo"
                    type="text"
                    label="serviceInfo"
                    placeholder="서비스 URL 또는 어플리케이션 명 입력"
                    component={FormInput}
                    disabled={isDisabled}
                    validate={[seriveInfoRequired]}
                  />
                </div>
                <div className="field-column">
                  <span className="field__title">
                    <strong className="title">서비스 분야*</strong>
                  </span>
                  <Field
                    name="serviceCategory"
                    type="select"
                    component={FormSelect}
                    disabled={isDisabled}
                    validate={categoryRequired}
                    defaultValue="카테고리 선택"
                  >
                    <option value="카테고리 선택" disabled>카테고리 선택</option>
                    {service1Category.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </Field>
                </div>
                <div className="field-column">
                  <span className="field__title">
                    <strong className="title">서비스 형태*</strong>
                  </span>
                  <Field
                    name="serviceFormat"
                    type="select"
                    component={FormSelect}
                    disabled={isDisabled}
                    validate={categoryRequired}
                    defaultValue="카테고리 선택"
                  >
                    <option value="카테고리 선택" disabled>카테고리 선택</option>
                    {service2Category.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </Field>
                </div>
                <div className="field">
                  <span className="field__title">
                    <strong className="title">서비스 소개</strong>
                  </span>
                  <Field
                    name="serviceDesc"
                    type="text"
                    label="serviceDesc"
                    placeholder="00자 내외 텍스트 입력"
                    component={FormInput}
                    disabled={isDisabled}
                  />
                </div>
                <div className="form__btn-wrapper">
                  <button type="button" className="btn-cancle" onClick={onReset}>취소</button>
                  <button
                    type="submit"
                    className={`
                      btn-submit${projectName !== undefined && serviceInfoValue !== undefined && serviceCategoryValue !== undefined && serviceFormatValue !== undefined && valid ? '--active' : ''}
                    `}
                  >
                    프로젝트 만들기
                  </button>
                </div>
              </section>
              <section className="form__section">
                <div className="section__title">
                  <span className="title__text">우리팀원</span>
                  <button type="button" className="btn-invite" onClick={e => handleInvitePopupToggle(e)}>+ 초대하기</button>
                </div>
                <div className="section__team-list">
                  <ol className="list-team">
                    {
                      memberList.length > 0
                        ? (
                          memberList.map((m) => {
                            const userName = m.name === '' ? m.email.substring(0, m.email.indexOf('@')) : m.name;
                            return (
                              <li className="list-team__item" key={m.email}>
                                <div className="box-member">
                                  <span className="member__profile">
                                    <i className="box-img">
                                      <img src={`https://qa-server.realdopt.com${m.avatar_url}`} alt={`${userName}님의 프로필`} />
                                    </i>
                                  </span>
                                  <span className="member__info">
                                    <span className="info__name">
                                      {userName}
                                      {m.is_manager ? <i className="badge">팀장</i> : null}
                                    </span>
                                    <span className="info__email">{m.email}</span>
                                  </span>
                                  {m.is_manager
                                    ? null
                                    : (
                                      <button
                                        type="button"
                                        className="btn-menu"
                                        onClick={e => handleMenuToggle(e)}
                                      >
                                        팀원 관리하기
                                      </button>
                                    )}
                                  <ul className={`menu-list${isExtended ? '--extended' : ''}`}>
                                    <li className="list__item">
                                      <button type="button">추방하기</button>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            );
                          })
                        )
                        : (
                          <li className="list-team__item">
                            <div className="box-member">아직 팀원이 없어요!</div>
                          </li>
                        )
                    }
                  </ol>
                </div>
                <div className={`section__team-invite${isLayerOpen ? '--active' : ''}`}>
                  <span className="invite__title">초대하기</span>
                  <div className="invite__inputbox">
                    <div className="box-input">
                      <span className="box__title">
                        <strong className="title">이메일</strong>
                      </span>
                      <Field
                        name="inviteEmail"
                        type="text"
                        label="inviteEmail"
                        placeholder="텍스트 입력"
                        component={FormInput}
                      />
                    </div>
                    <div className="box-btn">
                      <button type="button" className="btn-add">+ 메일 추가하기</button>
                      <button type="button" className="btn-invite--submit">초대하기</button>
                    </div>
                  </div>
                  <div className="invite__linkbox">
                    <div className="box-input">
                      <span className="box__title">
                        <strong className="title">링크 복사</strong>
                      </span>
                      <Field
                        name="inviteLink"
                        type="text"
                        label="inviteLink"
                        component={FormInput}
                      />
                    </div>
                  </div>
                  <button type="button" className="btn-copy">복사하기</button>
                </div>
              </section>
            </div>
          </form>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const { category } = state.category;

  return {
    category,
  };
};

const mapDispatchToProps = dispatch => ({
  getCategoryItem: cId => dispatch((getCategoryItem(cId))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'teamForm',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch, submitError, props) => {
    console.log(errors, dispatch, submitError, props);
  },
  onSubmitSuccess: () => {
    console.log('success');
  },
})(TeamMemberList));
