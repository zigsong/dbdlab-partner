import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form';
import { toggleToastPopup } from 'modules/popup';
import { putProject, getProjectList } from 'modules/project';
import config from 'modules/config';
import PopupTemplate from 'components/PopupTemplate';
import ToastAlert from 'components/ToastAlert';
import LoadingIndicator from 'components/LoadingIndicator';
import ProjectForm from './ProjectForm';
import './NewProjectPopup.scss';

class NewProjectPopup extends Component {
  static defaultProps = {
    show: false,
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  onSubmit = (values) => {
    // eslint-disable-next-line no-shadow
    const { getProjectList, toggleToastPopup, handleReset } = this.props;

    this.setState({ isLoading: true });

    if (values.service === undefined) {
      this.setState({ isLoading: false });
      throw new SubmissionError({
        service: '서비스 명을 입력해 주세요',
        _error: 'too short',
      });
    } else if (values.service.replace(/(^\s*)|(\s*$)/g, '').length < 1) {
      this.setState({ isLoading: false });
      throw new SubmissionError({
        service: '서비스 명을 다시 한 번 확인해 주세요',
        _error: 'too short',
      });
    } else if (values.service.length < 1) {
      this.setState({ isLoading: false });
      throw new SubmissionError({
        service: '서비스 명이 너무 짧습니다',
        _error: 'too short',
      });
    } else if (values.service.length > 20) {
      this.setState({ isLoading: false });
      throw new SubmissionError({
        service: '20자 미만으로 입력하셔야 합니다',
        _error: 'too long',
      });
    } else {
      const { company, service } = values;
      const { props } = this;
      const { protocol } = window.location;

      props.putProject({ company, service })
        .then((res) => {
          this.setState({ isLoading: false });
          toggleToastPopup(true);
          getProjectList();
          handleReset();
          setTimeout(() => toggleToastPopup(false), 2000);
          setTimeout(() => window.location.assign(`${protocol}//${config.REACT_APP_PARTNER_URL}/project/${res.data.id}`), 2200);
        })
        .catch((err) => {
          this.setState({ isLoading: false });
          console.log(err);
        });
    }
  };

  render() {
    const { isLoading } = this.state;
    const { show, isToastOpen, handlePopup } = this.props;

    return (
      <PopupTemplate isShow={show} title="프로젝트 만들기">
        {isLoading && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 500,
          background: 'rgba(0, 0, 0, 0.2)',
          width: '100%',
          height: '100%',
        }}
        >
          <LoadingIndicator />
          <span style={{
            position: 'absolute',
            width: '300px',
            height: '100px',
            top: '50%',
            left: '50%',
            margin: '50px 0 0 -130px',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}
          >
            프로젝트 생성 중
          </span>
        </div>
        )}
        <ProjectForm
          onPopup={handlePopup}
          onSubmit={this.onSubmit}
          isLoading={isLoading}
          // initialValues={{ same: true }}
        />
        {isToastOpen
          ? (
            <ToastAlert
              title="프로젝트가 생성되었습니다 :)"
              subtitle="테스트 페이지로 이동합니다"
              isShow={isToastOpen}
            />
          )
          : null}
      </PopupTemplate>
    );
  }
}

const mapStateToProps = state => ({
  putSuccess: state.project.putSuccess,
  putFailure: state.project.putFailure,
  isToastOpen: state.popup.isToastOpen,
});

const mapDispatchToProps = dispatch => ({
  putProject: ({ company, service }) => dispatch(putProject({ company, service })),
  getProjectList: () => dispatch(getProjectList()),
  toggleToastPopup: isToastOpen => dispatch(toggleToastPopup(isToastOpen)),
  handleReset: () => dispatch(reset('projectForm')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((NewProjectPopup));
