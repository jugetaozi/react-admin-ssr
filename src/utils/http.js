import axios from 'axios'

axios.defaults.baseURL = '/amd';

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}