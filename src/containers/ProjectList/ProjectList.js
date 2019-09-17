import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NewProjectPopup from 'containers/NewProjectPopup';
import { togglePopup } from 'modules/popup';
import './ProjectList.scss';

const ProjectList = (props) => {
  const handlePopup = (isOpen) => {
    props.togglePopup(isOpen);
  };

  const getDate = (value) => {
    const getValue = new Date(value);
    const day = getValue.getDate();
    const month = getValue.getMonth() + 1;
    const year = getValue.getFullYear();
    const date = `${year}. ${month} .${day}`;

    return date;
  };

  const { isOpen, project, history } = props;
  return (
    <div className="propject__list">
      {Object.keys(project).sort((a, b) => a - b).map(key => (
        <Link to={`/project/${project[key].id}`} className="list" key={project[key].id}>
          <div className="card-project">
            <div className="card-project__service">
              <span className="service__id">
                #
                {parseInt(key, 10) + 1}
              </span>
              {project[key].is_new ? <i className="tag--new">new</i> : null}
              <strong className="service__title">
                <span className="title">{project[key].name}</span>
                의 사용성 테스트
              </strong>
              <span className="service__company">{project[key].company_name}</span>
              <span className="service__date">{getDate(project[key].created_at)}</span>
            </div>
            <p className="card-project__info">
              <span className="info__txt--hidden">테스트 개수: </span>
              <span className="info__test-num">{project[key].test_cnt}</span>
              <span className="info__txt--hidden">멤버 수: </span>
              <span className="info__mem-num">{project[key].member_cnt}</span>
            </p>
          </div>
        </Link>
      ))}
      <div className="card-project--add">
        <button className="card-project__btn" type="button" onClick={() => handlePopup(true)}>
          <span className="btn__text">프로젝트 추가</span>
        </button>
      </div>
      <NewProjectPopup show={isOpen} handlePopup={handlePopup} history={history} />
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.popup.isOpen,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => (dispatch(togglePopup(isOpen))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
