import React from 'react';

const RightSidebar = (props) => {
  const {
    isDisabled,
    isDefaultRendered,
    isTargetRendered,
    isQuestRendered,
    isPayRendered,
    isAllRendered,
    isDefaultPassed,
    isTargetPassed,
    isQuestPassed,
    isPayPassed,
    isAllPassed,
    fieldsMeta,
    fieldsValues,
    submitFailed,
  } = props;

  // value check
  const hasFieldValues = fieldsValues !== undefined;

  // default value
  const defaultValues = fieldsValues !== undefined ? fieldsValues.default : undefined;
  const hasMedia1Value = hasFieldValues ? defaultValues.media1 !== undefined && defaultValues.media1 !== '' : undefined;
  const hasMedia2Value = hasFieldValues ? defaultValues.media2 !== undefined && defaultValues.media2 !== '' : undefined;
  const hasServiceInfoValue = hasFieldValues ? defaultValues.serviceInfo !== undefined && defaultValues.serviceInfo !== '' : undefined;
  const hasServiceCategoryValue = hasFieldValues ? defaultValues.serviceCategory !== undefined && defaultValues.serviceCategory !== '' : undefined;
  const hasServiceFormatValue = hasFieldValues ? defaultValues.serviceFormat !== undefined && defaultValues.serviceFormat !== '' : undefined;
  const hasServiceStatusValue = hasFieldValues ? defaultValues.serviceStatus !== undefined && defaultValues.serviceStatus !== '' : undefined;
  const hasClientNameValue = defaultValues !== undefined
    ? defaultValues.clientName !== undefined && defaultValues.clientName !== '' : undefined;
  const hasClientContactValue = defaultValues !== undefined
    ? defaultValues.clientContact !== undefined && defaultValues.clientContact !== '' : undefined;
  const hasEmailValue = hasFieldValues ? defaultValues.email !== undefined && defaultValues.email !== '' : undefined;
  const hasDefaultRequiredValues = hasMedia1Value
    && hasMedia2Value
    && hasServiceInfoValue
    && hasServiceCategoryValue
    && hasServiceFormatValue
    && hasServiceStatusValue
    && hasClientNameValue
    && hasClientContactValue
    && hasEmailValue;
  // target value
  const targetValues = fieldsValues !== undefined ? fieldsValues.target : undefined;
  const hasMinAgeValue = hasFieldValues
    ? targetValues.minAge !== undefined && targetValues.minAge !== null && targetValues.minAge !== '' : undefined;
  const hasMaxAgeValue = hasFieldValues
    ? targetValues.maxAge !== undefined && targetValues.maxAge !== null && targetValues.maxAge !== '' : undefined;
  const hasGenderValue = hasFieldValues
    ? targetValues.gender !== undefined && targetValues.gender !== '' && targetValues.gender !== '' : undefined;
  const hasTargetRequiredValues = hasMinAgeValue && hasMaxAgeValue && hasGenderValue;
  // quest value
  const questValues = fieldsValues !== undefined ? fieldsValues.quest : undefined;
  const hasRegisterRequireValue = hasFieldValues
    ? questValues.registerRequire !== undefined && questValues.registerRequire !== null && questValues.registerRequire !== '' : undefined;
  const hasIssue1Values = hasFieldValues
    ? Object.keys(questValues.issue).length > 0
      && questValues.issue[Object.keys(questValues.issue)[0]] !== undefined
    : undefined;
  // const hasIssue2Values = hasFieldValues
  //   ? Object.keys(questValues.issue).length > 0
  //     && questValues.issue[Object.keys(questValues.issue)[1]] !== undefined
  //   : undefined;
  // const hasIssue3Values = hasFieldValues
  //   ? Object.keys(questValues.issue).length > 0
  //     && questValues.issue[Object.keys(questValues.issue)[2]] !== undefined
  //   : undefined;
  const hasIssueDetail1Values = hasFieldValues
    ? Object.keys(questValues.issueDetail).length > 0
      && questValues.issueDetail[Object.keys(questValues.issueDetail)[0]] !== undefined
    : undefined;
  // const hasIssueDetail2Values = hasFieldValues
  //   ? Object.keys(questValues.issueDetail).length > 0
  //     && questValues.issueDetail[Object.keys(questValues.issueDetail)[1]] !== undefined
  //   : undefined;
  // const hasIssueDetail3Values = hasFieldValues
  //   ? Object.keys(questValues.issueDetail).length > 0
  //     && questValues.issueDetail[Object.keys(questValues.issueDetail)[2]] !== undefined
  //   : undefined;
  const hasIssuePurpose1Values = hasFieldValues
    ? Object.keys(questValues.issuePurpose).length > 0
      && questValues.issuePurpose[Object.keys(questValues.issuePurpose)[0]] !== undefined
    : undefined;
  // const hasIssuePurpose2Values = hasFieldValues
  //   ? Object.keys(questValues.issuePurpose).length > 0
  //     && questValues.issuePurpose[Object.keys(questValues.issuePurpose)[1]] !== undefined
  //   : undefined;
  // const hasIssuePurpose3Values = hasFieldValues
  //   ? Object.keys(questValues.issuePurpose).length > 0
  //     && questValues.issuePurpose[Object.keys(questValues.issuePurpose)[2]] !== undefined
  //   : undefined;
  const hasQuestRequiredValues = hasRegisterRequireValue
    && hasIssue1Values
    && hasIssueDetail1Values
    && hasIssuePurpose1Values;
  // pay value
  const payValues = fieldsValues !== undefined ? fieldsValues.pay : undefined;
  const hasPlanValue = hasFieldValues && payValues !== undefined ? payValues.plan !== undefined && payValues.plan !== null && payValues.plan !== '' : undefined;

  // meta check
  const hasFieldMeta = fieldsMeta !== undefined;

  // default meta
  const defaultMeta = hasFieldMeta ? fieldsMeta.default : undefined;
  const hasDefaultFieldMeta = hasFieldMeta && (defaultMeta !== undefined);
  const isMedia1Active = hasDefaultFieldMeta && defaultMeta.media1 !== undefined
    ? defaultMeta.media1.active : undefined;
  const isMedia2Active = hasDefaultFieldMeta && defaultMeta.media2 !== undefined
    ? defaultMeta.media2.active : undefined;
  const isServiceInfoActive = hasDefaultFieldMeta && defaultMeta.serviceInfo !== undefined
    ? defaultMeta.serviceInfo.active : undefined;
  const isServiceCategoryActive = hasDefaultFieldMeta && defaultMeta.serviceCategory !== undefined
    ? defaultMeta.serviceCategory.active : undefined;
  const isServiceFormatActive = hasDefaultFieldMeta && defaultMeta.serviceFormat !== undefined
    ? defaultMeta.serviceFormat.active : undefined;
  const isServiceDescActive = hasDefaultFieldMeta && defaultMeta.serviceDesc !== undefined
    ? defaultMeta.serviceDesc.active : undefined;
  const isServiceStatusActive = hasDefaultFieldMeta && defaultMeta.serviceStatus !== undefined
    ? defaultMeta.serviceStatus.active : undefined;
  const isClientNameActive = hasDefaultFieldMeta && defaultMeta.clientName !== undefined
    ? defaultMeta.clientName.active : undefined;
  const isClientContactActive = hasDefaultFieldMeta && defaultMeta.clientContact !== undefined
    ? defaultMeta.clientContact.active : undefined;
  const isEmailActive = hasDefaultFieldMeta && defaultMeta.email !== undefined
    ? defaultMeta.email.active : undefined;
  const isFunnelActive = hasDefaultFieldMeta && defaultMeta.funnel !== undefined
    ? defaultMeta.funnel.active : undefined;
  // target meta
  const targetMeta = hasFieldMeta ? fieldsMeta.target : undefined;
  const hasTargetFieldMeta = hasFieldMeta && (targetMeta !== undefined);
  const isMinAgeActive = hasTargetFieldMeta && targetMeta.minAge !== undefined
    ? targetMeta.minAge.active : undefined;
  const isMaxAgeActive = hasTargetFieldMeta && targetMeta.maxAge !== undefined
    ? targetMeta.maxAge.active : undefined;
  const isGenderActive = hasTargetFieldMeta && targetMeta.gender !== undefined
    ? targetMeta.gender.active : undefined;
  const isExtraInfoCategoryActive = hasTargetFieldMeta
    && targetMeta.extraInfoCategory !== undefined ? targetMeta.extraInfoCategory.active : undefined;
  const isExtraInfoDescActive = hasTargetFieldMeta && targetMeta.extraInfoDesc !== undefined
    ? targetMeta.extraInfoDesc.active : undefined;
  const isInterestActive = hasTargetFieldMeta && targetMeta.interest !== undefined
    ? targetMeta.interest.active : undefined;
  // quest meta
  const questMeta = hasFieldMeta ? fieldsMeta.quest : undefined;
  const hasQuestFieldMeta = hasFieldMeta && (questMeta !== undefined);
  const isRegisterRequiredActive = hasQuestFieldMeta && questMeta.registerRequire !== undefined
    ? questMeta.registerRequire.active : undefined;
  const isIssue1Active = hasQuestFieldMeta
    && questMeta.issue !== undefined
    && Object.keys(questMeta.issue).length > 0
    && questMeta.issue[Object.keys(questValues.issue)[2]] !== undefined
    ? questMeta.issue[Object.keys(questValues.issue)[2]].active
    : undefined;
  const isIssue2Active = hasQuestFieldMeta
    && questMeta.issue !== undefined
    && Object.keys(questMeta.issue).length > 0
    && questMeta.issue[Object.keys(questValues.issue)[1]] !== undefined
    ? questMeta.issue[Object.keys(questValues.issue)[1]].active
    : undefined;
  const isIssue3Active = hasQuestFieldMeta
    && questMeta.issue !== undefined
    && Object.keys(questMeta.issue).length > 0
    && questMeta.issue[Object.keys(questValues.issue)[0]] !== undefined
    ? questMeta.issue[Object.keys(questValues.issue)[0]].active
    : undefined;
  const isIssueDetail1Active = hasQuestFieldMeta
    && questMeta.issueDetail !== undefined
    && questMeta.issueDetail[Object.keys(questValues.issueDetail)[2]] !== undefined
    ? questMeta.issueDetail[Object.keys(questValues.issueDetail)[2]].active
    : undefined;
  const isIssueDetail2Active = hasQuestFieldMeta
    && questMeta.issueDetail !== undefined
    && questMeta.issueDetail[Object.keys(questValues.issueDetail)[1]] !== undefined
    ? questMeta.issueDetail[Object.keys(questValues.issueDetail)[1]].active
    : undefined;
  const isIssueDetail3Active = hasQuestFieldMeta
    && questMeta.issueDetail !== undefined
    && questMeta.issueDetail[Object.keys(questValues.issueDetail)[0]] !== undefined
    ? questMeta.issueDetail[Object.keys(questValues.issueDetail)[0]].active
    : undefined;
  const isIssuePurpose1Active = hasQuestFieldMeta
    && questMeta.issuePurpose !== undefined
    && questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[2]] !== undefined
    ? questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[2]].active
    : undefined;
  const isIssuePurpose2Active = hasQuestFieldMeta
    && questMeta.issuePurpose !== undefined
    && questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[1]] !== undefined
    ? questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[1]].active
    : undefined;
  const isIssuePurpose3Active = hasQuestFieldMeta
    && questMeta.issuePurpose !== undefined
    && questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[0]] !== undefined
    ? questMeta.issuePurpose[Object.keys(questValues.issuePurpose)[0]].active
    : undefined;
  // pay meta
  const payMeta = hasFieldMeta ? fieldsMeta.pay : undefined;
  const hasPayFieldMeta = hasFieldMeta && (payMeta !== undefined);
  const isPlanActive = hasPayFieldMeta && payMeta.plan !== undefined
    ? payMeta.plan.active : undefined;

  const setDefaultTitle = () => {
    switch (isDefaultRendered) {
      case isMedia1Active:
      case isMedia2Active:
        return '테스트할 서비스는\n어디서\n테스트하면 될까요?';
      case isServiceInfoActive:
        return '테스트할 서비스로\n접근할 경로를\n알려주세요.';
      case isServiceCategoryActive:
        return '이 서비스의\n주요 관심사는\n무엇인가요?';
      case isServiceFormatActive:
        return '이 서비스는\n어떤 방식으로\n운영되나요?';
      case isServiceDescActive:
        return '테스터들에게\n이 서비스를\n어떻게 소개할까요?';
      case isClientNameActive:
      case isClientContactActive:
      case isEmailActive:
        return '테스트를\n담당하시는 분은\n누구신가요?';
      case isFunnelActive:
        return '테스트 신청 경로를\n알려주세요';
      case isServiceStatusActive:
        return '지금\n테스트할 서비스는\n어떤 단계인가요?';
      case isAllPassed:
        return '클릭해도\n수정할 수 없다구..\n후훟..';
      case hasDefaultRequiredValues:
        return '모든 정보를\n다 입력하셨나요?';
      case submitFailed:
        return '입력되지 않은\n정보가 있어요!';
      default:
        return '안녕하세요 :)\n중간 중간 이 곳을\n잘 확인해주세요';
    }
  };

  const setDefaultDesc = () => {
    switch (isDefaultRendered) {
      case isMedia1Active:
      case isMedia2Active:
        return '웹사이트에서\n테스트 할까요?\n아니면 어플리케이션?\n휴대폰으로 테스트해야할지,\n컴퓨터로 테스트해야할지\n알려주세요.';
      case isServiceInfoActive:
        return '어플리케이션일 경우,\n검색이 되는\n이름만 알려주셔도 좋아요';
      case isServiceCategoryActive:
        return '음식, 운동, 패션 등,\n이 서비스에서\n주로 보여지는 콘텐츠는\n어떤 분야인지 알려주세요';
      case isServiceFormatActive:
        return '앞서 선택하신\n"서비스 분야"가\n사용자에게 어떤 방식으로\n전달되는지 알려주세요.\n가장 핵심적인 기능\n(이번에 테스트하실 기능)을\n중심으로\n선택하시면 좋아요!';
      case isServiceDescActive:
        return '테스터들이 서비스에\n흥미를 느낄수록,\n더 자세한 결과가\n나온답니다.\n최대한 상세하게\n설명해주세요 :)';
      case isClientNameActive:
      case isClientContactActive:
      case isEmailActive:
        return '테스트 진행상황,\n상태변경 등을\n알려드립니다.\n테스트를 담당하실 분의\n정보를 입력해주세요';
      case isFunnelActive:
        return '이번 테스트를 신청하시게 된 계기를 선택해주세요.';
      case isServiceStatusActive:
        return '현재 시점의 서비스 상태를 선택해주세요';
      case isAllPassed:
        return '이미 테스트가\n등록되었기 때문에\n수정할 수 없습니다.\n문의사항이 있다면\n매니저에게 알려주세요!';
      case hasDefaultRequiredValues:
        return '누락 된 정보는 없는지\n꼼꼼하게 확인한 후\n다음 스텝으로\n이동해주세요 :)';
      case submitFailed:
        return '필수 정보를\n모두 입력해주셔야\n다음 단계로 넘어가실 수\n있어요.\n누락된 정보를 모두\n입력해주세요!';
      default:
        return '어떻게 입력해야할 지\n잘 모르시더라도\n걱정마세요!\n상세히 알려드릴게요.\n그럼 시작해볼까요?';
    }
  };

  const setTargetTitle = () => {
    switch (isTargetRendered) {
      case isMinAgeActive:
      case isMaxAgeActive:
      case isGenderActive:
        return '좁게 설정하실수록\n유의미한 결과를\n얻을 수 있습니다.';
      case isExtraInfoCategoryActive:
      case isExtraInfoDescActive:
        return '추가 정보란,';
      case isInterestActive:
        return '어떤 관심사를\n가진 사람에게\n테스트할까요?';
      case isAllPassed:
        return '클릭해도\n수정할 수 없다구..\n후훟..';
      case hasTargetRequiredValues:
        return '모든 정보를\n다 입력하셨나요?';
      case submitFailed:
        return '입력되지 않은\n정보가 있어요!';
      default:
        return '누구에게\n테스트할까요?';
    }
  };

  const setTargetDesc = () => {
    switch (isTargetRendered) {
      case isMinAgeActive:
      case isMaxAgeActive:
      case isGenderActive:
        return '테스트 인원은 15명입니다.\n타겟의 나이 범위가\n20 이상이\n되지 않도록 해주세요';
      case isExtraInfoCategoryActive:
      case isExtraInfoDescActive:
        return '타겟의 조건을\n더 상세하게 설정하고\n싶을 때 선택해주세요.\n단, 타겟 한명 당\n추가금이 발생합니다.\n* 3,000원일 경우, 총 45,000원 추가\n(3,000 x 15 = 45,000)';
      case isInterestActive:
        return '기본적으로 제공되는\n테스터 분류 기준입니다.\n서비스의 주요 콘텐츠,\n핵심 고객이 관심있어하는\n분야에 대해 알려주세요';
      case isAllPassed:
        return '이미 테스트가\n등록되었기 때문에\n수정할 수 없습니다.\n문의사항이 있다면\n매니저에게 알려주세요!';
      case hasTargetRequiredValues:
        return '누락 된 정보는 없는지\n꼼꼼하게 확인한 후\n다음 스텝으로\n이동해주세요 :)';
      case submitFailed:
        return '필수 정보를\n모두 입력해주셔야\n다음 단계로 넘어가실 수\n있어요.\n누락된 정보를 모두\n입력해주세요!';
      default:
        return '테스트 대상을\n정하실 수 있습니다.\n안내에 따라\n빈 칸을 채워주세요';
    }
  };

  const setQuestTitle = () => {
    switch (isQuestRendered) {
      case isRegisterRequiredActive:
        return '서비스를 경험하는데\n회원가입이\n필수적인가요?';
      case isIssue1Active:
      case isIssue2Active:
      case isIssue3Active:
      case isIssueDetail1Active:
      case isIssueDetail2Active:
      case isIssueDetail3Active:
        return '무엇을\n테스트하고 싶나요?';
      case isIssuePurpose1Active:
        return '도전과제 1 에 대해서\n자세히 알려주세요';
      case isIssuePurpose2Active:
        return '도전과제 2 에 대해서\n자세히 알려주세요';
      case isIssuePurpose3Active:
        return '도전과제 3 에 대해서\n자세히 알려주세요';
      case isAllPassed:
        return '클릭해도\n수정할 수 없다구..\n후훟..';
      case hasQuestRequiredValues:
        return '모든 정보를\n다 입력하셨나요?';
      case submitFailed:
        return '입력되지 않은\n정보가 있어요!';
      default:
        return '무엇을\n테스트할까요?';
    }
  };

  const setQuestDesc = () => {
    switch (isQuestRendered) {
      case isRegisterRequiredActive:
        return '보통의 경우,\n리얼답에서\n테스트 계정을 만들어서\n진행합니다.\nSNS 회원가입만\n가능한 서비스이거나,\n테스트 개별 회원가입이\n필수적이라면\n"네"를 선택해주세요.\n테스터 1명당\n3,000원의 보상이\n추가됩니다.';
      case isIssue1Active:
      case isIssue2Active:
      case isIssue3Active:
      case isIssueDetail1Active:
      case isIssueDetail2Active:
      case isIssueDetail3Active:
        return '서비스의\n가장 핵심적인 기능을\n선택해주세요.\n테스터가\n도전과제를 수행하며\n서비스를 경험한 후,\n설문조사에 답변합니다';
      case isIssuePurpose1Active:
      case isIssuePurpose2Active:
      case isIssuePurpose3Active:
        return '이 서비스에서 도전과제를 수행한 테스터에게 무엇이 궁금한가요?';
      case isAllPassed:
        return '이미 테스트가\n등록되었기 때문에\n수정할 수 없습니다.\n문의사항이 있다면\n매니저에게 알려주세요!';
      case hasQuestRequiredValues:
        return '누락 된 정보는 없는지\n꼼꼼하게 확인한 후\n다음 스텝으로\n이동해주세요 :)';
      case submitFailed:
        return '필수 정보를\n모두 입력해주셔야\n다음 단계로 넘어가실 수\n있어요.\n누락된 정보를 모두\n입력해주세요!';
      default:
        return '가장 핵심적인 기능부터,\n차근차근 검증해보세요.\n빠르게 피드백을 받고,\n수정사항을 반영할 수 있습니다.';
    }
  };

  const setPayTitle = () => {
    switch (isPayRendered) {
      case isAllPassed:
        return '클릭해도\n수정할 수 없다구..\n후훟..';
      case isPlanActive:
        return '원하는 Plan을\n선택해주세요.\n시리얼넘버가 있다면,\n입력해주세요';
      case submitFailed:
        return '입력되지 않은\n정보가 있어요!';
      default:
        return '입금은';
    }
  };

  const setPayDesc = () => {
    switch (isPayRendered) {
      case isAllPassed:
        return '이미 테스트가\n등록되었기 때문에\n수정할 수 없습니다.\n문의사항이 있다면\n매니저에게 알려주세요!';
      case isPlanActive:
        return 'Plan 01 :테스트\nPlan 02 :테스트 + 컨설팅\n엑셀러레이터,\n인큐베이팅 프로그램에서\n시리얼 넘버를 받았다면,\n입력해주세요.\n테스트 비용이 면제됩니다.';
      case submitFailed:
        return '필수 정보를\n모두 입력해주셔야\n다음 단계로 넘어가실 수\n있어요.\n누락된 정보를 모두\n입력해주세요!';
      default:
        return '기업은행 010-7627-3455\n김인정 앞';
    }
  };

  const isActive = fieldsMeta !== undefined && Object.keys(fieldsMeta).length > 0;
  return (
    <aside
      className={`form-btn-wrapper${isDisabled ? '--disabled' : ''}${
        (hasDefaultRequiredValues && isDefaultRendered && !isAllPassed && !submitFailed)
        || (hasTargetRequiredValues && isTargetRendered && !isAllPassed && !submitFailed)
        || (hasQuestRequiredValues && isQuestRendered && !isAllPassed && !submitFailed)
        || (hasPlanValue && isPayRendered && !isAllPassed && !submitFailed)
          ? '--pass' : ''}${submitFailed ? '--fail' : ''}`}
    >
      {isDisabled
        ? null
        : (
          <>
            <div className="box-info">
              <p className="info__title">
                {isDefaultRendered
                  ? setDefaultTitle().toString().split('\n').map(t => (
                    <React.Fragment key={t}>
                      {t}
                      <br />
                    </React.Fragment>
                  ))
                  : null
                }
                {isTargetRendered
                  ? (
                    <>
                      { isDefaultPassed
                        ? setTargetTitle().toString().split('\n').map(t => (
                          <React.Fragment key={t}>
                            {t}
                            <br />
                          </React.Fragment>
                        ))
                        : (
                          <>
                            기본정보를 먼저
                            <br />
                            입력해주세요!
                          </>
                        ) }
                    </>
                  )
                  : null
                }
                {isQuestRendered
                  ? (
                    <>
                      {isDefaultPassed
                        ? (
                          <>
                            { isTargetPassed
                              ? setQuestTitle().toString().split('\n').map(t => (
                                <React.Fragment key={t}>
                                  {t}
                                  <br />
                                </React.Fragment>
                              ))
                              : (
                                <>
                                  타겟을 먼저
                                  <br />
                                  입력해주세요!
                                </>
                              ) }
                          </>
                        )
                        : (
                          <>
                            기본정보를 먼저
                            <br />
                            입력해주세요!
                          </>
                        )}
                    </>
                  )
                  : null
                }
                {isPayRendered
                  ? (
                    <>
                      {isDefaultPassed
                        ? (
                          <>
                            { isTargetPassed
                              ? (
                                <>
                                  { isQuestPassed
                                    ? setPayTitle().toString().split('\n').map(t => (
                                      <React.Fragment key={t}>
                                        {t}
                                        <br />
                                      </React.Fragment>
                                    ))
                                    : (
                                      <>
                                        나그네여..
                                        <br />
                                        아직 결제의 단계가 아니라네
                                      </>
                                    )
                                  }
                                </>
                              )
                              : (
                                <>
                                  타겟을 먼저
                                  <br />
                                  입력해주세요!
                                </>
                              ) }
                          </>
                        )
                        : (
                          <>
                            기본정보를 먼저
                            <br />
                            입력해주세요!
                          </>
                        )}
                    </>
                  )
                  : null
                }
              </p>
              <p className={`info__desc${isActive ? '--active' : ''}`}>
                {isDefaultRendered
                  ? setDefaultDesc().toString().split('\n').map(t => (
                    <React.Fragment key={t}>
                      {t}
                      <br />
                    </React.Fragment>
                  ))
                  : null
                }
                {isTargetRendered
                  ? (
                    <>
                      { isDefaultPassed
                        ? setTargetDesc().toString().split('\n').map(t => (
                          <React.Fragment key={t}>
                            {t}
                            <br />
                          </React.Fragment>
                        ))
                        : (
                          <>
                            &apos;기본 정보&apos; 탭의
                            <br />
                            모든 정보를 입력해주셔야
                            <br />
                            타겟을 입력할 수 있습니다.
                          </>
                        ) }
                    </>
                  )
                  : null
                }
                {isQuestRendered
                  ? (
                    <>
                      {isDefaultPassed
                        ? (
                          <>
                            { isTargetPassed
                              ? setQuestDesc().toString().split('\n').map(t => (
                                <React.Fragment key={t}>
                                  {t}
                                  <br />
                                </React.Fragment>
                              ))
                              : (
                                <>
                                  &apos;타겟설정&apos; 탭의
                                  <br />
                                  모든 정보를 입력해주셔야
                                  <br />
                                  타겟을 입력할 수 있습니다.
                                </>
                              ) }
                          </>
                        )
                        : (
                          <>
                            &apos;기본 정보&apos; 탭의
                            <br />
                            모든 정보를 입력해주셔야
                            <br />
                            타겟을 입력할 수 있습니다.
                          </>
                        )}
                    </>
                  )
                  : null
                }
                {isPayRendered
                  ? (
                    <>
                      {isDefaultPassed
                        ? (
                          <>
                            { isTargetPassed
                              ? (
                                <>
                                  { isQuestPassed
                                    ? setPayDesc().toString().split('\n').map(t => (
                                      <React.Fragment key={t}>
                                        {t}
                                        <br />
                                      </React.Fragment>
                                    ))
                                    : (
                                      <>
                                        기본정보, 타겟, 도전과제를
                                        <br />
                                        모두 입력하신 후
                                        <br />
                                        테스트를 제출해주세요.
                                        <br />
                                        매니저가 검토 후,
                                        <br />
                                        신청내역이 확정되면
                                        <br />
                                        결제하실 수 있습니다.
                                        <br />
                                        (나그닥 나그닥)
                                      </>
                                    )
                                  }
                                </>
                              )
                              : (
                                <>
                                  &apos;타겟설정&apos; 탭의
                                  <br />
                                  모든 정보를 입력해주셔야
                                  <br />
                                  타겟을 입력할 수 있습니다.
                                </>
                              ) }
                          </>
                        )
                        : (
                          <>
                            &apos;기본 정보&apos; 탭의
                            <br />
                            모든 정보를 입력해주셔야
                            <br />
                            타겟을 입력할 수 있습니다.
                          </>
                        )}
                    </>
                  )
                  : null
                }
              </p>
            </div>
            <div className="box-btn">
              {isAllPassed
                ? null
                : (
                  <button type="submit" className={`btn__default${isPayRendered && isQuestPassed ? '--submit' : ''}`}>Next</button>
                )
              }
            </div>
          </>
        )
      }
    </aside>
  );
};

export default RightSidebar;
