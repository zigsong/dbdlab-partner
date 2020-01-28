import axios from 'axios';
import config from 'modules/config';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') >= 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = config.REACT_APP_API_URL;
// const baseURL = '';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getQuestList = tId => axios.get(`${baseURL}/quests/?test__id=${tId}/`, headers);
export const getQuest = qId => axios.get(`${baseURL}/quests/${qId}/`, headers);
export const patchQuest = (qId, tId, issue, issueDetail, issuePurpose) => axios.patch(`${baseURL}/quests/${qId}/`, {
  issue,
  issue_detail: issueDetail,
  issue_purpose: issuePurpose,
  test_id: tId,
}, headers);
