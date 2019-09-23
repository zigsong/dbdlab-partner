import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from 'containers/PageTemplate';
import PlanList from 'containers/PlanList';
import NewPlanForm from 'containers/NewPlanForm';
import LoadingIndicator from 'components/LoadingIndicator';
import './Plan.scss';

const Plan = (props) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { protocol } = window.location;
    const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
    const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
    console.log(AUTH_TOKEN);

    setLoading(true);

    if (AUTH_TOKEN === null) {
      // window.location.assign(`${protocol}//localhost:4000`);
      window.location.assign(`${protocol}//realdopt.com/plan`);
    } else {
      setLoading(false);
    }
  }, []);

  const infoTable = [
    {
      head: [
        { title: '', desc: '' },
        { title: 'plan 01', desc: 'Basic' },
        { title: 'plan 02', desc: 'Basic+Consulting' },
        { title: 'plan 03', desc: 'Customize' },
      ],
      body: [
        {
          title: '이미지 선호도',
          plan01: '',
          plan02: '',
          plan03: 'checked',
        },
        {
          title: '객관식 설문조사',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: '주관식 설문조사',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: '불편사항 제보',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: '화면별 불편비율',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: '테스터 분석',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: 'User Flow',
          plan01: '',
          plan02: '',
          plan03: 'checked',
        },
        {
          title: '스크롤 도달 비율',
          plan01: '',
          plan02: '',
          plan03: 'checked',
        },
        {
          title: '히트맵',
          plan01: '',
          plan02: '',
          plan03: 'checked',
        },
        {
          title: '화면별 이탈 비율',
          plan01: '',
          plan02: '',
          plan03: 'checked',
        },
        {
          title: '서비스 선호도 조사',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: 'UX 점수 측정',
          plan01: 'checked',
          plan02: 'checked',
          plan03: 'checked',
        },
        {
          title: '리포트 해설(컨설팅)',
          plan01: '',
          plan02: 'checked',
          plan03: 'checked',
        },
      ],
    },
  ];

  const testLevel = [
    {
      head: [
        { title: '' },
        { title: 'plan 01' },
        { title: 'plan 02' },
        { title: 'plan 03' },
      ],
      body: [
        {
          title: '도전과제 개수',
          plan01: '3개',
          plan02: '3개',
          plan03: '협의',
        },
        {
          title: '테스터',
          plan01: '15명',
          plan02: '15명',
          plan03: '협의',
        },
        {
          title: '타겟',
          plan01: '3개',
          plan02: '3개',
          plan03: '협의',
        },
      ],
    },
  ];
  const { match } = props;
  return (
    isLoading ? <LoadingIndicator />
      : (
        <>
          {match.path === '/plan/purchase'
            ? <NewPlanForm />
            : (
              <PageTemplate>
                <section className="contents__plan">
                  <article className="box-price">
                    <h1 className="box-price__title">가격 정책</h1>
                    <div className="box-price__contents">
                      <PlanList />
                    </div>
                    <div className="box-start">
                      <p className="box-start__contents">
                        <strong>지금 바로 테스트를 시작해보세요</strong>
                        <Link to="/" className="btn__apply">테스트 시작하기</Link>
                      </p>
                    </div>
                  </article>
                  <article className="box-targetInfo">
                    <h1 className="targetInfo__title">수집 정보</h1>
                    <span className="targetInfo__text">* VAT 별도 / 카드결제 준비중</span>
                    <table className="targetInfor__table">
                      {
                        infoTable.map(info => (
                          <React.Fragment key={info}>
                            <thead>
                              <tr>
                                {
                                  info.head.map(th => (
                                    <th key={th.title}>
                                      <span className="table__title">{th.title}</span>
                                      <br />
                                      <em className="table__desc">{th.desc}</em>
                                    </th>
                                  ))
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {
                                info.body.map(td => (
                                  <tr key={td.title}>
                                    <td>{td.title}</td>
                                    <td><i className={`table__checkbox${td.plan01.length > 0 ? `-${td.plan01}` : ''}`}>{td.plan01}</i></td>
                                    <td><i className={`table__checkbox${td.plan02.length > 0 ? `-${td.plan02}` : ''}`}>{td.plan02}</i></td>
                                    <td><i className={`table__checkbox${td.plan03.length > 0 ? `-${td.plan03}` : ''}`}>{td.plan03}</i></td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </React.Fragment>
                        ))
                      }
                    </table>
                  </article>
                  <article className="box-test">
                    <h1 className="test__title">테스트 설계</h1>
                    <table className="test__table">
                      {
                        testLevel.map(test => (
                          <React.Fragment key={test}>
                            <thead>
                              <tr>
                                {
                                  test.head.map(th => (
                                    <th key={th.title}>
                                      <span className="table__title">{th.title}</span>
                                    </th>
                                  ))
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {
                                test.body.map(td => (
                                  <tr key={td.title}>
                                    <td>{td.title}</td>
                                    <td>{td.plan01}</td>
                                    <td>{td.plan02}</td>
                                    <td>{td.plan03}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </React.Fragment>
                        ))
                      }
                    </table>
                  </article>
                </section>
              </PageTemplate>
            )}
        </>
      )
  );
};

export default Plan;
