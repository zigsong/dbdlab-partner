const configMap = {
  REAL: {
    REACT_APP_PARTNER_URL: 'partner.realdopt.com',
    REACT_APP_COMPANY_URL: 'realdopt.com',
    REACT_APP_API_URL: 'https://op-server.realdopt.com/api',
    REACT_APP_KAKAO_INIT: '93604043ee75af74fae0259100aa917b',
    REACT_APP_GA_ID: 'UA-150920783-1',
  },
  QA: {
    REACT_APP_PARTNER_URL: 'qa-partner.realdopt.com',
    REACT_APP_COMPANY_URL: 'qa.realdopt.com',
    REACT_APP_API_URL: 'https://qa-server.realdopt.com/api',
    REACT_APP_KAKAO_INIT: '93604043ee75af74fae0259100aa917b',
    REACT_APP_GA_ID: 'UA-150920783-1',
  },
  LOCAL: {
    REACT_APP_PARTNER_URL: 'localhost:4000',
    REACT_APP_COMPANY_URL: 'localhost:3000',
    REACT_APP_API_URL: 'https://qa-server.realdopt.com/api',
    REACT_APP_KAKAO_INIT: '93604043ee75af74fae0259100aa917b',
    REACT_APP_GA_ID: 'UA-150920783-1',
  }
};

const config = configMap[process.env.REACT_APP_DEPLOY_ENV] || configMap.QA;
export default config;
