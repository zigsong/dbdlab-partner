import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePopup } from 'modules/popup';
import NewTaxBillPopup from 'containers/NewTaxBillPopup';
import './PayAccountInfo.scss';

const PayAccountInfo = (props) => {
  const handlePopup = (isOpen) => {
    props.togglePopup(isOpen);
  };

  const {
    submit,
    isOpen,
    voucherOrder,
    testOrder,
  } = props;

  return (
    <>
      <div className="field-wrapper--pay-info">
        <div className="wrapper-inner">
          <p className="pay-info__text">
            <strong>리얼답을 이용해주셔서 감사합니다.</strong>
            <br />
            아래 계좌정보로 입금해주시면 확인 후,
            <br />
            입력하신 메일로 바우처 시리얼 넘버를 보내드리겠습니다.
          </p>
          <p className="pay-info__account">
            <span className="account__title">입금계좌</span>
            <strong className="account_info">
              디비디랩주식회사
              <br />
              기업은행 036-107482-04-016
            </strong>
            <span className="account__title">입금액</span>
            <strong className="account_info">
              {voucherOrder === undefined ? testOrder.charged_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : voucherOrder.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
              <span className="price__desc-text">VAT 포함</span>
            </strong>
          </p>
          <button type="button" className="btn__tax-invoice" onClick={() => handlePopup(true)}>세금계산서 신청하기</button>
          {voucherOrder === undefined
            ? <button type="button" className="btn__confirm" onClick={submit}>확인</button>
            : <Link to="/my/payment" className="btn__confirm" onClick={submit}>확인</Link>
          }
        </div>
      </div>
      <NewTaxBillPopup
        show={isOpen}
        handlePopup={handlePopup}
        voucherOrder={voucherOrder}
        testOrder={testOrder}
      />
    </>
  );
};

const mapStatesToProps = state => ({
  isOpen: state.popup.isOpen,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps,
)(PayAccountInfo);
