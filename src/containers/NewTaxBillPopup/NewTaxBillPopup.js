/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopup } from 'modules/popup';
import { patchTestTaxBill, patchVoucherTaxBill } from 'modules/order';
import PopupTemplate from 'components/PopupTemplate';
import ToastAlert from 'components/ToastAlert';
import TaxBillForm from './TaxBillForm';
import './NewTaxBillPopup.scss';

class NewTaxBillPopup extends Component {
  state = {
    hasComplete: false,
  };

  onSubmit = (values) => {
    const {
      handlePopup,
      patchVoucherTaxBill,
      patchTestTaxBill,
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
        patchTestTaxBill(
          testOrder.id,
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
        patchVoucherTaxBill(
          voucherOrder.voucherId,
          true,
          email,
          company,
          companyRegistNum,
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
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
            console.log(err.message);
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
        {hasComplete
          ? (
            <ToastAlert
              title="신청이 완료되었어요 :)"
              subtitle="빠른 안내 드리도록 하겠습니다"
              isShow={hasComplete}
            />
          )
          : null}
      </PopupTemplate>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.popup.isOpen,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: isOpen => dispatch(togglePopup(isOpen)),
  patchVoucherTaxBill: (
    voucherId,
    hasTaxBillReq,
    email,
    company,
    companyRegistNum,
  ) => dispatch(patchVoucherTaxBill(
    voucherId,
    hasTaxBillReq,
    email,
    company,
    companyRegistNum,
  )),
  patchTestTaxBill: (
    oId,
    hasTaxBillReq,
    taxEmail,
    taxCompany,
    taxCompanyRegistNum,
  ) => dispatch(patchTestTaxBill(
    oId,
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
