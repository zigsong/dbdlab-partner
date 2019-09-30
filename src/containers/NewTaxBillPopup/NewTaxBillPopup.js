/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopup } from 'modules/popup';
import { patchVoucher, patchTestOrder } from 'modules/order';
import PopupTemplate from 'components/PopupTemplate';
import TaxBillForm from './TaxBillForm';
import './NewTaxBillPopup.scss';

class NewTaxBillPopup extends Component {
  state = {
    hasComplete: false,
  };

  onSubmit = (values) => {
    const {
      handlePopup,
      patchVoucher,
      patchTestOrder,
      voucherOrder,
      testOrder,
    } = this.props;
    const { company, companyRegistNum, email } = values.tax;
    const hasAllValues = !!company
      && !!companyRegistNum
      && !!email
      && ((!!voucherOrder) || !!testOrder);

    if (testOrder !== undefined && testOrder.id) {
      if (hasAllValues) {
        patchTestOrder(
          testOrder.id,
          undefined,
          testOrder.coupon_type,
          testOrder.plan.name,
          testOrder.plan.description,
          testOrder.ordered_price,
          undefined,
          undefined,
          testOrder.is_paid,
          testOrder.paid_at,
          true,
          email,
          company,
          companyRegistNum,
        )
          .then(() => {
            this.setState({
              hasComplete: true,
            }, () => {
              setTimeout(() => {
                this.setState(({
                  hasComplete: false,
                }), () => { handlePopup(false); });
              }, 2000);
            });
          });
      } else {
        alert('something wrong1');
      }
    }

    if (voucherOrder !== undefined && voucherOrder.voucherId) {
      if (hasAllValues) {
        patchVoucher(
          company,
          companyRegistNum,
          email,
          voucherOrder.voucherId,
          voucherOrder.totalAmount,
          true,
        )
          .then((res) => {
            console.log(res);
            this.setState({
              hasComplete: true,
            }, () => {
              setTimeout(() => {
                this.setState(({
                  hasComplete: false,
                }), () => { handlePopup(false); });
              }, 2000);
            });
          });
      } else {
        alert('something wrong2');
      }
    }
  };

  render() {
    const { show, handlePopup } = this.props;
    const { hasComplete } = this.state;

    return (
      <PopupTemplate isShow={show} title="세금계산서 신청">
        <TaxBillForm
          onPopup={handlePopup}
          onSubmit={this.onSubmit}
        />
        <div className={`box__alert${hasComplete ? ' alert' : ''}`}>
          <strong>신청이 완료되었어요 :)</strong>
          <span>빠른 안내 드리도록 하겠습니다.</span>
        </div>
      </PopupTemplate>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.popup.isOpen,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
  patchVoucher: (
    company,
    companyRegistNum,
    email,
    voucherId,
    voucherAmount,
    hasTaxBillReq,
  ) => dispatch(patchVoucher(
    company,
    companyRegistNum,
    email,
    voucherId,
    voucherAmount,
    hasTaxBillReq,
  )),
  patchTestOrder: (
    oId,
    cCode,
    cType,
    planName,
    planDesc,
    originPrice,
    discountedPrice,
    totalPrice,
    isPaid,
    paidDate,
    hasTaxBillReq,
    taxEmail,
    taxCompany,
    taxCompanyRegistNum,
  ) => dispatch(patchTestOrder(
    oId,
    cCode,
    cType,
    planName,
    planDesc,
    originPrice,
    discountedPrice,
    totalPrice,
    isPaid,
    paidDate,
    hasTaxBillReq,
    taxEmail,
    taxCompany,
    taxCompanyRegistNum,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTaxBillPopup);
