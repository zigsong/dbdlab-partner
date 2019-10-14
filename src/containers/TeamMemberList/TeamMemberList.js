/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { reduxForm, Field, getFormValues } from 'redux-form';
import LoadingIndicator from 'components/LoadingIndicator';
import ToastAlert from 'components/ToastAlert';
import { getAuthSelf } from 'modules/auth';
import { getProject, patchProject, inviteProject } from 'modules/project';
import { getCategoryItem } from 'modules/category';
import './TeamMemberList.scss';

const categoryRequired = value => (value ? undefined : '카테고리를 선택해주세요');
const seriveInfoRequired = value => (value ? undefined : 'URL 또는 어플리케이션 명을 입력해주세요');
const servieRequired = value => (value ? undefined : '서비스명을 입력해주세요');
const emailRegexp = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? '이메일 형식을 다시 확인해주세요' : undefined);

class TeamMemberList extends Component {
  state = {
    isDisabled: false,
    isLoading: false,
    isExtended: false,
    isLayerOpen: false,
    selectedList: 0,
    inputArr: [0],
    toastTitle: '',
    toastSubtitle: '',
    isToastShow: false,
  };

  componentDidMount() {
    const { props } = this;
    const { project } = props;

    props.getAuthSelf().then(() => {
      const { id } = props;
      const isManager = project.members.find(arr => arr.id === id).is_manager;

      if (!isManager) this.setState({ isDisabled: true });
    });

    this.getCategory();
  }

  componentDidUpdate() {
    const { list } = this;

    if (list !== undefined && list !== null) {
      list.scrollTop = list.scrollHeight;
    }
  }

  getCategory = async () => {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getCategoryItem(2);
    await props.getCategoryItem(3).then(this.setState({ isLoading: false }));
  };

  handleMenuToggle = (e, idx) => {
    e.preventDefault();
    console.log(idx);

    this.setState(prevState => ({
      selectedList: idx,
      isExtended: !prevState.isExtended,
    }));
  }

