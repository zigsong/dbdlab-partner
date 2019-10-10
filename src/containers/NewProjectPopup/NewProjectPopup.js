import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form';
import { putProject, getProjectList } from 'modules/project';
import PopupTemplate from 'components/PopupTemplate';
import ToastAlert from 'components/ToastAlert';
import ProjectForm from './ProjectForm';
import './NewProjectPopup.scss';

class NewProjectPopup extends Component {
  static defaultProps = {
    show: false,
  };

  state = {
    toastTitle: '',
    toastSubtitle: '',
    isToastShow: false,
  }

  onSubmit = (values) => {
    // eslint-disable-next-line no-shadow
    const { getProjectList, handleReset } = this.props;

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
      const { protocol } = window.location;
      props.putProject({ company, service })
        .then((res) => {
          console.log(res);
          this.setState({
            toastTitle: '프로젝트가 생성되었습니다 :)',
            toastSubtitle: '테스트 페이지로 이동합니다',
            isToastShow: true,
          });
          getProjectList();
          handleReset();
          setTimeout(() => window.location.assign(`${protocol}//${process.env.REACT_APP_PARTNER_URL}/project/${res.data.id}`), 2000);
        })
        .catch((err) => {
          console.log(err);
          // const errMsgName = err.response.data.name !== undefined
          //   ? err.response.data.name[0]
          //   : undefined;

          // this.setState({
          //   toastTitle: 'Oops! :(',
          //   toastSubtitle: errMsgName,
          //   isToastShow: true,
          // });
        });
    }
  };

  render() {
    const { show, handlePopup } = this.props;
    const { toastTitle, toastSubtitle, isToastShow } = this.state;

    return (
      <PopupTemplate isShow={show} title="프로젝트 만들기">
        <ProjectForm
          onPopup={handlePopup}
          onSubmit={this.onSubmit}
          // initialValues={{ same: true }}
        />
        {isToastShow
          ? (
            <ToastAlert
              title={toastTitle}
              subtitle={toastSubtitle}
              isShow={isToastShow}
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
