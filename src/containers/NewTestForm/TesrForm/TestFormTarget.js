import React, { useState } from 'react';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import { Field } from 'redux-form';

const ageRequired = value => (value ? undefined : '나이를 입력해 주세요');
const minAgeVerify = value => (value && parseInt(value, 10) > 13 ? undefined : '14살 이상부터 가능합니다');
const maxAgeVerify = value => (value && parseInt(value, 10) < 101 ? undefined : '100세까지 가능합니다');
const genderRequired = value => (value ? undefined : '성별을 선택해 주세요');

const TestFormTarget = (props) => {
  const [extraInfoBox, setInfoBox] = useState([0]);
  const { extraInfoCategory, isDisabled } = props;
  const genderCategory = [
    '남자', '여자', '무관',
  ];
  console.log(extraInfoBox);

  const addInfoBox = (num) => {
    if (extraInfoBox.length > 2) {
      alert('추가 정보는 3개까지 추가 가능합니다');
      return false;
    }
    return setInfoBox([
      ...extraInfoBox,
      num,
    ]);
  };

  const removeInfoBox = () => {
    const tempArr = extraInfoBox.slice();
    const resultArr = tempArr.slice(0, -1);

    if (extraInfoBox.length < 2) {
      return false;
    }
    return setInfoBox(resultArr);
  };

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
          {extraInfoBox.map(n => (
            <div className="field__box" key={n}>
              <Field
                name="extraInfoCategory"
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
                name="extraInfoDesc"
                type="text"
                label="target.extraInfoDesc"
                placeholder="텍스트 입력"
                component={FormInput}
                disabled={isDisabled}
              />
              {n === 0
                ? <button type="button" className="btn-target-add" onClick={() => addInfoBox(extraInfoBox.length)}>타겟 추가하기</button>
                : <button type="button" className="btn-target-remove" onClick={() => removeInfoBox()}>타겟 제거하기</button>
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
            placeholder="#단어를 입력해주세요"
            component={FormInput}
            disabled={isDisabled}
          />
        </div>
      </section>
    </div>
  );
};

export default TestFormTarget;
