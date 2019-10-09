/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTemplate from 'containers/PageTemplate';
import NewProjectPopup from 'containers/NewProjectPopup';
import ProjectList from 'containers/ProjectList';
import UnauthorizedPopup from 'components/UnauthorizedPopup';
import LoadingIndicator from 'components/LoadingIndicator';
import { togglePopup } from 'modules/popup';
import { getProjectList } from 'modules/project';
import './Project.scss';

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
