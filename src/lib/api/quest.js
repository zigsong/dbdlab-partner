import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getQuestList = tId => axios.get(`/quests/?test__id=${tId}/`, headers);
export const getQuest = qId => axios.get(`/quests/${qId}/`, headers);
export const patchQuest = (qId, tId, issue, issueDetail, issuePurpose) => axios.patch(`/quests/${qId}/`, {
  issue,
  issue_detail: issueDetail,
  issue_purpose: issuePurpose,
  test_id: tId,
}, headers);
