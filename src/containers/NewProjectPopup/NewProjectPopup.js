import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form';
import { putProject, getProjectList } from 'modules/project';
import PopupTemplate from 'components/PopupTemplate';
import ProjectForm from './ProjectForm';
import './NewProjectPopup.scss';

class NewProjectPopup extends Component {
  static defaultProps = {
    show: false,
  };

  onSubmit = (values) => {
    // eslint-disable-next-line no-shadow
    const { handlePopup, getProjectList, handleReset } = this.props;

    if (values.service === undefined) {
      throw new SubmissionError({
        service: '서비스 명을 입력해 주세요',
        _error: 'too short',
      });
    } else if (values.service.replace(/(^\s*)|(\s*$)/g, '').length < 1) {
      throw new SubmissionError({
        service: '서비스 명을 다시 한 번 확인해 주세요',
        _error: 'too short',
      });
    } else if (values.service.length < 1) {
      throw new SubmissionError({
        service: '서비스 명이 너무 짧습니다',
        _error: 'too short',
      });
    } else if (values.service.length > 20) {
      throw new SubmissionError({
        service: '20자 미만으로 입력하셔야 합니다',
        _error: 'too long',
      });
    } else {
      const { company, service } = values;
      const { props } = this;
      props.putProject({ company, service })
        .then(() => {
          getProjectList();
          handleReset();
        })
        .then(() => {
          handlePopup(false);
        })
        .catch((err) => {
          const errMsgName = err.response.data.name !== undefined
            ? err.response.data.name[0]
            : undefined;
          alert(errMsgName);
        });
    }
  };

  render() {
    const { show, handlePopup } = this.props;

    return (
      <PopupTemplate isShow={show} title="프로젝트 만들기">
        <ProjectForm
          onPopup={handlePopup}
          onSubmit={this.onSubmit}
          // initialValues={{ same: true }}
        />
      </PopupTemplate>
    );
  }
}

const mapStateToProps = state => ({
  putSuccess: state.project.putSuccess,
  putFailure: state.project.putFailure,
});

const mapDispatchToProps = dispatch => ({
  putProject: ({ company, service }) => dispatch(putProject({ company, service })),
  getProjectList: () => dispatch(getProjectList()),
  handleReset: () => dispatch(reset('projectForm')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((NewProjectPopup));
