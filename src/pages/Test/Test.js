/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import Header from 'components/Header';
import TestCard from 'components/TestCard';
import LoadingIndicator from 'components/LoadingIndicator';
import PopupTemplate from 'components/PopupTemplate';
import NewTestForm from 'containers/NewTestForm';
import TeamMemberList from 'containers/TeamMemberList';
import { getAuthSelf } from 'modules/auth';
import { getProject } from 'modules/project';
import { getTestList, getTest, setTestListInit } from 'modules/test';
import './Test.scss';

const UnauthorizedPopup = () => {
  const pStyle = {
    margin: '30px auto',
    color: '#282828',
    lineHeight: 3,
  };
  const strongStyle = { fontSize: '24px' };
  const btnStyle = {
    display: 'inline-block',
    width: '190px',
    height: '36px',
    marginTop: '50px',
    boxSizing: 'border-box',
    backgroundColor: '#029bff',
    borderRadius: '3px',
    border: '1px solid #029bff',
    textAlign: 'center',
    fontSize: '16px',
    color: '#fff',
    fontWeight: 500,
  };
  const redirect = () => {
    const { protocol } = window.location;
    window.location.assign(`${protocol}//qa.realdopt.com/login`);
    // window.location.assign(`${protocol}//localhost:3000/login`);
  };

  return (
    <PopupTemplate isShow>
      <p style={pStyle}>
        <strong style={strongStyle}>로그인이 필요합니다.</strong>
        <br />
        다시 로그인 해 주세요 :)
        <br />
        <button type="button" style={btnStyle} onClick={() => redirect()}>확인</button>
      </p>
    </PopupTemplate>
  );
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAuthError: false,
      isNewTestApply: false,
      isTestTab: true,
    };
  }

  componentDidMount() {
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
    const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
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

    if (AUTH_TOKEN === null) {
      this.setState({
        isLoading: false,
        isAuthError: true,
      });
    } else {
      authenticate()
        .then(this.setState({ isLoading: false }));
    }
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
    const {
      isLoading,
      isAuthError,
      isNewTestApply,
      isTestTab,
    } = this.state;
    const {
      match,
      testList,
      project,
      avatar_url,
    } = this.props;
    const { handleTabToggle, handleNewTestForm } = this;
    const { pId } = match.params;
    const hasTestList = Object.keys(testList).length > 0;
    console.log(testList);
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
      <>
        { isLoading ? <LoadingIndicator /> : null }
        { isAuthError ? <UnauthorizedPopup /> : null }
        { isNewTestApply || match.params.tId > 0
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
                            { hasTestList
                              ? (
                                <ul className="desc__step-list">
                                  { step.map(s => (
                                    <li
                                      className={`list__item--${s.state}${s.state === 'apply' ? '--active' : ''}`}
                                      key={s.title}
                                    >
                                      <h2 className="item__title">{s.title}</h2>
                                      <p className="item__desc">
                                        { s.desc.toString().split('\n').map(desc => (
                                          <React.Fragment key={desc}>
                                            {desc}
                                            <br />
                                          </React.Fragment>
                                        )) }
                                        { s.state === 'apply'
                                          ? <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                          : null }
                                      </p>
                                      <ScrollContainer className="item__testbox scroll-container">
                                        { Object.keys(testList).map((t) => {
                                          const tStep = testList[t].step.toLowerCase();
                                          return (
                                            s.state === tStep
                                              ? (
                                                <React.Fragment key={t}>
                                                  <TestCard
                                                    pId={pId}
                                                    tId={testList[t].id}
                                                    tTitle={testList[t].title}
                                                    step={tStep}
                                                    staff={testList[t].staff}
                                                    createDate={testList[t].created_at}
                                                  />
                                                  { s.state === 'testing'
                                                    ? <Link to="/" className="btn-start--blue">결과 리포트 확인하기</Link>
                                                    : null }
                                                </React.Fragment>
                                              )
                                              : null
                                          );
                                        })
                                        }
                                      </ScrollContainer>
                                    </li>
                                  )) }
                                </ul>
                              )
                              : (
                                <>
                                  <ul className="desc__step-list">
                                    { step.map(s => (
                                      <li
                                        className={`list__item--${s.state}`}
                                        key={s.title}
                                      >
                                        <h2 className="item__title">{s.title}</h2>
                                        <p className="item__desc">
                                          { s.desc.toString().split('\n').map(desc => (
                                            <React.Fragment key={desc}>
                                              {desc}
                                              <br />
                                            </React.Fragment>
                                          )) }
                                          { s.state === 'apply' && Object.keys(testList).length > 0
                                            ? <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                            : null }
                                        </p>
                                      </li>
                                    )) }
                                  </ul>
                                  <span className="desc__text">테스트를 통해, 고객에게 더 좋은 서비스를 제공하세요!</span>
                                  <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                </>
                              )}
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
    );
  }
}

const mapStateToProps = (state) => {
  const { count, testList } = state.test;
  const { project } = state.project;
  const { avatar_url } = state.auth.users;

  return ({
    count,
    testList,
    project,
    avatar_url,
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
