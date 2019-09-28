/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, FormSection, reduxForm, getFormValues, getFormMeta,
} from 'redux-form';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  setTestInit, getTest, postTest, patchTest,
} from 'modules/test';
import {
  getTarget,
  patchTarget,
  postTargetExtra,
  patchTargetExtra,
} from 'modules/target';
import { patchQuest } from 'modules/quest';
import { getCategories } from 'modules/category';
import { getPlanList } from 'modules/plan';
import RightSidebar from './RightSidebar';
import {
  TestFormDefault, TestFormTarget, TestFormQuest, TestFormPay, TestFormReport,
} from './TesrForm';
import './NewTestForm.scss';

const DisabledLayer = () => (
  <div className="layer--disabled">아직은 입력하실 수 없어요!</div>
);

const PayAccountinfo = ({ submit }) => (
  <div className="field-wrapper--pay-info">
    <div className="wrapper-inner">
      <p className="pay-info__text">
        <strong>리얼답을 이용해주셔서 감사합니다.</strong>
        <br />
        아래 계좌정보로 입금해주시면 확인 후,
        <br />
        매니저 배정 후 테스트 진행을 도와드리겠습니다.
      </p>
      <p className="pay-info__account">
        <span className="account__title">입금계좌</span>
        <strong className="account_info">기업은행   010-7627-3455   김인정</strong>
        <span className="account__title">입금액</span>
        <strong className="account_info">1,500,000원</strong>
      </p>
      <button type="button" className="btn__tax-invoice" onClick={() => alert('클릭해도 볼 수 없다구..후훟..')}>세금계산서 신청하기</button>
      <button type="button" className="btn__confirm" onClick={submit}>확인</button>
    </div>
  </div>
);

class NewTestForm extends Component {
  state = {
    isLoading: false,
    isDefaultRendered: true,
    isTargetRendered: false,
    isQuestRendered: false,
    isPayRendered: false,
    isAllRendered: false,
    isReportRendered: false,
    isDefaultPassed: false,
    isTargetPassed: false,
    isQuestPassed: false,
    isPayPassed: false,
    isAllPassed: false,
    hasReport: false,
    test: {},
  }

