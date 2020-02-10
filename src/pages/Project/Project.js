/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PageTemplate from 'containers/PageTemplate';
import NewProjectPopup from 'containers/NewProjectPopup';
import ProjectList from 'containers/ProjectList';
import UnauthorizedPopup from 'components/UnauthorizedPopup';
import LoadingIndicator from 'components/LoadingIndicator';
import ToastAlert from 'components/ToastAlert';
import { getAuthSelf, getAccount } from 'modules/auth';
import { togglePopup } from 'modules/popup';
import { getProjectList } from 'modules/project';
import './Project.scss';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAuthError: false,
      toastTitle: '',
      toastSubtitle: '',
      isToastShow: false,
    };
  }

  componentDidMount() {
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') >= 0);
    const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;

    if (AUTH_TOKEN === null) {
      this.setState({
        isLoading: false,
        isAuthError: true,
      });
    }

    this.getUserName();
    this.getProject();
    this.setState({ isLoading: true });
  }

  componentDidUpdate(prevProps) {
    const { count } = this.props;
    if (prevProps.count !== count) {
      this.getProject();
    }
  }

  getProject = async () => {
    const { props } = this;

    await props.getProjectList()
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        const { status } = err.response;
        console.log(err.response);
        if (status === 401) {
          this.setState({
            isLoading: false,
            isAuthError: true,
          });
        }
      });
  };

  getUserName = async () => {
    const { getAuthSelf, getAccount } = this.props;

    await getAuthSelf()
      .then((res) => {
        getAccount(res.data.id)
          .then((result) => {
            const name = result.data.name.length > 0 ? result.data.name : result.data.email.substring(0, result.data.email.indexOf('@'));

            const lastLogin = Cookies.get(`realdopt_last_login_${res.data.id}`);
            if (!lastLogin || `${res.data.id}` !== lastLogin) {
              this.setState({
                isLoading: false,
                isToastShow: true,
                toastTitle: `${name}님, 반갑습니다:)`,
                toastSubtitle: '프로젝트 관리를 시작해 보세요',
              }, () => { setTimeout(() => this.setState({ isToastShow: false }), 2200); });
            }
            Cookies.set(`realdopt_last_login_${res.data.id}`, res.data.id, { expires: 1 });
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }

  handlePopup = (isShow) => {
    const { props } = this;
    props.togglePopup(isShow);
  };

  render() {
    const { isOpen, history, projectList } = this.props;
    const {
      isLoading,
      isAuthError,
      toastTitle,
      toastSubtitle,
      isToastShow,
    } = this.state;

    return (
      <PageTemplate>
        <section className="contents__project">
          <div className="contents-inner">
            <h1 className="project__title">Project</h1>
            { isLoading ? <LoadingIndicator /> : null }
            { isAuthError ? <UnauthorizedPopup /> : null }
            { Object.keys(projectList).length > 0
              ? (
                <ProjectList project={projectList} />
              )
              : (
                <>
                  <div className="project__desc">
                    <span className="desc__text">프로젝트를 만들고, 테스트를 시작해보세요!</span>
                    <button type="button" className="btn-start--red" onClick={() => this.handlePopup(true)}>+ 프로젝트 만들기</button>
                  </div>
                  <NewProjectPopup
                    show={isOpen}
                    handlePopup={this.handlePopup}
                    history={history}
                  />
                </>
              )
            }
          </div>
        </section>
        { isToastShow
          ? (
            <ToastAlert
              title={toastTitle}
              subtitle={toastSubtitle}
              isShow={isToastShow}
            />
          )
          : null }
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state) => {
  const { isOpen } = state.popup;
  const {
    count, next, previous, projectList,
  } = state.project;
  return ({
    isOpen,
    count,
    next,
    previous,
    projectList,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getAccount: id => dispatch(getAccount(id)),
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
  getProjectList: () => dispatch(getProjectList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);
