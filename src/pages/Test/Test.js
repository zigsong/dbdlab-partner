/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import Header from 'components/Header';
import TestCard from 'components/TestCard';
import LoadingIndicator from 'components/LoadingIndicator';
import UnauthorizedPopup from 'components/UnauthorizedPopup';
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
      isAuthError: false,
      isNewTestApply: false,
      isTestTab: true,
    };
  }

  componentDidMount() {
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
    const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
    const { protocol } = window.location;
    const { props } = this;
    const { match, location } = props;
    const { pId } = match.params;
    const { search } = location;
    const isInvited = search.includes('invite_token');
    console.log(pId);
    console.log(location);
    console.log(isInvited);
    const projectId = parseInt(pId, 10);
    const inviteToken = search.includes('invite_token') ? search : '';
    console.log(inviteToken);
    const deleteTokenCookie = () => new Promise(() => {
      if (hasTokenCookie !== undefined) {
        console.log('logged in');
        const setTokenCookie = (expireDate) => {
          const date = new Date();
          date.setTime(date.getTime() + expireDate * 24 * 60 * 60 * 1000);
          document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=realdopt.com`;
          // document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=localhost`;
        };
        setTokenCookie(-1);
        alert('초대받은 계정으로 로그인 해주세요 :)');
      } else {
        console.log('not logged in');
        alert('초대받은 계정으로 로그인 해주세요 :)');
      }
    });

    this.setState({ isLoading: true });

    if (AUTH_TOKEN === null) {
      this.setState({
        isAuthError: true,
        isLoading: false,
      });
    } else {
      console.log(inviteToken);
      props.getAuthSelf()
        .then((res) => {
          console.log(res);
          console.log(res.data.id);
          const { id } = res.data;
          // 기존 멤버인가
          props.getProject(projectId)
            .then((res) => {
              console.log(res);
              const isMember = res.data.members.find(x => x.id === id);
              console.log(isMember);
              console.log(!!isMember);

              if (inviteToken.length > 1 && !!isMember) {
                deleteTokenCookie().then(
                  window.location.assign(`${protocol}//${process.env.REACT_APP_COMPANY_URL}/login/${inviteToken}&project_id=${pId}`),
                );
              } else {
                props.getTestList(pId);
                this.setState({ isLoading: false });
              }
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response);
              console.log(err.message);

              console.log(inviteToken);
              console.log(inviteToken.length);

              if (inviteToken.length > 1) {
                console.log('기존 멤버가 아닌 경우 다시 체크');
                // 기존 멤버가 아닌 경우 다시 체크
                props.getProject(projectId, inviteToken)
                  .then((res) => {
                    console.log(res);
                    window.location.assign(`${protocol}//${process.env.REACT_APP_PARTNER_URL}/project`);
                  })
                  .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    console.log(err.message);

                    this.setState({
                      isAuthError: true,
                      isLoading: false,
                    });
                  });
              }
            });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          console.log(err.message);
          const { status } = err.response;

          if (status === 401) {
            this.setState({
              isLoading: false,
              isAuthError: true,
            });
          }
        });
    }
  }

  componentWillUnmount() {
    const { props } = this;
    props.setTestListInit();
    this.setState({
      isLoading: false,
      isNewTestApply: false,
    });
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
        state: ['apply'],
      },
      {
        title: 'STEP2. 등록',
        desc: '담당 매니저가 배정되면,\n테스트 등록을 도와드립니다.',
        state: ['register'],
      },
      {
        title: 'STEP3. 결제',
        desc: '등록 후, 결제가 완료되면\n바로 테스트가 진행됩니다.',
        state: ['payment'],
      },
      {
        title: 'STEP4. 진행 및 완료',
        desc: '테스트는 4-5일 진행되며,\n이후 리포트가 제공됩니다.',
        state: ['testing', 'completed'],
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
      location,
      testList,
      project,
      avatar_url,
    } = this.props;
    const { handleTabToggle, handleNewTestForm } = this;
    const { pId } = match.params;
    const { search } = location;
    const hasTestList = Object.keys(testList).length > 0;
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
        { isLoading
          ? <LoadingIndicator />
          : (
            <>
              { isAuthError
                ? <UnauthorizedPopup pId={pId} inviteToken={search} />
                : (
                  <>
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
                                    <button type="button" className="btn-tab" onClick={e => handleTabToggle(e)}>나의 테스트</button>
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
                                                  className={`list__item--${s.state[0]}${s.state[0] === 'apply' ? '--active' : ''}`}
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
                                                    { s.state[0] === 'apply'
                                                      ? <button type="button" className="btn-start--red" onClick={e => handleNewTestForm(e)}>+ 테스트 신청하기</button>
                                                      : null }
                                                  </p>
                                                  <ScrollContainer className="item__testbox scroll-container">
                                                    { Object.keys(testList).map((t) => {
                                                      const tStep = testList[t].step.toLowerCase();
                                                      return (
                                                        s.state.indexOf(tStep) > -1
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
                                                    className={`list__item--${s.state[0]}`}
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
                )
              }
            </>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { count, testList } = state.test;
  const { project } = state.project;
  const { id, avatar_url } = state.auth.users;

  return ({
    count,
    testList,
    project,
    id,
    avatar_url,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getProject: (id, inviteToken) => dispatch(getProject(id, inviteToken)),
  getTestList: pId => dispatch(getTestList(pId)),
  getTest: tId => dispatch(getTest(tId)),
  setTestListInit: () => dispatch(setTestListInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Test);
