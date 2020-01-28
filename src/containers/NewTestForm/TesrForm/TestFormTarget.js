/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import Checkbox from 'components/Checkbox';
import { Field } from 'redux-form';
import { getTarget, deleteTargetExtra } from 'modules/target';

const ageRequired = value => (value ? undefined : '나이를 선택해 주세요');
const minAgeVerify = value => (value && parseInt(value, 10) > 13 ? undefined : '14살 이상부터 가능합니다');
const maxAgeVerify = value => (value && parseInt(value, 10) < 101 ? undefined : '100세까지 가능합니다');
const genderRequired = value => (value ? undefined : '성별을 선택해 주세요');

class TestFormTarget extends Component {
  state = {
    extraInfoBox: [],
  }

  componentDidMount() {
    this.setExtraValueArr();
    this.resetCheckbox();
  }

  componentWillUnmount() {
    const { fieldsValues, onChange } = this.props;
    const { target } = fieldsValues;
    const {
      extraInfoCategory1,
      extraInfoCategory2,
      extraInfoCategory3,
      extraInfoDesc1,
      extraInfoDesc2,
      extraInfoDesc3,
    } = target;

    if (extraInfoCategory1 !== undefined
      && (extraInfoDesc1 === undefined || extraInfoDesc1.length < 1)) {
      onChange('target.extraInfoDesc1', '');
    }

    if (extraInfoCategory2 !== undefined
      && (extraInfoDesc2 === undefined || extraInfoDesc2.length < 1)) {
      onChange('target.extraInfoDesc2', '');
    }

    if (extraInfoCategory3 !== undefined
      && (extraInfoDesc3 === undefined || extraInfoDesc3.length < 1)) {
      onChange('target.extraInfoDesc3', '');
    }

    if (extraInfoDesc1 !== undefined
      && (extraInfoCategory1 === undefined || extraInfoCategory1.length < 1)) {
      onChange('target.extraInfoCategory1', '');
    }

    if (extraInfoDesc2 !== undefined
      && (extraInfoCategory2 === undefined || extraInfoCategory2.length < 1)) {
      onChange('target.extraInfoCategory2', '');
    }

    if (extraInfoDesc3 !== undefined
      && (extraInfoCategory3 === undefined || extraInfoCategory3.length < 1)) {
      onChange('target.extraInfoCategory3', '');
    }
  }

  setExtraValueArr = () => {
    const { extraValue, fieldsValues } = this.props;
    const { target } = fieldsValues;
    const {
      extraInfoCategory1,
      extraInfoCategory2,
      extraInfoCategory3,
      extraInfoDesc1,
      extraInfoDesc2,
      extraInfoDesc3,
    } = target;
    const tempId = extraValue.length > 0 ? extraValue[0].id : 1;
    const exValueArr = [];

    if (extraInfoCategory1 !== undefined || extraInfoDesc1 !== undefined) {
      exValueArr.push({ id: tempId, value: extraInfoDesc1, name: extraInfoCategory1 });
    }

    if (extraInfoCategory2 !== undefined || extraInfoDesc2 !== undefined) {
      exValueArr.push({ id: tempId + 1, value: extraInfoDesc2, name: extraInfoCategory2 });
    }

    if (extraInfoCategory3 !== undefined || extraInfoDesc3 !== undefined) {
      exValueArr.push({ id: tempId + 2, value: extraInfoDesc3, name: extraInfoCategory3 });
    }

    const exInfoValues = exValueArr.filter(x => x.value).length;
    const exCateValues = exValueArr.filter(x => x.name).length;

    if (target === undefined && extraValue.length > 0) {
      this.setState({
        extraInfoBox: extraValue,
      });
    } else if (target !== undefined && exInfoValues > extraValue.length) {
      this.setState({
        extraInfoBox: exValueArr,
      });
    } else if (target !== undefined && exCateValues > extraValue.length) {
      this.setState({
        extraInfoBox: exValueArr,
      });
    } else if (target !== undefined
      && extraValue.length > 0
      && (extraValue.length === exInfoValues || extraValue.length > exInfoValues)) {
      this.setState({
        extraInfoBox: extraValue,
      });
    } else if (target !== undefined
      && extraValue.length > 0
      && (extraValue.length === exCateValues || extraValue.length > exCateValues)) {
      this.setState({
        extraInfoBox: extraValue,
      });
    } else {
      this.setState({
        extraInfoBox: { id: 1 },
      });
    }
  }

