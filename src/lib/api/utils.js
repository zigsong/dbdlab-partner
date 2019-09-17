import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'token fca5844c89d42b59f4874cbd8c9fe735a3eeacb6',
  },
});

export const signUp = (body) => {
  instance.post({
    url: '/accounts/',
    data: body,
  })
    .then((res) => {
      console.log(res);
    });
};

export const login = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    instance.post({ url: '/accounts/auth/', data })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAccount = (data) => {
  console.log(data.id);
  return new Promise((resolve, reject) => {
    instance.get(`/accounts/${data.id}/`)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        reject(err);
      });
  });
};

export const getProjectList = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    instance.get('/projects/', {
      data,
    })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        reject(err);
      });
  });
};
