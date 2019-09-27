/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopup } from 'modules/popup';
import { patchVoucher } from 'modules/order';
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
      voucherId,
      voucherAmount,
    } = this.props;
    const { company, companyRegistNum, email } = values.tax;
    console.log(company, companyRegistNum, email, voucherId, voucherAmount);
    const hasAllValues = !!company && !!companyRegistNum && !!email && !!voucherId && !!voucherAmount;
    console.log(hasAllValues);

    if (hasAllValues) {
      patchVoucher(company, companyRegistNum, email, voucherId, voucherAmount)
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
      alert('something wrong');
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
  ) => dispatch(patchVoucher(
    company,
    companyRegistNum,
    email,
    voucherId,
    voucherAmount,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTaxBillPopup);
