/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import Header from 'components/Header';
import TestCard from 'components/TestCard';
import LoadingIndicator from 'components/LoadingIndicator';
import NewTestForm from 'containers/NewTestForm';
import TeamMemberList from 'containers/TeamMemberList';
import { getAuthSelf } from 'modules/auth';
import { getProject } from 'modules/project';
import { getTestList, getTest, setTestListInit } from 'modules/test';
import './Test.scss';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isNewTestApply: false,
      isTestTab: true,
    };
  }

  componentDidMount() {
    const { props } = this;
    const { match } = props;
    const { pId } = match.params;
    const projectId = parseInt(pId, 10);
    const authenticate = async () => {
      await props.getAuthSelf();
      await props.getTestList(projectId);
      await props.getProject(projectId);
    };

    this.setState({ isLoading: true });
    authenticate()
      .then(this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { props } = this;
    props.setTestListInit();
    this.setState({ isNewTestApply: false });
  }

  handleTabToggle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      isTestTab: !prevState.isTestTab,
    }));
  }

  handleNewTestForm = (e) => {
    e.preventDefault();
    this.setState({ isNewTestApply: true });
  }

  render() {
    const step = [
      {
        title: 'STEP1. 신청',
        desc: '테스트를 신청해주시면,\n담당 매니저가 배정됩니다.',
        state: 'apply',
      },
      {
        title: 'STEP2. 등록',
        desc: '담당 매니저가 배정되면,\n테스트 등록을 도와드립니다.',
        state: 'register',
      },
      {
        title: 'STEP3. 결제',
        desc: '등록 후, 결제가 완료되면\n바로 테스트가 진행됩니다.',
        state: 'payment',
      },
      {
        title: 'STEP4. 진행 및 완료',
        desc: '테스트는 4-5일 진행되며,\n이후 리포트가 제공됩니다.',
        state: 'testing',
      },
    ];
    const { isLoading, isNewTestApply, isTestTab } = this.state;
    const {
      match, testList, project, avatar_url,
    } = this.props;
    const { handleTabToggle, handleNewTestForm } = this;
    const { pId } = match.params;
    const getTestStep = Object.keys(testList).map(t => testList[t].step);
    const {
      name,
      company_name,
      service_extra_info,
      service_category,
      service_format,
      service_description,
    } = project;
    const projectName = (name !== undefined && name !== '') ? name : undefined;
    const companyName = (company_name !== undefined && company_name !== '') ? company_name : undefined;
    const serviceInfo = (service_extra_info !== undefined && service_extra_info !== '') ? service_extra_info : undefined;
    const serviceCategory = (service_category !== undefined && service_category !== '') ? service_category : undefined;
    const serviceFormat = (service_format !== undefined && service_format !== '') ? service_format : undefined;
    const serviceDesc = (service_description !== undefined && service_description !== '') ? service_description : undefined;

    return (
      isLoading
        ? <LoadingIndicator />
        : (
          <>
            {isNewTestApply || match.params.tId > 0
              ? (
                <main className="contents">
                  <NewTestForm route={this.props} />
                </main>
              )
              : (
                <>
                  <Header global={false} projectName={project.name} avatar_url={avatar_url} />
                  <main className="contents">
                    <section className="contents__test">
                      <div className="contents-inner">
                        <ul className="test__tablist">
                          <li className={`tablist__item${isTestTab ? '--active' : ''}`}>
                            <button type="button" className="btn-tab" onClick={e => handleTabToggle(e)}>테스트 목록</button>
                          </li>
                          <li className={`tablist__item${isTestTab ? '' : '--active'}`}>
                            <button type="button" className="btn-tab" onClick={e => handleTabToggle(e)}>우리 팀</button>
                          </li>
                        </ul>
                        {
                          isTestTab
                            ? (
                              <div className="test__desc">
                                <ul className="desc__step-list">
                                  { step.map((s, idx) => (
                                    <li className={`list__item--${s.state}${s.state === 'apply' && Object.keys(testList).length > 0 ? '--active' : ''}`} key={s.title}>
                                      <h2 className="item__title">{s.title}</h2>
                                      <p className="item__desc">
                                        { s.desc.toString().split('\n').map(desc => (
                                          <React.Fragment key={desc}>
                                            {desc}
                                            <br />
                                          </React.Fragment>
                                        )) }
                                      </p>
                                      { Object.keys(testList).length < 0
                                        ? null
                                        : (
                                          <ScrollContainer className="item__testbox scroll-container">
                                            { s.state.toUpperCase() === getTestStep[idx]
                                              ? (
                                                <>
                                                  <TestCard test={testList} pId={pId} />
                                                  { s.state === 'apply'
                                                    ? <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                                    : null }
                                                  { s.state === 'testing'
                                                    ? <Link to="/" className="btn-start--blue">결과 리포트 확인하기</Link>
                                                    : null }
                                                </>
                                              )
                                              : null
                                            }
                                          </ScrollContainer>
                                        )
                                      }
                                    </li>
                                  )) }
                                </ul>
                                {
                                  Object.keys(testList).length > 0
                                    ? null
                                    : (
                                      <>
                                        <span className="desc__text">테스트를 통해, 고객에게 더 좋은 서비스를 제공하세요!</span>
                                        <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                      </>
                                    )
                                }
                              </div>
                            )
                            : (
                              <div className="team__desc">
                                <TeamMemberList
                                  project={project}
                                  initialValues={{
                                    service: projectName,
                                    company: companyName,
                                    serviceInfo,
                                    serviceCategory,
                                    serviceFormat,
                                    serviceDesc,
                                  }}
                                />
                              </div>
                            )
                        }
                      </div>
                    </section>
                  </main>
                </>
              )}
          </>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const { count, testList } = state.test;
  const { project } = state.project;

  return ({
    count,
    testList,
    project,
    avatar_url: state.auth.users.avatar_url,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getProject: id => dispatch(getProject(id)),
  getTestList: pId => dispatch(getTestList(pId)),
  getTest: tId => dispatch(getTest(tId)),
  setTestListInit: () => dispatch(setTestListInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Test);
