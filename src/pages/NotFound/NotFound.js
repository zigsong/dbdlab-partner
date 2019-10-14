import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => (
  <div className="container--notfound">
    <span className="box-image">
      <img src="/static/images/contents/img_notfound.png" alt="Not Found" />
    </span>
    <span className="box-text">
      저런...  페이지를 찾을 수 없어요ㅜㅜ
    </span>
    <Link to="/" className="btn-back">홈으로 돌아가기</Link>
  </div>
);

export default NotFound;
