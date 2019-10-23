import React from 'react';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import FormTextArea from 'components/FormTextArea';
import { Field } from 'redux-form';

const registerRequired = value => (value ? undefined : '테스트 진행에 회원가입이 필요한가요?');
const issue1Required = value => (value ? undefined : '도전과제는 최소 1개 이상 선택해야 합니다');
const issueDetail1Required = value => (value ? undefined : '선택하신 사용성 이슈에 대한 상세 설명을 적어주세요');
const issuePurpose1Required = value => (value ? undefined : '도전과제를 통해 무엇을 알고 싶으신가요?');
const valueRegExp = value => (value && value.replace(/(^\s*)|(\s*$)/g, '').length < 1 ? '다시 한 번 확인해 주세요' : undefined);
const valueNumberRegExp = value => (value && value.replace(/^[0-9]/, '').length < 1 ? '정확하게 입력해주세요' : undefined);
const valueEtcRegExp = value => (value && value.replace(/^[^0-9a-zA-Z]/, '').length < 2 ? '명확하게 입력해주세요' : undefined);

const TestFormQuest = (props) => {
  const {
    qId,
    issueCategory,
    isDisabled,
    handleBlurSave,
  } = props;
  const registerCategory = ['아니오', '네(+3,000원/명)'];

  return (
    <div className="field-wrapper--quest">
      <section className="field__section--collapse">
        <div className="field-halfblock">
          <span className="field__title">
            <strong className="title">회원가입 필요한가요?*</strong>
          </span>
          <Field
            name="registerRequire"
            type="select"
            defaultValue="카테고리 선택"
            component={FormSelect}
            onBlur={handleBlurSave}
            validate={registerRequired}
            disabled={isDisabled}
          >
            <option value="카테고리 선택" disabled>카테고리 선택</option>
            {registerCategory.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Field>
        </div>
      </section>
      <section className="field__section">
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 1*</strong>
          </span>
          <Field
            name={`issue.q${qId[0]}`}
            type="select"
            defaultValue="사용성 이슈 선택"
            component={FormSelect}
            onBlur={handleBlurSave}
            validate={[
              issue1Required,
              valueRegExp,
              valueNumberRegExp,
              valueEtcRegExp,
            ]}
            disabled={isDisabled}
          >
            <option value="사용성 이슈 선택" disabled>사용성 이슈 선택</option>
            {issueCategory.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Field>
          <Field
            name={`issueDetail.q${qId[0]}`}
            type="text"
            label={`quest.issueDetail.q${qId[0]}`}
            placeholder="선택한 이슈를 상세하게 적어주세요"
            component={FormInput}
            onBlur={handleBlurSave}
            validate={[
              issueDetail1Required,
              valueRegExp,
              valueNumberRegExp,
              valueEtcRegExp,
            ]}
            disabled={isDisabled}
          />
        </div>
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 2</strong>
          </span>
          <Field
            name={`issue.q${qId[1]}`}
            type="select"
            defaultValue="사용성 이슈 선택"
            component={FormSelect}
            disabled={isDisabled}
            up
          >
            <option value="사용성 이슈 선택" disabled>사용성 이슈 선택</option>
            {issueCategory.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Field>
          <Field
            name={`issueDetail.q${qId[1]}`}
            type="text"
            label={`quest.issueDetail.q${qId[1]}`}
            placeholder="선택한 이슈를 상세하게 적어주세요"
            component={FormInput}
            onBlur={handleBlurSave}
            disabled={isDisabled}
          />
        </div>
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 3</strong>
          </span>
          <Field
            name={`issue.q${qId[2]}`}
            type="select"
            defaultValue="사용성 이슈 선택"
            component={FormSelect}
            disabled={isDisabled}
            up
          >
            <option value="사용성 이슈 선택" disabled>사용성 이슈 선택</option>
            {issueCategory.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Field>
          <Field
            name={`issueDetail.q${qId[2]}`}
            type="text"
            label={`quest.issueDetail.q${qId[2]}`}
            placeholder="선택한 이슈를 상세하게 적어주세요"
            component={FormInput}
            onBlur={handleBlurSave}
            disabled={isDisabled}
          />
        </div>
      </section>
      <section className="field__section">
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 1을 통해 어떤 것을 알고 싶은가요?*</strong>
          </span>
          <Field
            name={`issuePurpose.q${qId[0]}`}
            type="text"
            label={`quest.issuePurpose.q${qId[0]}`}
            placeholder="텍스트 입력"
            component={FormTextArea}
            onBlur={handleBlurSave}
            validate={[
              issuePurpose1Required,
              valueRegExp,
              valueNumberRegExp,
              valueEtcRegExp,
            ]}
            disabled={isDisabled}
          />
        </div>
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 2를 통해 어떤 것을 알고 싶은가요?</strong>
          </span>
          <Field
            name={`issuePurpose.q${qId[1]}`}
            type="text"
            label={`quest.issuePurpose.q${qId[1]}`}
            placeholder="텍스트 입력"
            component={FormTextArea}
            onBlur={handleBlurSave}
            disabled={isDisabled}
          />
        </div>
        <div className="field">
          <span className="field__title">
            <strong className="title">도전과제 3을 통해 어떤 것을 알고 싶은가요?</strong>
          </span>
          <Field
            name={`issuePurpose.q${qId[2]}`}
            type="text"
            label={`quest.issuePurpose.q${qId[2]}`}
            placeholder="텍스트 입력"
            component={FormTextArea}
            onBlur={handleBlurSave}
            disabled={isDisabled}
          />
        </div>
      </section>
    </div>
  );
};

export default TestFormQuest;
