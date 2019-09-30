/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';
import PageTemplate from 'containers/PageTemplate';
import { getAuthSelf } from 'modules/auth';
import './MyPage.scss';

class MyPage extends Component {
  state = {
    onEdit: false,
    isLoading: false,
  }

  componentDidMount() {
    const { props } = this;
    const authenticate = async () => {
      await props.getAuthSelf();
    };

    this.setState({ isLoading: true });
    authenticate()
      .then(this.setState({ isLoading: false }));
  }

  render() {
    const { avatar_url, email, name } = this.props;
    const { onEdit, isLoading } = this.state;
    const userName = '김두루미와거북이봉숭아꽃살구꽃아기진달래';
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
                            <span className="profile__image">
                              <span className="box-image">
                                <img src={avatar_url} alt="프로필" />
                              </span>
                              <input type="file" />
                            </span>
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
                                        <strong className="name">{userName}</strong>
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
  const { avatar_url, email, name } = state.auth.users;

  return ({ avatar_url, email, name });
};

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => dispatch(getAuthSelf()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
