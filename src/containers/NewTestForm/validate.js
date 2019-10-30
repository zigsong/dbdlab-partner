const validate = (values) => {
  const errors = {
    default: {},
    target: {},
    quest: {
      issue: {},
      issueDetail: {},
      issuePurpose: {},
    },
    pay: {},
  };
  const hasValue = Object.keys(values).length > 0;

  console.log(values);

  if (hasValue) {
    // target
    if (values.target.minAge > values.target.maxAge) {
      errors.target.minAge = '나이를 다시 확인해 주세요';
      errors.target.maxAge = '범위를 다시 확인해 주세요';
    }

    if (values.target.minAge > values.target.maxAge) {
      errors.target.minAge = '나이를 다시 확인해 주세요';
      errors.target.maxAge = '범위를 다시 확인해 주세요';
    }

    if (
      values.target.extraInfoCategory1 !== undefined
        && (values.target.extraInfoDesc1 === undefined
          || values.target.extraInfoDesc1.length < 1)
    ) {
      errors.target.extraInfoDesc1 = '해당하는 정보를 적어 주세요';
    }

    if (
      values.target.extraInfoCategory2 !== undefined
        && (values.target.extraInfoDesc2 === undefined
          || values.target.extraInfoDesc2.length < 1)
    ) {
      errors.target.extraInfoDesc2 = '해당하는 정보를 적어 주세요';
    }

    if (
      values.target.extraInfoCategory3 !== undefined
        && (values.target.extraInfoDesc3 === undefined
          || values.target.extraInfoDesc3.length < 1)
    ) {
      errors.target.extraInfoDesc3 = '해당하는 정보를 적어 주세요';
    }

    // quest
    const issue1qId = values.quest.issue !== undefined ? Object.keys(values.quest.issue)[0] : 1;
    const issue2qId = values.quest.issue !== undefined ? Object.keys(values.quest.issue)[1] : 2;
    const issue3qId = values.quest.issue !== undefined ? Object.keys(values.quest.issue)[2] : 3;
    const issue1qValue = values.quest.issue !== undefined
      ? values.quest.issue[issue1qId] : undefined;
    const issue2qValue = values.quest.issue !== undefined
      ? values.quest.issue[issue2qId] : undefined;
    const issue3qValue = values.quest.issue !== undefined
      ? values.quest.issue[issue3qId] : undefined;
    const issueDetail1qValue = values.quest.issueDetail !== undefined
      ? values.quest.issueDetail[issue1qId] : undefined;
    const issueDetail2qValue = values.quest.issueDetail !== undefined
      ? values.quest.issueDetail[issue2qId] : undefined;
    const issueDetail3qValue = values.quest.issueDetail !== undefined
      ? values.quest.issueDetail[issue3qId] : undefined;
    const issuePurpose1qValue = values.quest.issuePurpose !== undefined
      ? values.quest.issuePurpose[issue1qId] : undefined;
    const issuePurpose2qValue = values.quest.issuePurpose !== undefined
      ? values.quest.issuePurpose[issue2qId] : null;
    const issuePurpose3qValue = values.quest.issuePurpose !== undefined
      ? values.quest.issuePurpose[issue3qId] : undefined;

    if (issue1qValue === undefined) {
      if (issue2qValue !== undefined) {
        errors.quest.issue[issue2qId] = '도전과제 1을 먼저 선택해 주세요';
      }

      if (issue3qValue !== undefined) {
        errors.quest.issue[issue3qId] = '도전과제 1을 먼저 선택해 주세요';
      }
    }

    if (issue1qValue !== undefined && issue2qValue === undefined) {
      if (issue3qValue !== undefined) {
        errors.quest.issue[issue3qId] = '도전과제 2를 먼저 선택해 주세요';
      }
    }

    if (issue1qValue !== undefined && issuePurpose1qValue === undefined) {
      errors.quest.issuePurpose[issue1qId] = '도전과제 1을 통해 알고 싶으신 것을 작성해 주세요';
    }

    if (issue2qValue !== undefined && issuePurpose2qValue === undefined) {
      errors.quest.issuePurpose[issue2qId] = '도전과제 2를 통해 알고 싶으신 것을 작성해 주세요';
    }

    if (issue3qValue !== undefined && issuePurpose3qValue === undefined) {
      errors.quest.issuePurpose[issue3qId] = '도전과제 3을 통해 알고 싶으신 것을 작성해 주세요';
    }

    if (issue1qValue !== undefined && issueDetail1qValue === undefined) {
      errors.quest.issueDetail[issue1qId] = '도전과제 1에 대해 자세히 적어주세요';
    }

    if (issue2qValue !== undefined && issueDetail2qValue === undefined) {
      errors.quest.issueDetail[issue2qId] = '도전과제 2에 대해 자세히 적어주세요';
    }

    if (issue3qValue !== undefined && issueDetail3qValue === undefined) {
      errors.quest.issueDetail[issue3qId] = '도전과제 3에 대해 자세히 적어주세요';
    }

    if (values.pay.coupon !== 'WELCOME_BACK' && values.pay.coupon !== undefined) {
      if (values.pay.couponNum === undefined) {
        errors.pay.couponNum = '쿠폰, 혹은 시리얼 넘버를 정확히 입력해 주셔야 합니다';
      }

      if (values.pay.couponNum !== undefined && values.pay.couponNum.replace(/(^\s*)|(\s*$)/g, '').length < 1) {
        errors.pay.couponNum = '형식에 맞게 입력해 주세요';
      }

      if (values.pay.couponNum !== undefined && values.pay.couponNum.replace(/^[0-9]/, '').length < 1) {
        errors.pay.couponNum = '정확하게 입력해주세요';
      }

      if (values.pay.couponNum !== undefined && values.pay.couponNum.replace(/^[^0-9a-zA-Z]/, '').length < 2) {
        errors.pay.couponNum = '명확하게 입력해주세요';
      }
    }
  }

  return errors;
};

export default validate;
