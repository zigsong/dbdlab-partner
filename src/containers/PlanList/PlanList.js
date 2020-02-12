import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Slider, Rail, Handles, Ticks,
} from 'react-compound-slider';
import { togglePopup } from 'modules/popup';
import { resetVoucherOrder } from 'modules/order';
import MailPopup from 'containers/MailPopup';
import './PlanList.scss';

const PlanList = (props) => {
  const dispatch = useDispatch();
  const [isMore, setMore] = useState(false);

  useEffect(() => { dispatch(resetVoucherOrder()); }, [dispatch]);

  const priceList = [
    {
      title: 'plan 01',
      price: [
        { 1: 500000 },
        { 2: 500000 - (500000 * 0.01) },
        { 3: 500000 - (500000 * 0.02) },
        { 4: 500000 - (500000 * 0.03) },
        { 5: 500000 - (500000 * 0.04) },
        { 6: 500000 - (500000 * 0.05) },
        { 7: 500000 - (500000 * 0.06) },
        { 8: 500000 - (500000 * 0.07) },
        { 9: 500000 - (500000 * 0.08) },
        { 10: 500000 - (500000 * 0.09) },
        { 11: 500000 - (500000 * 0.15) },
      ],
      expired: [
        { 1: 30 },
        { 2: 50 },
        { 3: 70 },
        { 4: 70 },
        { 5: 70 },
        { 6: 70 },
        { 7: 70 },
        { 8: 70 },
        { 9: 70 },
        { 10: 70 },
        { 11: 100 },
      ],
    },
    {
      title: 'plan 02',
      price: [
        { 1: 800000 },
        { 2: 800000 - (800000 * 0.01) },
        { 3: 800000 - (800000 * 0.02) },
        { 4: 800000 - (800000 * 0.03) },
        { 5: 800000 - (800000 * 0.04) },
        { 6: 800000 - (800000 * 0.05) },
        { 7: 800000 - (800000 * 0.06) },
        { 8: 800000 - (800000 * 0.07) },
        { 9: 800000 - (800000 * 0.08) },
        { 10: 800000 - (800000 * 0.09) },
        { 11: 800000 - (800000 * 0.15) },
      ],
      expired: [
        { 1: 30 },
        { 2: 50 },
        { 3: 70 },
        { 4: 70 },
        { 5: 70 },
        { 6: 70 },
        { 7: 70 },
        { 8: 70 },
        { 9: 70 },
        { 10: 70 },
        { 11: 100 },
      ],
    },
    {
      title: 'plan 03',
      price: 'Customize\nyour own plan',
    },
  ];
  const handleToggleList = (e) => {
    e.preventDefault();

    setMore(!isMore);
  };

  const getExpiredDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const expired = `${String(year).substring(2, 5)}.${`0${month}`.slice(-2)}.${`0${day}`.slice(-2)}`;

    return expired;
  };

  const Handle = ({
    handle: { id, value, percent },
    getHandleProps,
    index,
    list,
  }) => (
    <>
      <div
        className="handle"
        style={{ left: `${percent}%` }}
        {...getHandleProps(id)}
      />
      <p className={`plan__desc plan0${index + 1}--more`}>
        { index === 0
          ? (
            <>
              <span className="desc__text">
                Basic
                <br />
                <strong className="text--point">{value === 11 ? '11+' : value}</strong>
                개 구매 시,
              </span>
              <span className="desc__price">
                <strong>
                  ₩
                  {list.price.map((price, i) => (
                    i + 1 === value ? (
                      <span key={price} className="price--text">
                        {price[i + 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : null
                  ))}
<span className="mount">/개</span>
                </strong>
                <em>/ plan</em>
                <button type="button" className="link-changePlan" onClick={e => handleToggleList(e)}>단일 구매를 원해요</button>
              </span>
              {list.expired.map((days, j) => (
                j + 1 === value ? (
                  <span key={days} className="desc__expired">
                    유효기간.
                    {getExpiredDate(days[j + 1])}
                  </span>
                ) : null
              ))}
            </>
          )
          : (
            <>
              <span className="desc__text">
                Basic + Consulting
                <br />
                <strong className="text--point">{value === 11 ? '11+' : value}</strong>
                개 구매 시,
              </span>
              <span className="desc__price">
                <strong>
                  ₩
                  {list.price.map((price, k) => (
                    k + 1 === value ? (
                      <span key={price} className="price--text">
                        {price[k + 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : null
                  ))}
<span className="mount">/개</span>
                </strong>
                <em>/ plan</em>
                <button type="button" className="link-changePlan" onClick={e => handleToggleList(e)}>단일 구매를 원해요</button>
              </span>
              {list.expired.map((days, l) => (
                l + 1 === value ? (
                  <span key={days} className="desc__expired">
                    유효기간.
                    {getExpiredDate(days[l + 1])}
                  </span>
                ) : null
              ))}
            </>
          )
        }
      </p>
    </>
  );

  const Tick = ({ tick }) => (
    <div className="ticks">
      <div
        className="tick"
        style={{ left: `${tick.percent}%` }}
      />
    </div>
  );

  const MorePlanList = ({ index, list }) => (
    <>
      <div className="plan__slider">
        <Slider
          className="slider-amount"
          domain={[1, 11]}
          values={[1]}
          step={1}
          mode={2}
        >
          <Rail>
            {({ getRailProps }) => (
              <div className="slider__rail" {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider__handle">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                    index={index}
                    list={list}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Ticks count={6}>
            {({ ticks }) => (
              <div className="slider__ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
      <Link to="/plan/purchase" className="btn btn-buy">바우처 구매하기</Link>
    </>
  );

  const SinglePlanList = ({ list, index }) => (
    <>
      <p className={`plan__desc plan0${index + 1}--single`}>
        { index === 0
          ? (
            <>
              <span className="desc__text">Basic</span>
              <span className="desc__price">
                <strong>
                  ₩
                  {list.price.map((price, i) => (
                    i === 0 ? (
                      <span key={price[i + 1]} className="price--text">
                        {price[i + 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : null
                  ))}
                </strong>
                <em>/ plan</em>
              </span>
              {list.expired.map((days, j) => (
                j === 0 ? (
                  <span key={days} className="desc__expired">
                    유효기간.
                    {getExpiredDate(days[j + 1])}
                  </span>
                ) : null
              ))}
            </>
          )
          : (
            <>
              <span className="desc__text">Basic + Consulting</span>
              <span className="desc__price">
                <strong>
                  ₩
                  {list.price.map((price, k) => (
                    k === 0 ? (
                      <span key={price} className="price--text">
                        {price[k + 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : null
                  ))}
                </strong>
                <em>/ plan</em>
              </span>
              {list.expired.map((days, l) => (
                l === 0 ? (
                  <span key={days} className="desc__expired">
                    유효기간.
                    {getExpiredDate(days[l + 1])}
                  </span>
                ) : null
              ))}
            </>
          )
        }
      </p>
      <button type="button" className="btn-changePlan" onClick={e => handleToggleList(e)}>대량 구매를 원해요</button>
    </>
  );

  const { isOpen } = props;

  return (
    <ul className="box-price__list">
      {
        priceList.map((list, index) => (
          <li key={list.title} className="list__item">
            <article className="item__plan">
              <h2 className="plan__title">{list.title}</h2>
              { index !== 2
                ? (
                  <>
                    { isMore
                      ? <MorePlanList list={list} index={index} />
                      : <SinglePlanList list={list} index={index} />
                    }
                  </>
                )
                : (
                  <>
                    <p className="plan__desc plan03">
                      특별한 요구사항이
                      <br />
                      있으신가요?
                    </p>
                    <button className="btn btn-buy" type="button" onClick={() => dispatch(togglePopup(true))}>
                      문의하기
                    </button>
                  </>
                )
              }
            </article>
          </li>
        ))
      }
      <MailPopup isPop={isOpen} />
    </ul>
  );
};

export default PlanList;