  handleInvitePopupToggle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isLayerOpen: !prevState.isLayerOpen }));
  }

  handleInputAdd = (e) => {
    const { inputArr } = this.state;

    e.preventDefault();

    if (inputArr.length > 9) {
      alert('한 번에 10명까지 초대 가능합니다');
    } else {
      this.setState({
        inputArr: [...inputArr, inputArr.length],
      });
    }
  }

  // eslint-disable-next-line consistent-return
  onSend = (e) => {
    const {
      fieldValues,
      project,
      getProject,
      inviteProject,
    } = this.props;
    const { inputArr } = this.state;
    const emailList = inputArr.map(a => fieldValues[`inviteEmail${a}`]);

    e.preventDefault();

    while (emailList.indexOf(undefined) !== -1) {
      emailList.splice(emailList.indexOf(undefined), 1);
      console.log(emailList);
    }

    console.log(emailList);
    console.log(emailList.length);

    if (emailList.length < 1) {
      alert('1개 이상의 이메일을 입력해 주세요');
      // this.setState({
      //   toastTitle: '이메일을 입력해 주세요!',
      //   toastSubtitle: '1개 이상 입력해 주셔야 합니다',
      //   isToastShow: true,
      // });

      return false;
    }

    const reg = emailList.map(email => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));

    if (reg.indexOf(true) !== -1) {
      alert('이메일 형식을 다시 한 번 확인해 주세요');
      // this.setState({
      //   toastTitle: '다시 한 번 확인해 주세요',
      //   toastSubtitle: '이메일 형식을 다시 한 번 확인해 주세요',
      //   isToastShow: true,
      // });

      return false;
    }

    inviteProject(project.id, emailList)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.data.result === 'success') {
          this.setState({
            toastTitle: '발송되었습니다!',
            toastSubtitle: '팀원을 초대했어요:)',
            isToastShow: true,
          }, () => {
            setTimeout(() => {
              this.setState({ isToastShow: false });
              getProject(project.id);
            }, 2200);
          });
        }
      }).catch((err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
      });
  }

  onSubmit = (values) => {
    console.log(values);
    const { props } = this;
    const { id } = props.project;
    const {
      service,
      company,
      serviceInfo,
      serviceCategory,
      serviceFormat,
      serviceDesc,
    } = values;

    props.patchProject(
      id,
      service,
      company,
      serviceInfo,
      serviceCategory,
      serviceFormat,
      serviceDesc,
    ).then((res) => {
      console.log(res);
      this.setState({
        toastTitle: 'Saved!',
        toastSubtitle: '성공적으로 수정되었어요:)',
        isToastShow: true,
      });
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
    });
  }

  render() {
    const {
      handleSubmit,
      onReset,
      category,
      project,
      fieldValues,
      invitePending,
      pristine,
    } = this.props;
    const {
      isDisabled,
      isLoading,
      isExtended,
      selectedList,
      isLayerOpen,
      inputArr,
      toastTitle,
      toastSubtitle,
      isToastShow,
    } = this.state;
    const {
      handleMenuToggle,
      handleInvitePopupToggle,
      handleInputAdd,
      onSend,
      onSubmit,
    } = this;
    const service1Category = Object.keys(category).length > 0
      ? category[0].category_items.map(c => c.name) : [];
    const service2Category = Object.keys(category).length > 1
      ? category[1].category_items.map(c => c.name) : [];
    const memberList = project.members !== undefined ? project.members : [];
    const projectName = fieldValues !== undefined ? fieldValues.service : undefined;
    const serviceInfoValue = fieldValues !== undefined ? fieldValues.serviceInfo : undefined;
    const serviceCategoryValue = fieldValues !== undefined
      ? fieldValues.serviceCategory
      : undefined;
    const serviceFormatValue = fieldValues !== undefined ? fieldValues.serviceFormat : undefined;

    console.log(project);
    return (
      isLoading
        ? <LoadingIndicator />
        : (
          <>
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
                  {isDisabled
                    ? null
                    : (
                      <div className="form__btn-wrapper">
                        <button type="button" className="btn-cancle" onClick={onReset}>취소</button>
                        <button
                          type="submit"
                          className={`
                            btn-submit${projectName !== undefined && serviceInfoValue !== undefined && serviceCategoryValue !== undefined && serviceFormatValue !== undefined && !pristine ? '--active' : ''}
                          `}
                        >
                          확인
                        </button>
                      </div>
                    )
                  }
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
                            memberList.sort((a, b) => a.id - b.id).map((m, idx) => {
                              const userName = m.name === '' ? m.email.substring(0, m.email.indexOf('@')) : m.name;
                              return (
                                <li className="list-team__item" key={m.email}>
                                  <div className="box-member">
                                    <span className="member__profile">
                                      <i className="box-img">
                                        <img src={m.avatar_url} alt={`${userName}님의 프로필`} />
                                      </i>
                                    </span>
                                    <span className="member__info">
                                      <span className="info__name">
                                        <span className="name">{userName}</span>
                                        {m.is_manager ? <i className="badge">팀장</i> : null}
                                      </span>
                                      <span className="info__email">{m.email}</span>
                                    </span>
                                    {isDisabled
                                      ? null
                                      : (
                                        <button
                                          type="button"
                                          className="btn-menu"
                                          onClick={e => handleMenuToggle(e, idx)}
                                        >
                                          팀원 관리하기
                                        </button>
                                      )
                                    }
                                    <ul
                                      className={`menu-list${isExtended && selectedList === idx ? '--extended' : ''}`}
                                    >
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
                        <ol className="list-input" ref={(ref) => { this.list = ref; }}>
                          {inputArr.map(a => (
                            <li className="list__item" key={a}>
                              <span className="item-num">
                                {a + 1}
                                .
                              </span>
                              <Field
                                name={`inviteEmail${a}`}
                                type="text"
                                label={`inviteEmail${a}`}
                                placeholder="텍스트 입력"
                                component={FormInput}
                                validate={emailRegexp}
                              />
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="box-btn">
                        <button type="button" className="btn-add" onClick={e => handleInputAdd(e)}>+ 메일 추가하기</button>
                        <button type="button" className="btn-invite--submit" onClick={e => onSend(e)}>초대하기</button>
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
            {isToastShow
              ? (
                <ToastAlert
                  title={toastTitle}
                  subtitle={toastSubtitle}
                  isShow={isToastShow}
                />
              )
              : null}
            {invitePending
              ? <LoadingIndicator />
              : null}
          </>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const { category } = state.category;
  const { project } = state.project;
  const { invitePending } = state.project;
  const { id } = state.auth.users;
  // console.log(invitePending);

  return {
    fieldValues: getFormValues('teamForm')(state),
    category,
    project,
    invitePending,
    id,
  };
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getCategoryItem: cId => dispatch(getCategoryItem(cId)),
  getProject: pId => dispatch(getProject(pId)),
  patchProject: (
    id,
    service,
    company,
    serviceInfo,
    serviceCategory,
    serviceFormat,
    serviceDesc,
  ) => dispatch(patchProject(
    id,
    service,
    company,
    serviceInfo,
    serviceCategory,
    serviceFormat,
    serviceDesc,
  )),
  inviteProject: (id, email) => dispatch(inviteProject(id, email)),
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
