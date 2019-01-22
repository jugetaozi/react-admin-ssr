import axios from 'axios'

axios.defaults.baseURL = '/xcentz';

export function get (url, options) {
  return new Promise((resolve, reject) => {
    axios.get(url, options).then(res => {
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