  componentDidMount() {
    const {
      route,
      getTest,
      getCategories,
      getPlanList,
      getTarget,
    } = this.props;
    const { match } = route;
    const { tId } = match.params;
    const getTestContent = async () => {
      await getTest(tId)
        .then(
          () => {
            const { test, targets, quests } = this.props;
            const {
              id,
              title,
              step,
              client_name,
              client_phone_number,
              client_email,
              media_category_1,
              media_category_2,
              service_extra_info,
              service_category,
              service_format,
              service_description,
              service_status,
              funnel,
              staff,
              project_id,
              create_user_id,
              created_at,
            } = test;

            getTarget(targets[0].id);

            this.setState({
              test: {
                default: {
                  tId: id,
                  title,
                  step,
                  client_name,
                  client_phone_number,
                  client_email,
                  media_category_1,
                  media_category_2,
                  service_extra_info,
                  service_category,
                  service_format,
                  service_description,
                  service_status,
                  funnel,
                  staff,
                  project_id,
                  create_user_id,
                  created_at,
                },
                targets,
                quests,
              },
            });
          },
        )
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          console.log(err.reponse);
        });
    };

    getCategories()
      .then(getPlanList())
      .then(() => {
        if (tId) {
          getTestContent().then(
            () => {
              const { test } = this.state;
              const { age_maximum, age_minimum, gender } = test.targets[0];
              const issues = test.quests.map(q => q.issue);
              const issuePurposes = test.quests.map(q => q.issue_purpose);
              const issueDetails = test.quests.map(q => q.issue_detail);
              const hasTargetValue = (age_maximum && age_minimum) !== null;
              const hasGenderValue = gender !== '';
              const hasIssue1Value = issues[0] !== '';
              const hasIssuePurpose1Value = issuePurposes[0] !== '';
              const hasIssueDetail1Value = issueDetails[0] !== '';
              const hasDefaultPassed = () => !!test.default;

              if (hasDefaultPassed) {
                this.setState({
                  isLoading: false,
                  isDefaultRendered: false,
                  isDefaultPassed: true,
                  isTargetRendered: true,
                });
              }

              if (hasTargetValue && hasGenderValue) {
                this.setState({
                  isLoading: false,
                  isTargetRendered: false,
                  isTargetPassed: true,
                  isQuestRendered: true,
                });
              }

              if (hasIssue1Value && hasIssuePurpose1Value && hasIssueDetail1Value) {
                this.setState({
                  isLoading: false,
                  isQuestRendered: false,
                  isQuestPassed: true,
                  isPayRendered: true,
                });
              }

              if (test.pay) {
                this.setState({
                  isLoading: false,
                  isPayRendered: false,
                  isPayPassed: true,
                });
              }
            },
          );
        }

        if (!tId) {
          this.setState({ isLoading: false });
          this.titleInput.getRenderedComponent().focus();
        }

        this.setState({ isLoading: true });
      });
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const { setTestInit } = this.props;
    setTestInit();
  }

  goBack = (e) => {
    e.preventDefault();
    const { route } = this.props;
    const { match } = route;

    if (!match.params.tId) window.location.reload();
    window.location.assign(`/project/${match.params.pId}`);
  };

  handleFormRender = (id) => {
    const renderDefault = id === 0
      ? this.setState({ isDefaultRendered: true })
      : this.setState({ isDefaultRendered: false });
    const renderTarget = id === 1
      ? this.setState({ isTargetRendered: true })
      : this.setState({ isTargetRendered: false });
    const renderQuest = id === 2
      ? this.setState({ isQuestRendered: true })
      : this.setState({ isQuestRendered: false });
    const renderPay = id === 3
      ? this.setState({ isPayRendered: true })
      : this.setState({ isPayRendered: false });
    const renderReport = id === 4
      ? this.setState({ isReportRendered: true })
      : this.setState({ isReportRendered: false });

    return {
      renderDefault, renderTarget, renderQuest, renderPay, renderReport,
    };
  };

  onSubmit = async (values) => {
    const {
      route,
      postTest,
      patchTest,
      patchTarget,
      postTargetExtra,
      patchTargetExtra,
      patchQuest,
      getTest,
      categoryList,
      extras,
    } = this.props;
    const { match, history } = route;
    const { pId, tId } = match.params;
    const {
      test, isDefaultRendered, isTargetRendered, isQuestRendered, isPayRendered,
    } = this.state;
    const { targets } = test;
    const tgId = targets !== undefined ? targets[0].id : null;
    const { title } = values;
    const {
      clientName,
      clientContact,
      media2,
      email,
      media1,
      serviceFormat,
      serviceInfo,
      serviceCategory,
      serviceStatus,
      serviceDesc,
      funnel,
    } = values.default;

    const hasDefaultPassed = () => {
      const hasDefaultValue = Object.keys(values.default).length > 0;
      return !!hasDefaultValue;
    };
    const hasTargetPassed = () => {
      const hasTargetValue = Object.keys(values.target).length > 0;
      return !!hasTargetValue;
    };
    const hasQuestPassed = () => {
      const hasQuestValue = Object.keys(values.quest).length > 0;
      return !!hasQuestValue;
    };
    const hasPayPassed = () => {
      const hasPayValue = Object.keys(values.pay).length > 0;
      return !!hasPayValue;
    };
    console.log(values);
    console.log('summited');
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

    if (tId) {
      if (isDefaultRendered && hasDefaultPassed) {
        await patchTest(
          tId,
          pId,
          title,
          clientName,
          clientContact,
          media2,
          email,
          media1,
          serviceFormat,
          serviceInfo,
          serviceCategory,
          serviceStatus,
          serviceDesc,
          funnel,
        ).then(() => {
          this.setState({
            isDefaultRendered: false,
            isDefaultPassed: true,
            isTargetRendered: true,
          });
        });
      } else if (isTargetRendered && hasTargetPassed) {
        const {
          gender,
          minAge,
          maxAge,
          extraInfoCategory1,
          extraInfoCategory2,
          extraInfoCategory3,
          extraInfoDesc1,
          extraInfoDesc2,
          extraInfoDesc3,
        } = values.target;
        // eslint-disable-next-line no-nested-ternary
        const genderValue = gender === '여자' ? 'female' : (gender === '남자' ? 'male' : 'both');
        console.log(values.target);
        const categoryListArr = Object.keys(categoryList).length > 0
          ? Object.keys(categoryList).map(c => categoryList[c].category_items)
          : undefined;
        // submit values 값 확인
        const exCate1Id = extraInfoCategory1 !== undefined
          ? categoryListArr[6].find(e => e.name === extraInfoCategory1).id : undefined;
        const exCate2Id = extraInfoCategory2 !== undefined
          ? categoryListArr[6].find(e => e.name === extraInfoCategory2).id : undefined;
        const exCate3Id = extraInfoCategory3 !== undefined
          ? categoryListArr[6].find(e => e.name === extraInfoCategory3).id : undefined;

        // init values 값 확인
        const tgEx1Id = extras !== undefined && extras !== [] && extras[0] !== undefined && Object.keys(extras[0]).length > 1
          ? extras[0].id : undefined;
        const tgEx2Id = extras !== undefined && extras !== [] && extras[1] !== undefined && Object.keys(extras[1]).length > 1
          ? extras[1].id : undefined;
        const tgEx3Id = extras !== undefined && extras !== [] && extras[2] !== undefined && Object.keys(extras[2]).length > 1
          ? extras[2].id : undefined;

        if (tgEx1Id) {
          await patchTargetExtra(tgEx1Id, tgId, exCate1Id, extraInfoDesc1);
        } else if (exCate1Id) await postTargetExtra(tgId, exCate1Id, extraInfoDesc1);

        if (tgEx2Id) {
          await patchTargetExtra(tgEx2Id, tgId, exCate2Id, extraInfoDesc2);
        } else if (exCate2Id) await postTargetExtra(tgId, exCate2Id, extraInfoDesc2);

        if (tgEx3Id) {
          await patchTargetExtra(tgEx3Id, tgId, exCate3Id, extraInfoDesc3);
        } else if (exCate3Id) await postTargetExtra(tgId, exCate3Id, extraInfoDesc3);

        await patchTarget(
          tgId,
          tId,
          genderValue,
          minAge,
          maxAge,
        ).then(() => {
          this.setState({
            isTargetRendered: false,
            isTargetPassed: true,
            isQuestRendered: true,
          });
        });
      } else if (isQuestRendered && hasQuestPassed) {
        const qId = test.quests.map(q => q.id).sort((a, b) => a - b);
        const {
          registerRequire, issue, issueDetail, issuePurpose,
        } = values.quest;
        const registerValue = registerRequire !== '아니오';

        if (registerRequire) {
          await patchTest(
            tId,
            pId,
            title,
            clientName,
            clientContact,
            media2,
            email,
            media1,
            serviceFormat,
            serviceInfo,
            serviceCategory,
            serviceStatus,
            serviceDesc,
            funnel,
            registerValue,
          );
        }

        if (issue[`q${qId[0]}`]) {
          await patchQuest(
            qId[0],
            tId,
            issue[`q${qId[0]}`],
            issueDetail[`q${qId[0]}`],
            issuePurpose[`q${qId[0]}`],
          )
            .then(() => { getTest(tId); })
            .then(() => {
              this.setState({
                isQuestRendered: false,
                isQuestPassed: true,
                isPayRendered: true,
              });
            }).catch((err) => {
              console.log(err);
            });
        }

        if (issue[`q${qId[1]}`]) {
          await patchQuest(
            qId[1],
            tId,
            issue[`q${qId[1]}`],
            issueDetail[`q${qId[1]}`],
            issuePurpose[`q${qId[1]}`],
          )
            .then(() => { getTest(tId); })
            .then(() => {
              this.setState({
                isQuestRendered: false,
                isQuestPassed: true,
                isPayRendered: true,
              });
            }).catch((err) => {
              console.log(err);
            });
        }

        if (issue[`q${qId[2]}`]) {
          await patchQuest(
            qId[2],
            tId,
            issue[`q${qId[2]}`],
            issueDetail[`q${qId[2]}`],
            issuePurpose[`q${qId[2]}`],
          )
            .then(() => { getTest(tId); })
            .then(() => {
              this.setState({
                isQuestRendered: false,
                isQuestPassed: true,
                isPayRendered: true,
              });
            }).catch((err) => {
              console.log(err);
            });
        }
      } else if (isPayRendered && hasPayPassed) {
        this.setState({
          isPayRendered: true,
          isPayPassed: true,
          isAllRendered: false,
        });
      }
    } else {
      await postTest(
        pId,
        title,
        clientName,
        clientContact,
        media2,
        email,
        media1,
        serviceFormat,
        serviceInfo,
        serviceCategory,
        serviceStatus,
        serviceDesc,
        funnel,
      )
        .then((res) => {
          history.push(`/project/${match.params.pId}/test/${res.data.id}`);

          if (hasDefaultPassed) {
            this.setState({
              isDefaultRendered: false,
              isDefaultPassed: true,
              isTargetRendered: true,
              test: {
                targets: [
                  { id: res.data.targets[0].id },
                ],
                quests: [
                  { id: res.data.quests[0].id },
                  { id: res.data.quests[1].id },
                  { id: res.data.quests[2].id },
                ],
              },
            });
          } else if (hasTargetPassed) {
            this.setState({
              isTargetRendered: false,
              isTargetPassed: true,
              isQuestRendered: true,
              test: {
                targets: [
                  { id: res.data.targets[0].id },
                ],
                quests: [
                  { id: res.data.quests[0].id },
                  { id: res.data.quests[1].id },
                  { id: res.data.quests[2].id },
                ],
              },
            });
          } else if (hasQuestPassed) {
            this.setState({
              isQuestRendered: false,
              isQuestPassed: true,
              isPayRendered: true,
              test: {
                targets: [
                  { id: res.data.targets[0].id },
                ],
                quests: [
                  { id: res.data.quests[0].id },
                  { id: res.data.quests[1].id },
                  { id: res.data.quests[2].id },
                ],
              },
            });
          } else if (hasPayPassed) {
            this.setState({
              isPayRendered: true,
              isPayPassed: true,
              isAllRendered: false,
              test: {
                targets: [
                  { id: res.data.targets[0].id },
                ],
                quests: [
                  { id: res.data.quests[0].id },
                  { id: res.data.quests[1].id },
                  { id: res.data.quests[2].id },
                ],
              },
            });
          }
        });
    }

    return null;
  };

  render() {
    const {
      isLoading,
      isDefaultRendered,
      isTargetRendered,
      isQuestRendered,
      isPayRendered,
      isAllRendered,
      isReportRendered,
      isDefaultPassed,
      isTargetPassed,
      isQuestPassed,
      isPayPassed,
      isAllPassed,
      hasReport,
      test,
    } = this.state;
    const {
      fieldsValues,
      fieldsMeta,
      submitFailed,
      submitSucceeded,
      handleSubmit,
      categoryList,
      planList,
      extras,
    } = this.props;
    const { goBack, handleFormRender, onSubmit } = this;
    const qId = test.quests ? test.quests.map(q => q.id).sort((a, b) => a - b) : [1, 2, 3];
    const isNoNamed = fieldsValues === undefined ? true : (fieldsValues.title === undefined || fieldsValues.title === '');
    const categoryListArr = Object.keys(categoryList).length > 0
      ? Object.keys(categoryList).map(c => categoryList[c].category_items)
      : undefined;
    const media1Category = categoryListArr !== undefined ? categoryListArr[3].map(c => c.name) : [];
    const media2Category = categoryListArr !== undefined ? categoryListArr[4].map(c => c.name) : [];
    const service1Category = categoryListArr !== undefined
      ? categoryListArr[1].map(c => c.name)
      : [];
    const service2Category = categoryListArr !== undefined
      ? categoryListArr[2].map(c => c.name)
      : [];
    const funnelCategory = categoryListArr !== undefined ? categoryListArr[5].map(c => c.name) : [];
    const extraInfoCategory = categoryListArr !== undefined
      ? categoryListArr[6].map(c => c.name)
      : [];
    const issueCategory = categoryListArr !== undefined ? categoryListArr[7].map(c => c.name) : [];
    const hasIssueValues = fieldsValues && fieldsValues !== undefined
      ? fieldsValues.quest.issue : undefined;
    const hasIssue1Value = hasIssueValues !== undefined ? hasIssueValues[`q${qId[0]}`] : undefined;
    const hasIssue2Value = hasIssueValues !== undefined ? hasIssueValues[`q${qId[1]}`] : undefined;
    const hasIssue3Value = hasIssueValues !== undefined ? hasIssueValues[`q${qId[2]}`] : undefined;
    const nav = [
      {
        title: '기본 정보',
        class: `default${isDefaultRendered ? '--active' : ''}`,
      },
      {
        title: '타겟 설정',
        class: `target${isTargetRendered ? '--active' : ''}`,
      },
      {
        title: '도전과제 설정',
        class: `quest${isQuestRendered ? '--active' : ''}`,
        subnav: ['도전과제 1', '도전과제 2', '도전과제 3'],
      },
      {
        title: '테스트 결제',
        class: `pay${isPayRendered ? '--active' : ''}`,
      },
      {
        title: '결과 리포트',
        class: `report${isReportRendered ? '--active' : ''}`,
      },
    ];

    return (
      <>
        {isLoading
          ? <LoadingIndicator />
          : (
            <form className="contents__form" onSubmit={handleSubmit(values => onSubmit(values))}>
              <div className="form__nav">
                <span className="box-btn">
                  <button type="button" className="btn-back" onClick={e => goBack(e)}>뒤로 가기</button>
                </span>
                <nav className="nav">
                  <ol className="nav-list">
                    {nav.map((n, idx) => (
                      idx === 2
                        ? (
                          <li className={`nav-list__item--quest${isQuestRendered ? '--active' : ''}`} key={n.title}>
                            <button
                              className="btn-nav"
                              type="button"
                              onClick={() => handleFormRender(idx)}
                              disabled={idx === 4 && hasReport}
                            >
                              {n.title}
                            </button>
                            {((hasIssue1Value || hasIssue2Value || hasIssue3Value)
                              && isQuestRendered)
                              || (isDefaultRendered && isTargetPassed)
                              || (isTargetRendered && isTargetPassed)
                              || (isQuestRendered && isTargetPassed
                                && (hasIssue1Value || hasIssue2Value || hasIssue3Value))
                              || (isPayRendered && isQuestPassed
                                && (hasIssue1Value || hasIssue2Value || hasIssue3Value))
                              || (isPayRendered && isTargetPassed
                                && (hasIssue1Value || hasIssue2Value || hasIssue3Value))
                              || isQuestPassed
                              || isAllPassed
                              ? (
                                <ol className="nav-sub">
                                  <li className={`sub__item${hasIssue1Value ? '--active' : ''}`}>{n.subnav[0]}</li>
                                  <li className={`sub__item${hasIssue2Value ? '--active' : ''}`}>{n.subnav[1]}</li>
                                  <li className={`sub__item${hasIssue3Value ? '--active' : ''}`}>{n.subnav[2]}</li>
                                </ol>
                              )
                              : (
                                <div className="item-info">
                                  무엇을
                                  <br />
                                  테스트할까요?
                                </div>
                              )
                            }
                          </li>
                        )
                        : (
                          <li className={`nav-list__item--${n.class}`} key={n.title}>
                            <button
                              className="btn-nav"
                              type="button"
                              onClick={() => handleFormRender(idx)}
                              disabled={idx === 4 && !isAllRendered}
                            >
                              {n.title}
                            </button>
                          </li>
                        )
                    ))}
                  </ol>
                </nav>
              </div>
              <div className="form__field">
                <Field
                  type="text"
                  name="title"
                  placeholder="Untitled"
                  component="input"
                  ref={(ref) => { this.titleInput = ref; }}
                  forwardRef
                  disabled={isAllPassed}
                />
                { isDefaultRendered
                  ? (
                    <FormSection name="default">
                      <TestFormDefault
                        isDisabled={isNoNamed || (isDefaultPassed
                          && isTargetPassed
                          && isQuestPassed
                          && isPayPassed)
                          || isAllPassed
                        }
                        test={test}
                        media1Category={media1Category}
                        media2Category={media2Category}
                        service1Category={service1Category}
                        service2Category={service2Category}
                        funnelCategory={funnelCategory}
                      />
                    </FormSection>
                  )
                  : null
                }
                { isTargetRendered
                  ? (
                    <>
                      { isDefaultPassed ? null : <DisabledLayer />}
                      <FormSection name="target">
                        <TestFormTarget
                          isDisabled={isNoNamed || (isDefaultPassed
                              && isTargetPassed
                              && isQuestPassed
                              && isPayPassed)
                              || isAllPassed
                            }
                          extraInfoCategory={extraInfoCategory}
                          extraValue={extras}
                        />
                      </FormSection>
                    </>
                  )
                  : null
                }
                { isQuestRendered
                  ? (
                    <>
                      { isTargetPassed ? null : <DisabledLayer />}
                      <FormSection name="quest">
                        <TestFormQuest
                          isDisabled={isNoNamed || (isDefaultPassed
                            && isTargetPassed
                            && isQuestPassed
                            && isPayPassed)
                            || isAllPassed
                          }
                          qId={qId}
                          issueCategory={issueCategory}
                        />
                      </FormSection>
                    </>
                  )
                  : null
                }
                { isPayRendered
                  ? (
                    <>
                      { isQuestPassed ? null : <DisabledLayer />}
                      { isPayPassed
                        ? (
                          <PayAccountinfo submit={
                            () => this.setState({
                              isPayPassed: false,
                              isAllRendered: false,
                              isAllPassed: true,
                            })}
                          />
                        )
                        : (
                          <>
                            {isAllRendered
                              ? null
                              : (
                                <FormSection name="pay">
                                  <TestFormPay
                                    isDisabled={isNoNamed || (isDefaultPassed
                                      && isTargetPassed
                                      && isQuestPassed
                                      && isPayPassed)
                                      || isAllPassed
                                    }
                                    planList={planList}
                                  />
                                </FormSection>
                              )
                            }
                          </>
                        )
                      }
                    </>
                  )
                  : null
                }
                { isReportRendered
                  ? <TestFormReport />
                  : null
                }
              </div>
              {isPayPassed || isReportRendered
                ? null
                : (
                  <RightSidebar
                    isDisabled={isNoNamed}
                    isDefaultRendered={isDefaultRendered}
                    isTargetRendered={isTargetRendered}
                    isQuestRendered={isQuestRendered}
                    isPayRendered={isPayRendered}
                    isAllRendered={isAllRendered}
                    isDefaultPassed={isDefaultPassed}
                    isTargetPassed={isTargetPassed}
                    isQuestPassed={isQuestPassed}
                    isPayPassed={isPayPassed}
                    isAllPassed={isAllPassed}
                    fieldsMeta={fieldsMeta}
                    fieldsValues={fieldsValues}
                    submitFailed={submitFailed}
                    submitSucceeded={submitSucceeded}
                  />
                )
              }
              {/* 생성된 테스트 페이지 수정 시에도 안 보이게 하려면 아래 주석 삭제 */}
              {/* { isNoNamed && tId === undefined */}
              { isNoNamed
                ? (
                  <div className="layer--guide">
                    <i className={`layer__bubble${isNoNamed ? '--active' : ''}`}>테스트명을 입력해주세요</i>
                  </div>
                )
                : null
              }
            </form>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { test } = state.test;
  const { targets } = state.test.targets;
  const { extras } = state.target.target;
  const { quests } = state.test.quests;
  const { categoryList } = state.category;
  const { planList } = state.plan;
  const titleValue = test.title ? test.title : undefined;
  const media1Value = test.media_category_1 ? test.media_category_1 : undefined;
  const media2Value = test.media_category_2 ? test.media_category_2 : undefined;
  const serviceInfoValue = test.service_extra_info ? test.service_extra_info : undefined;
  const serviceCategoryValue = test.service_category ? test.service_category : undefined;
  const serviceFormatValue = test.service_format ? test.service_format : undefined;
  const serviceDescValue = test.service_description ? test.service_description : undefined;
  const serviceStatusValue = test.service_status ? test.service_status : undefined;
  const clientNameValue = test.client_name ? test.client_name : undefined;
  const clientContactValue = test.client_phone_number ? test.client_phone_number : undefined;
  const emailValue = test.client_email ? test.client_email : undefined;
  const funnelValue = test.funnel ? test.funnel : undefined;
  const minAgeValue = targets !== undefined ? targets[0].age_minimum : undefined;
  const maxAgeValue = targets !== undefined ? targets[0].age_maximum : undefined;
  const getGenderValue = targets !== undefined ? targets[0].gender : undefined;
  // eslint-disable-next-line no-nested-ternary
  const setGenderValue = getGenderValue !== undefined && getGenderValue !== '' ? (getGenderValue === 'female' ? '여자' : (getGenderValue === 'male' ? '남자' : '무관')) : undefined;
  const getExtraInfo1Value = extras !== undefined && extras !== []
    ? extras.sort((a, b) => a.id - b.id)[0] : undefined;
  const getExtraInfo2Value = extras !== undefined && extras !== []
    ? extras.sort((a, b) => a.id - b.id)[1] : undefined;
  const getExtraInfo3Value = extras !== undefined && extras !== []
    ? extras.sort((a, b) => a.id - b.id)[2] : undefined;
  const extraInfoCategory1 = getExtraInfo1Value !== undefined ? getExtraInfo1Value.name : undefined;
  const extraInfoCategory2 = getExtraInfo2Value !== undefined ? getExtraInfo2Value.name : undefined;
  const extraInfoCategory3 = getExtraInfo3Value !== undefined ? getExtraInfo3Value.name : undefined;
  const extraInfoDesc1 = getExtraInfo1Value !== undefined ? getExtraInfo1Value.value : undefined;
  const extraInfoDesc2 = getExtraInfo2Value !== undefined ? getExtraInfo2Value.value : undefined;
  const extraInfoDesc3 = getExtraInfo3Value !== undefined ? getExtraInfo3Value.value : undefined;
  const registerRequire = (test !== undefined && test.is_register_required !== null)
    ? test.is_register_required : undefined;
  // eslint-disable-next-line no-nested-ternary
  const registerValue = registerRequire !== undefined ? (registerRequire !== false ? '네 (+5,000)' : '아니오') : undefined;
  const issue1qId = quests !== undefined ? quests[0].id : '';
  const issue2qId = quests !== undefined ? quests[1].id : '';
  const issue3qId = quests !== undefined ? quests[2].id : '';
  const issue1Value = quests !== undefined && quests[0].issue !== '' ? quests[0].issue : undefined;
  const issue2Value = quests !== undefined && quests[1].issue !== '' ? quests[1].issue : undefined;
  const issue3Value = quests !== undefined && quests[2].issue !== '' ? quests[2].issue : undefined;
  const issueDetail1Value = quests !== undefined && quests[0].issue_detail !== '' ? quests[0].issue_detail : undefined;
  const issueDetail2Value = quests !== undefined && quests[1].issue_detail !== '' ? quests[1].issue_detail : undefined;
  const issueDetail3Value = quests !== undefined && quests[2].issue_detail !== '' ? quests[2].issue_detail : undefined;
  const issueissuePurpose1Value = quests !== undefined && quests[0].issue_purpose !== '' ? quests[0].issue_purpose : undefined;
  const issueissuePurpose2Value = quests !== undefined && quests[1].issue_purpose !== '' ? quests[1].issue_purpose : undefined;
  const issueissuePurpose3Value = quests !== undefined && quests[2].issue_purpose !== '' ? quests[2].issue_purpose : undefined;

  const initData = {
    title: titleValue,
    default: {
      clientName: clientNameValue,
      clientContact: clientContactValue,
      media2: media2Value,
      email: emailValue,
      media1: media1Value,
      serviceFormat: serviceFormatValue,
      serviceInfo: serviceInfoValue,
      serviceCategory: serviceCategoryValue,
      serviceStatus: serviceStatusValue,
      serviceDesc: serviceDescValue,
      funnel: funnelValue,
    },
    target: {
      minAge: minAgeValue,
      maxAge: maxAgeValue,
      gender: setGenderValue,
      extraInfoCategory1,
      extraInfoCategory2,
      extraInfoCategory3,
      extraInfoDesc1,
      extraInfoDesc2,
      extraInfoDesc3,
    },
    quest: {
      registerRequire: registerValue,
      issue: {
        [`q${issue1qId}`]: issue1Value,
        [`q${issue2qId}`]: issue2Value,
        [`q${issue3qId}`]: issue3Value,
      },
      issueDetail: {
        [`q${issue1qId}`]: issueDetail1Value,
        [`q${issue2qId}`]: issueDetail2Value,
        [`q${issue3qId}`]: issueDetail3Value,
      },
      issuePurpose: {
        [`q${issue1qId}`]: issueissuePurpose1Value,
        [`q${issue2qId}`]: issueissuePurpose2Value,
        [`q${issue3qId}`]: issueissuePurpose3Value,
      },
    },
  };

  return ({
    fieldsValues: getFormValues('testForm')(state),
    fieldsMeta: getFormMeta('testForm')(state),
    test,
    targets,
    extras,
    quests,
    categoryList,
    planList,
    initialValues: initData,
  });
};

const mapDispatchToProps = dispatch => ({
  postTest: (
    id,
    title,
    clientName,
    clientContact,
    media2,
    email,
    media1,
    serviceFormat,
    serviceInfo,
    serviceCategory,
    serviceStatus,
    serviceDesc,
    funnel,
  ) => dispatch(postTest(
    id,
    title,
    clientName,
    clientContact,
    media2,
    email,
    media1,
    serviceFormat,
    serviceInfo,
    serviceCategory,
    serviceStatus,
    serviceDesc,
    funnel,
  )),
  getTest: tId => dispatch(getTest(tId)),
  setTestInit: () => dispatch(setTestInit()),
  patchTest: (
    tId,
    pId,
    title,
    clientName,
    clientContact,
    media2,
    email,
    media1,
    serviceFormat,
    serviceInfo,
    serviceCategory,
    serviceStatus,
    serviceDesc,
    funnel,
    registerValue,
  ) => dispatch(patchTest(
    tId,
    pId,
    title,
    clientName,
    clientContact,
    media2,
    email,
    media1,
    serviceFormat,
    serviceInfo,
    serviceCategory,
    serviceStatus,
    serviceDesc,
    funnel,
    registerValue,
  )),
  getTarget: tId => dispatch(getTarget(tId)),
  patchTarget: (tgId, tId, gender, minAge, maxAge) => dispatch(
    patchTarget(tgId, tId, gender, minAge, maxAge),
  ),
  postTargetExtra: (tgId, cId, cValue) => dispatch(postTargetExtra(tgId, cId, cValue)),
  patchTargetExtra: (
    tgEx1Id,
    tgId,
    exCate1Id,
    extraInfoDesc1,
  ) => dispatch(patchTargetExtra(
    tgEx1Id,
    tgId,
    exCate1Id,
    extraInfoDesc1,
  )),
  patchQuest: (qId, tId, issue, issueDetail, issuePurpose) => dispatch(
    patchQuest(qId, tId, issue, issueDetail, issuePurpose),
  ),
  getCategories: () => dispatch(getCategories()),
  getPlanList: () => dispatch(getPlanList()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'testForm',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch, submitError, props) => {
    console.log(errors, dispatch, submitError, props);
  },
  onSubmitSuccess: () => {
    console.log('success');
  },
})(NewTestForm));
