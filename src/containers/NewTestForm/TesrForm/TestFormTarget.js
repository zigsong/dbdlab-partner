import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { Field } from 'redux-form';
import { getTarget, deleteTargetExtra } from 'modules/target';

const ageRequired = value => (value ? undefined : '나이를 입력해 주세요');
const minAgeVerify = value => (value && parseInt(value, 10) > 13 ? undefined : '14살 이상부터 가능합니다');
const maxAgeVerify = value => (value && parseInt(value, 10) < 101 ? undefined : '100세까지 가능합니다');
const genderRequired = value => (value ? undefined : '성별을 선택해 주세요');

const TestFormTarget = (props) => {
  const {
    tgId,
    extraInfoCategory,
    extraValue,
    isDisabled,
  } = props;

  const setExtraValue = () => {
    if (extraValue.length > 3) {
      extraValue.length = 3;
    } else if (extraValue.length < 1) {
      extraValue.push({ id: 1 });
    }
    return extraValue;
  };
  const [extraInfoBox, setInfoBox] = useState(setExtraValue);

  useEffect(() => {
    setInfoBox(setExtraValue);
  }, [extraValue]);

  const genderCategory = [
    '남자', '여자', '무관',
  ];

  const addInfoBox = () => {
    const hasId = extraInfoBox.filter(x => x.id).length;
    const hasValue = extraInfoBox.filter(x => x.value).length;

    if (hasId !== hasValue) {
      alert('추가 정보를 입력해 주세요');
      return false;
    }

    if (extraInfoBox.length > 2) {
      alert('추가 정보는 3개까지 가능합니다');
      return false;
    }

    return setInfoBox([
      ...extraInfoBox,
      { id: extraInfoBox[extraInfoBox.length - 1].id + 1 },
    ]);
  };

  const removeInfoBox = (idx) => {
    // eslint-disable-next-line no-shadow
    const { deleteTargetExtra, getTarget } = props;
    const tempArr = extraInfoBox.slice();
    const resultArr = tempArr.slice(0, -1);
    const hasValue = tempArr[idx].value !== undefined ? tempArr[idx].value.length > 0 : undefined;

    if (extraInfoBox.length < 2) {
      return false;
    }

    if (hasValue !== undefined && !!hasValue) {
      const exTgId = tempArr[idx].id;

      deleteTargetExtra(exTgId, tgId)
        .then((res) => {
          console.log(res);
          getTarget(tgId);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          console.log(err.message);
        });
    }

    return setInfoBox(resultArr);
  };

  const { handleBlurSave } = props;

  return (
    <div className="field-wrapper--target">
      <section className="field__section">
        <div className="field">
          <span className="field__title">
            <strong className="title">누가 이 서비스를 주로 이용하나요? (타겟 정보)*</strong>
            <span className="subtitle">타겟 인원수는 15명 입니다</span>
          </span>
          <p className="box-field">
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
          <p className="box-field">
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
          {extraInfoBox.map((n, idx) => (
            <div className="field__box" key={n.id}>
              <Field
                name={`extraInfoCategory${idx + 1}`}
                type="select"
                defaultValue="추가 정보 선택"
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
                    onClick={() => addInfoBox()}
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
};

const mapDispatchToProps = dispatch => ({
  deleteTargetExtra: (exTgId, tgId) => dispatch(deleteTargetExtra(exTgId, tgId)),
  getTarget: tgId => dispatch(getTarget(tgId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TestFormTarget);
