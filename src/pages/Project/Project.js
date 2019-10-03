/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTemplate from 'containers/PageTemplate';
import NewProjectPopup from 'containers/NewProjectPopup';
import ProjectList from 'containers/ProjectList';
import PopupTemplate from 'components/PopupTemplate';
import LoadingIndicator from 'components/LoadingIndicator';
import { togglePopup } from 'modules/popup';
import { getProjectList } from 'modules/project';
import './Project.scss';

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

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAuthError: false,
    };
  }

  componentDidMount() {
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
    const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;

    if (AUTH_TOKEN === null) {
      this.setState({
        isLoading: false,
        isAuthError: true,
      });
    }

    this.getProject();
    this.setState({ isLoading: true });
  }

  componentDidUpdate(prevProps) {
    const { count } = this.props;
    if (prevProps.count !== count) {
      this.getProject();
    }
  }

  handlePopup = (isShow) => {
    const { props } = this;
    props.togglePopup(isShow);
  };

  getProject = async () => {
    const { props } = this;

    await props.getProjectList()
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        const { statusText } = err.response;
        console.log(err.response);
        if (statusText === 'Unauthorized') {
          this.setState({
            isLoading: false,
            isAuthError: true,
          });
        }
      });
  };

  render() {
    const { isOpen, history, projectList } = this.props;
    const { isLoading, isAuthError } = this.state;

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
  togglePopup: isOpen => (dispatch(togglePopup(isOpen))),
  getProjectList: () => (dispatch(getProjectList())),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);
