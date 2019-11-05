/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { reduxForm, Field, getFormValues } from 'redux-form';
import LoadingIndicator from 'components/LoadingIndicator';
import ToastAlert from 'components/ToastAlert';
import { getAuthSelf } from 'modules/auth';
import {
  getProject,
  patchProject,
  inviteProject,
  banProject,
} from 'modules/project';
import { getCategoryItem } from 'modules/category';
import './TeamMemberList.scss';

const categoryRequired = value => (value ? undefined : '카테고리를 선택해주세요');
const seriveInfoRequired = value => (value ? undefined : 'URL 또는 어플리케이션 명을 입력해주세요');
const servieRequired = value => (value ? undefined : '서비스명을 입력해주세요');
const emailRegexp = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? '이메일 형식을 다시 확인해주세요' : undefined);
const hasMember = (value, memberList) => {
  if (value) {
    const hasMember = memberList.indexOf(value) > -1;

    if (hasMember) return '이미 초대 된 멤버입니다';
    return undefined;
  }
  return undefined;
};

class TeamMemberList extends Component {
  mounted = false;

  state = {
    isDisabled: false,
    isLoading: false,
    isExtended: false,
    isLayerOpen: false,
    selectedList: 0,
    inputArr: [0],
    memberArr: [],
    toastTitle: '',
    toastSubtitle: '',
    isToastShow: false,
  };

  componentDidMount() {
    const { props } = this;
    const { project } = props;

    this.mounted = true;

    props.getAuthSelf().then(() => {
      const { id } = props;
      const isManager = project.members.find(arr => arr.id === id).is_manager;

      if (!isManager) this.setState({ isDisabled: true });
    });

    props.getProject(project.id)
      .then((res) => {
        const { members } = res.data;
        const memberMailList = members.map(x => x.email);

        this.setState({ memberArr: memberMailList });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
      });

    this.getCategory();
  }

