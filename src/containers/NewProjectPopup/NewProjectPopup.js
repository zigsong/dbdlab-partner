import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
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
    const { handlePopup, getProjectList } = this.props;

    if (values.service === undefined) {
      throw new SubmissionError({
        service: '여긴 꼭 써야댕',
        _error: 'too short',
      });
    } else if (values.service.length < 1) {
      throw new SubmissionError({
        service: '너모 짧옹',
        _error: 'too short',
      });
    } else if (values.service.length > 20) {
      throw new SubmissionError({
        service: '너모 길옹',
        _error: 'too long',
      });
    } else {
      const { company, service } = values;
      const { props } = this;
      props.putProject({ company, service })
        .then(() => {
          getProjectList();
        })
        .then(() => {
          handlePopup(false);
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
          initialValues={{ same: true }}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((NewProjectPopup));
