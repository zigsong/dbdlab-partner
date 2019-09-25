import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { reduxForm, Field } from 'redux-form';
import LoadingIndicator from 'components/LoadingIndicator';
import { getProject } from 'modules/project';
import { getCategoryItem } from 'modules/category';
import './TeamMemberList.scss';

const mediaRequired = value => (value ? undefined : '카테고리를 선택해주세요');
const seriveInfoRequired = value => (value ? undefined : 'URL 또는 어플리케이션 명을 입력해주세요');
const serviceStatusRequired = value => (value ? undefined : '서비스 단계를 선택해주세요');
const clientNameRequired = value => (value ? undefined : '이름을 입력해주세요');
const clientContactRequired = value => (value ? undefined : '연락처를 입력해주세요');
const clientContactRegexp = value => (value && !/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(value) ? '연락처 형식을 다시 확인해주세요' : undefined);
const emailRequired = value => (value ? undefined : '이메일을 입력해주세요');
const emailRegexp = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? '이메일 형식을 다시 확인해주세요' : undefined);

const DisabledLayer = () => (
  <div className="layer--disabled">아직은 입력하실 수 없어요!</div>
);

class TeamMemberList extends Component {
  state = {
    isDisabled: false,
    isLoading: false,
    isExtended: false,
  }

  componentDidMount() {
    console.log(this.props);
    const { props } = this;
    const pId = props.projectId;
    this.getProject(pId);
    // props.getProject(pId).then(res => console.log(res));
  }

  getProject = async (pId) => {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getProject(pId);
    await props.getCategoryItem(2);
    await props.getCategoryItem(3).then(this.setState({ isLoading: false }));
  };

  handleMenuToggle = () => {
    // this.setState((prevState) => {
    //   isExtended: !prevState.isExtended,
    // })
  }

  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    const {
      handleSubmit,
      onReset,
      category,
      members,
    } = this.props;
    const { isDisabled, isLoading } = this.state;
    const { onSubmit } = this;
    const service1Category = Object.keys(category).length > 0
      ? category[0].category_items.map(c => c.name) : [];
    const service2Category = Object.keys(category).length > 1
      ? category[1].category_items.map(c => c.name) : [];
    console.log(this.props);
    const memberList = members !== undefined ? members : [];

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
                    validate={[seriveInfoRequired]}
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
                    validate={[seriveInfoRequired]}
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
                    validate={mediaRequired}
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
                    validate={mediaRequired}
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
                  {/* <button type="submit" className={`btn-submit${service !== undefined && serviceInfo !== undefined && serviceCategory !== undefined && serviceFormat !== undefined ? '--active' : ''}`} onClick={handleSubmit}>프로젝트 만들기</button> */}
                </div>
              </section>
              <section className="form__section">
                <div className="section__title">
                  <span className="title__text">우리팀원</span>
                  <button type="button" className="btn-invite">+ 초대하기</button>
                </div>
                <div className="section__teamList">
                  <ol className="list-team">
                    {
                      memberList.length > 0
                        ? (
                          memberList.map(m => (
                            <li className="list-team__item" key={m.email}>
                              <div className="box-member">
                                <span className="member__profile">
                                  <i className="box-img">
                                    <img src={`https://qa-server.realdopt.com${m.avatar_url}`} alt={`${m.name}님의 프로필`} />
                                  </i>
                                </span>
                                <span className="member__info">
                                  <span className="info__name">
                                    {m.name}
                                    {m.is_manager ? <i className="badge">팀장</i> : null}
                                  </span>
                                  <span className="info__email">{m.email}</span>
                                </span>
                                <button type="button" className="btn-menu">팀원 관리하기</button>
                                <ul className="menu-list">
                                  <li className="list__item">
                                    <button type="button">추방하기</button>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          ))
                        )
                        : (
                          <li className="list-team__item">
                            <div className="box-member">아직 팀원이 없어요!</div>
                          </li>
                        )
                    }
                  </ol>
                </div>
              </section>
            </div>
          </form>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const { project } = state.project;
  const { category } = state.category;
  console.log(category);

  return {
    projectName: project.name,
    companyName: project.company_name,
    serviceInfoValue: project.service_extra_info,
    serviceCategoryValue: project.service_category,
    serviceFormatValue: project.service_format,
    serviceDesc: project.service_description,
    members: project.members,
    category,
  };
};

const mapDispatchToProps = dispatch => ({
  getProject: pId => dispatch(getProject(pId)),
  getCategoryItem: cId => dispatch((getCategoryItem(cId))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'teamForm',
})(TeamMemberList));