  addInfoBox = () => {
    const { extraValue } = this.props;
    const { extraInfoBox } = this.state;
    const { fieldsValues } = this.props;
    const { target } = fieldsValues;
    const {
      extraInfoCategory1,
      extraInfoCategory2,
      extraInfoCategory3,
      extraInfoDesc1,
      extraInfoDesc2,
      extraInfoDesc3,
    } = target;
    const tempArr = [];
    const inputArr = extraValue.length !== 0
    && (extraValue.length === extraInfoBox.length
    || extraValue.length > extraInfoBox.length
    || extraInfoBox.length === undefined)
      ? tempArr.concat(extraValue) : tempArr.concat(extraInfoBox);
    const exCate = [extraInfoCategory1, extraInfoCategory2, extraInfoCategory3];
    const exDesc = [extraInfoDesc1, extraInfoDesc2, extraInfoDesc3];

    while (exCate.indexOf(undefined) !== -1) {
      exCate.splice(exCate.indexOf(undefined), 1);
    }

    while (exCate.indexOf('') !== -1) {
      exCate.splice(exCate.indexOf(undefined), 1);
    }

    while (exDesc.indexOf(undefined) !== -1) {
      exDesc.splice(exDesc.indexOf(undefined), 1);
    }

    while (exDesc.indexOf('') !== -1) {
      exDesc.splice(exDesc.indexOf(undefined), 1);
    }

    if (extraInfoBox.length > 2 || (exCate.length && exDesc.length === 3)) {
      alert('추가 정보는 3개까지 가능합니다');
      return false;
    }

    if (exCate.length !== exDesc.length) {
      alert('추가 정보를 입력해 주세요');
      return false;
    }

    inputArr.push({
      id: inputArr[inputArr.length - 1].id + 1,
    });

    return this.setState({
      extraInfoBox: inputArr,
    });
  };

  removeInfoBox = (idx) => {
    const { extraInfoBox } = this.state;
    const {
      tgId,
      extraValue,
      onChange,
      deleteTargetExtra,
    } = this.props;
    const tempArr = extraValue.length !== 0
    && (extraValue.length === extraInfoBox.length
    || extraValue.length > extraInfoBox.length
    || extraInfoBox.length === undefined)
      ? extraValue.slice() : extraInfoBox.slice();
    const resultArr = tempArr.slice(0, -1);
    const hasValue = tempArr[idx].value !== undefined ? tempArr[idx].value.length > 0 : undefined;
    const hasName = tempArr[idx].name !== undefined ? tempArr[idx].name.length > 0 : undefined;

    if (extraInfoBox.length < 2) {
      return false;
    }

    if ((hasValue !== undefined && !!hasValue) && hasName !== undefined && !!hasName) {
      const exTgId = tempArr[idx].id;

      deleteTargetExtra(exTgId, tgId)
        .then(() => {
          const { getTarget } = this.props;
          getTarget(tgId)
            .then((res) => {
              this.setState({
                extraInfoBox: res.data.extras,
              });
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response);
              console.log(err.message);
              // setInfoBox(setExtraValue);
            });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          console.log(err.message);
        });
    } else {
      onChange(`target.extraInfoDesc${idx + 1}`, '');
      onChange(`target.extraInfoCategory${idx + 1}`, '');
    }

