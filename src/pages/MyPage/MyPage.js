/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';
import PageTemplate from 'containers/PageTemplate';
import {
  getAuthSelf,
  getAccount,
  postAvatarUpdate,
  patchAccountUpdate,
  putPasswordUpdate,
} from 'modules/auth';
import './MyPage.scss';

class MyPage extends Component {
  state = {
    onEdit: false,
    isLoading: false,
    selectedFile: null,
  }

  componentDidMount() {
    const { props } = this;
    const authenticate = async () => {
      await props.getAuthSelf()
        .then((res) => {
          console.log(res);
          props.getAccount(res.data.id);
        });
    };

    this.setState({ isLoading: true });
    authenticate()
      .then(this.setState({ isLoading: false }));
  }

  // eslint-disable-next-line consistent-return
  handleFileInput = (e) => {
    const { props } = this;
    const formData = new FormData();

    if (!e.target.files[0]) return false;

    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      const { selectedFile } = this.state;
      formData.append('file', selectedFile);
      props.postAvatarUpdate(formData)
        .then(res => console.log(res))
        .catch((err) => {
          console.log(err);
          alert('이미지 파일을 선택해 주세요:)');
        });
    });
  }

  render() {
    const { avatar_url, email, name } = this.props;
    const { onEdit, isLoading } = this.state;
    const teamList = [
      'abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz',
    ];
    const logList = [
      {
        activity: '님이 ‘리뷰남기기v1.2’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘디비디랩’ 팀에 소속되었습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘더 테스터’ 프로젝트를 생성했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.3’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.4’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.5’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
      {
        activity: '님이 ‘리뷰남기기v1.6’ 테스트 등록을 시작했습니다',
        date: '2019. 7. 23. at 7:48 PM',
      },
    ];

    return (
      isLoading
        ? <LoadingIndicator />
        : (
          <PageTemplate>
            <section className="contents__account">
              <div className="contents-inner">
                <ul className="account__tablist">
                  <li className="tablist__item--active"><button type="button" className="btn-tab">Profile</button></li>
                  <li className="tablist__item"><button type="button" className="btn-tab">Payment</button></li>
                </ul>
                <div className="account__info">
                  {
                    onEdit
                      ? null
                      : (
                        <>
                          <section className="info__profile">
                            <h2 className="info__title--hidden">Account</h2>
                            <form className="profile__image" encType="multipart/form-data">
                              <span className="box-image">
                                <img src={avatar_url} alt="프로필" />
                              </span>
                              <span className="box-input">
                                <label htmlFor="profile">
                                  <input type="file" name="profile" onChange={e => this.handleFileInput(e)} />
                                </label>
                              </span>
                            </form>
                            <span className="profile__desc">
                              <strong className="desc__name">
                                {name !== undefined && name !== ''
                                  ? name
                                  : email.substring(0, email.indexOf('@'))
                                }
                              </strong>
                              <button type="button" className="btn-edit">Edit profile</button>
                              <span className="desc__mail">{email}</span>
                            </span>
                          </section>
                          <section className="info__teams">
                            <h2 className="info__title">Teams</h2>
                            <ul className="teams__list">
                              {teamList.map(t => (
                                <li className="list__item" key={t}>
                                  <Link to="/test">{t}</Link>
                                </li>
                              ))}
                            </ul>
                          </section>
                          <section className="info__activity">
                            <h2 className="info__title">Activity</h2>
                            <ul className="activity__list">
                              {logList.map(l => (
                                <li className="list__item" key={l.activity}>
                                  <div className="box-item">
                                    <span className="box-image">
                                      <img src="/static/images/common/profiles/img_profile_03.svg" alt="test" />
                                    </span>
                                    <p className="box-text">
                                      <span className="text__activity">
                                        <strong className="name">
                                          {name !== undefined && name !== ''
                                            ? name
                                            : email.substring(0, email.indexOf('@'))
                                          }
                                        </strong>
                                        <span className="activity">{l.activity}</span>
                                      </span>
                                      <span className="text__date">{l.date}</span>
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </section>
                        </>
                      )
                  }
                </div>
              </div>
            </section>
          </PageTemplate>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const {
    id,
    avatar_url,
    email,
    name,
  } = state.auth.users;

  return ({
    id,
    avatar_url,
    email,
    name,
  });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
  getAccount: id => dispatch(getAccount(id)),
  postAvatarUpdate: file => dispatch(postAvatarUpdate(file)),
  patchAccountUpdate: (
    id,
    email,
    name,
    phone,
  ) => dispatch(patchAccountUpdate(
    id,
    email,
    name,
    phone,
  )),
  putPasswordUpdate: (email, name, phone) => dispatch(putPasswordUpdate(email, name, phone)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
