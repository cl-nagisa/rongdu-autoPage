import qs from 'qs';
import axios from 'axios';

const pubilcQuery = {
  userId: ''
};

export function get(url, params = {}) {
  setData();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: Object.assign(params, pubilcQuery)
    })
    .then(response => {
      if (response) {
        resolve(response.data);
      } else {
        return Promise.reject(new Error('接口数据请求或返回异常'));
      }
    })
    .catch(err => {
      reject(err);
    });
  });
}

export function post(url, data = {}) {
  setData();
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(Object.assign(data, pubilcQuery)))
      .then(response => {
        if (response) {
          resolve(response.data);
        } else {
          return Promise.reject(new Error('接口数据请求或返回异常'));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 注入公共参数
function setData() {
  const user = window.localStorage.user ? JSON.parse(window.localStorage.user) : '';
  pubilcQuery.userId = user.id;
}