  componentDidUpdate() {
    const { list } = this;

    if (list !== undefined && list !== null) {
      list.scrollTop = list.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState({ isExtended: false });
  }

  getCategory = async () => {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getCategoryItem(2);
    await props.getCategoryItem(3).then(this.setState({ isLoading: false }));
  };

  handleMenuToggle = (idx) => {
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

  handleLinkCopy = (e) => {
    this.link.select();
    document.execCommand('copy');

    this.setState({
      toastTitle: 'Copied!',
      toastSubtitle: '링크를 복사했습니다',
      isToastShow: true,
    }, () => {
      setTimeout(() => {
        this.setState({ isToastShow: false });
      }, 2200);
    });

    e.preventDefault();
  }

  handleBlur = (e) => {
    e.preventDefault();

    if (this.mounted) {
      setTimeout(() => {
        this.setState({
          isExtended: false,
        });
      }, 300);
    }
  }

  // eslint-disable-next-line consistent-return
  onSend = (e) => {
    const {
      change,
      fieldValues,
      project,
      getProject,
      inviteProject,
    } = this.props;
    const { inputArr } = this.state;
    const emailValueList = inputArr.map(a => fieldValues[`inviteEmail${a}`]);

    e.preventDefault();

    while (emailValueList.indexOf(undefined) !== -1) {
      emailValueList.splice(emailValueList.indexOf(undefined), 1);
    }

    const emailList = emailValueList.reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);

    if (emailList.length < 1) {
      alert('1개 이상의 이메일을 입력해 주세요');
      return false;
    }

    const reg = emailList.map(email => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));

    if (reg.indexOf(true) !== -1) {
      alert('이메일 형식을 다시 한 번 확인해 주세요');
      return false;
    }

    getProject(project.id)
      .then((res) => {
        const { members } = res.data;
        const memberMailList = members.map(x => x.email);
        const hasMember = memberMailList.some(m => emailList.indexOf(m) > -1);

        if (hasMember) {
          alert('이미 팀원인 메일이 있어요!\n팀원은 다시 초대하실 수 없습니다.');
        } else {
          inviteProject(project.id, emailList)
            .then((res) => {
              if (res.status === 201 && res.data.result === 'success') {
                inputArr.map(a => change([`inviteEmail${a}`], ''));
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
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
      });
  }

  onBan = (e, idx) => {
    e.preventDefault();

    const {
      project,
      getProject,
      banProject,
      getAuthSelf,
      id,
    } = this.props;
    const { protocol } = window.location;
    const { email } = project.members.filter(x => x.id === idx)[0];
    const submit = window.confirm('해당 멤버를 팀에서 제외 시키시겠어요?\n제외된 멤버는 프로젝트 확인이 되지 않으며,\n프로젝트 공유를 위해서는 다시 초대해 주셔야 합니다.');

    if (submit) {
      getAuthSelf().then(() => {
        const isManager = project.members.find(arr => arr.id === id).is_manager;

        banProject(project.id, [email])
          .then((res) => {
            if (res.status === 204) {
              this.setState({
                toastTitle: '작업이 완료되었어요',
                toastSubtitle: '팀원이 제외되었습니다',
                isToastShow: true,
              }, () => {
                setTimeout(() => {
                  this.setState({ isToastShow: false });
                  getProject(project.id);
                  if (!isManager) {
                    window.location.assign(`${protocol}//${process.env.REACT_APP_PARTNER_URL}/project`);
                  }
                }, 2200);
              });
            }
          }).catch((err) => {
            console.log(err);
            console.log(err.message);
            console.log(err.response);

            alert(`Oops! :(\n${err.response.data.detail}`);
          });
      });
    }
  }

  onSubmit = (values) => {
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
    ).then(() => {
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
      id,
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
      memberArr,
      toastTitle,
      toastSubtitle,
      isToastShow,
    } = this.state;
    const {
      handleMenuToggle,
      onBan,
      handleInvitePopupToggle,
      handleInputAdd,
      handleLinkCopy,
      handleBlur,
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
                            <>
                              {memberList.map((m) => {
                                const userName = m.name === '' ? m.email.substring(0, m.email.indexOf('@')) : m.name;

                                return (
                                  m.is_manager
                                    ? (
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
                                              <i className="badge">팀장</i>
                                            </span>
                                            <span className="info__email">{m.email}</span>
                                          </span>
                                        </div>
                                      </li>
                                    )
                                    : null
                                );
                              })}
                              {memberList.sort((a, b) => a.id - b.id).map((m, idx) => {
                                const userName = m.name === '' ? m.email.substring(0, m.email.indexOf('@')) : m.name;

                                return (
                                  m.is_manager
                                    ? null
                                    : (
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
                                            </span>
                                            <span className="info__email">{m.email}</span>
                                            {isDisabled && (id !== m.id)
                                              ? null
                                              : (
                                                <button
                                                  type="button"
                                                  className="btn-menu"
                                                  onClick={() => handleMenuToggle(idx)}
                                                  onBlur={e => handleBlur(e)}
                                                >
                                                  팀원 관리하기
                                                </button>
                                              )
                                            }
                                            <ul
                                              className={`menu-list${isExtended && selectedList === idx ? '--extended' : ''}`}
                                            >
                                              <li className="list__item">
                                                <button
                                                  type="button"
                                                  className="btn-ban"
                                                  onClick={e => onBan(e, m.id)}
                                                >
                                                  추방하기
                                                </button>
                                              </li>
                                            </ul>
                                          </span>
                                        </div>
                                      </li>
                                    )
                                );
                              })}
                            </>
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
                                validate={[emailRegexp, value => hasMember(value, memberArr)]}
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
                          setRef={(ref) => { this.link = ref; }}
                          component={FormInput}
                          readOnly
                        />
                      </div>
                    </div>
                    <button type="button" className="btn-copy" onClick={e => handleLinkCopy(e)}>복사하기</button>
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
  banProject: (id, email) => dispatch(banProject(id, email)),
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