    return this.setState({
      extraInfoBox: resultArr,
    });
  };

  resetCheckbox = () => {
    const { onChange, fieldsValues } = this.props;
    const { minAge, maxAge } = fieldsValues.target || {};
    [[15, 19], [20, 25], [26, 30], [31, 40], [41, 50], [51, 70]].forEach((range) => {
      onChange(`target.age_${range[0]}_${range[1]}`, minAge != null && minAge <= range[0] && range[1] <= maxAge);
    });
    onChange('target.all', minAge === 15 && maxAge === 70);
  }

  changeAgeRange = (range, isAll = false) => {
    const { onChange, fieldsValues } = this.props;
    const { target } = fieldsValues;

    if (isAll) {
      this.resetCheckbox();
      const isChecked = !!target.all;
      if (isChecked) {
        onChange('target.minAge', null);
        onChange('target.maxAge', null);
        onChange('target.checkboxCount', 0);
        [[15, 19], [20, 25], [26, 30], [31, 40], [41, 50], [51, 70]].forEach((range) => {
          onChange(`target.age_${range[0]}_${range[1]}`, false);
        });
      } else {
        onChange('target.minAge', range[0]);
        onChange('target.maxAge', range[1]);
        onChange('target.checkboxCount', 1);
        [[15, 19], [20, 25], [26, 30], [31, 40], [41, 50], [51, 70]].forEach((range) => {
          onChange(`target.age_${range[0]}_${range[1]}`, true);
        });
      }
    } else {
      const isChecked = !!target[`age_${range[0]}_${range[1]}`];

      if (isChecked) {
        if (target.minAge === range[0] && target.maxAge === range[1]) {
          onChange('target.minAge', null);
          onChange('target.maxAge', null);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount - 1 : 0);
        } else if (target.minAge === range[0]) {
          onChange('target.minAge', range[1] + 1);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount - 1 : 0);
        } else if (target.maxAge === range[1]) {
          onChange('target.maxAge', range[0] - 1);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount - 1 : 0);
        }
      } else if (target.checkboxCount === undefined || target.checkboxCount < 3) {
        if (target.minAge === null && target.maxAge === null) {
          onChange('target.minAge', range[0]);
          onChange('target.maxAge', range[1]);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount + 1 : 1);
        } else if (target.minAge === range[1] + 1) {
          onChange('target.minAge', range[0]);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount + 1 : 1);
        } else if (target.maxAge === range[0] - 1) {
          onChange('target.maxAge', range[1]);
          onChange('target.checkboxCount', target.checkboxCount ? target.checkboxCount + 1 : 1);
        }
      }
    }
  };

  render() {
    const genderCategory = [
      '남자', '여자', '무관',
    ];
    const {
      isDisabled,
      handleBlurSave,
      extraInfoCategory,
      fieldsValues,
    } = this.props;
    const { extraInfoBox } = this.state;
    const { minAge, maxAge, all } = fieldsValues.target;
    const { addInfoBox, removeInfoBox } = this;
    const tempArr = [];
    const inputArr = tempArr.concat(extraInfoBox);

    return (
      <div className="field-wrapper--target">
        <section className="field__section">
          <div className="field">
            <span className="field__title">
              <strong className="title">누가 이 서비스를 주로 이용하나요? (타겟 정보)*</strong>
              <span className="subtitle">타겟 인원수는 15명 입니다</span>
            </span>
            <p className="box-field" style={{ display: 'none' }}>
              <Field
                name="minAge"
                type="number"
                label="target.minAge"
                placeholder="숫자"
                component={FormInput}
                onBlur={handleBlurSave}
                validate={[ageRequired, minAgeVerify, maxAgeVerify]}
                disabled={isDisabled}
              />
              <span className="input__placeholder">세 부터</span>
            </p>
            <p className="box-field" style={{ display: 'none' }}>
              <Field
                name="maxAge"
                type="number"
                label="target.maxAge"
                placeholder="숫자"
                component={FormInput}
                onBlur={handleBlurSave}
                validate={[ageRequired, minAgeVerify, maxAgeVerify]}
                disabled={isDisabled}
              />
              <span className="input__placeholder">세 까지</span>
            </p>
            <span className="field__title">
              <p className="title">모든 연령 혹은 연속된 연령대를 최대 3개까지 선택해주세요.</p>
            </span>
            <p className="box-field">
              <p style={{ margin: '5px 0' }}>
                <Field
                  name="all"
                  component={Checkbox}
                  label="모든 연령"
                  isChecked={all || (minAge === 15 && maxAge === 70)}
                  onChange={() => this.changeAgeRange([15, 70], true)}
                  disabled={isDisabled}
                />
              </p>
              <div style={{
                width: '100%', height: '1px', background: '#ddd', margin: '10px 0 3px',
              }}
              />
              {
              [[15, 19], [20, 25], [26, 30], [31, 40], [41, 50], [51, 70]].map((range, i) => (
                <p style={{ margin: '3px 0' }}>
                  <Field
                    name={`age_${range[0]}_${range[1]}`}
                    component={Checkbox}
                    label={`${range[0]}~${range[1]}세`}
                    isChecked={minAge !== null && minAge <= range[0] && range[1] <= maxAge}
                    disabled={all || (minAge === 15 && maxAge === 70) || isDisabled}
                    onChange={() => this.changeAgeRange(range)}
                  />
                </p>
              ))
            }
            </p>
            <Field
              name="gender"
              type="select"
              defaultValue="성별 선택"
              component={FormSelect}
              onBlur={handleBlurSave}
              validate={genderRequired}
              disabled={isDisabled}
            >
              <option value="성별 선택" disabled>성별 선택</option>
              {genderCategory.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Field>
          </div>
          <div className="field">
            <span className="field__title">
              <strong className="title">추가 정보 선택</strong>
            </span>
            {inputArr.map((n, idx) => (
              <div className="field__box" key={n.id}>
                <Field
                  name={`extraInfoCategory${idx + 1}`}
                  type="select"
                  defaultValue="추가 정보 선택"
                  onBlur={handleBlurSave}
                  component={FormSelect}
                  disabled={isDisabled}
                >
                  <option value="추가 정보 선택" disabled>추가 정보 선택</option>
                  {extraInfoCategory.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Field>
                <Field
                  name={`extraInfoDesc${idx + 1}`}
                  type="text"
                  label={`target.extraInfoDesc${idx + 1}`}
                  placeholder="텍스트 입력"
                  onBlur={handleBlurSave}
                  component={FormInput}
                  disabled={isDisabled}
                />
                {idx === 0
                  ? (
                    <button
                      type="button"
                      className="btn-target-add"
                      onClick={e => addInfoBox(e)}
                      disabled={isDisabled}
                    >
                      타겟 추가하기
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="btn-target-remove"
                      onClick={() => removeInfoBox(idx)}
                      disabled={isDisabled}
                    >
                      타겟 제거하기
                    </button>
                  )
                }
              </div>
            ))}
          </div>
          <div className="field">
            <span className="field__title">
              <strong className="title">관심사 (1가지 이상 해당 시, 우선 노출됩니다)</strong>
            </span>
            <Field
              name="interest"
              type="text"
              label="target.interest"
              placeholder="#해시태그 #형식으로 #입력해주세요"
              component={FormInput}
              onBlur={handleBlurSave}
              disabled={isDisabled}
            />
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteTargetExtra: (exTgId, tgId) => dispatch(deleteTargetExtra(exTgId, tgId)),
  getTarget: tgId => dispatch(getTarget(tgId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TestFormTarget);
