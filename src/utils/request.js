import axios from 'axios'
import lodash from 'lodash'
import queryString from 'query-string'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    page = false, // 是否为分页查询
    responseType = false, // 响应参数例如blob
    requestType = false, // 请求参数例如form
  } = options

  const cloneData = lodash.cloneDeep(data)
  if (responseType === 'blob') {
    axios.defaults.responseType = 'blob'
  } else {
    axios.defaults.responseType = 'json'
  }

  // const cloneData = lodash.cloneDeep(data)
  switch (method.toLowerCase()) {
    case 'get':
      return axios({method:'get',params: cloneData,url})
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      if (requestType === 'form') {
        return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      return axios({method:'post',dataType: "json",data: queryString.stringify(cloneData),url})
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    // console.log(response)
    // todo 兼容mock和真实api
    const { statusText, status } = response
    let {
      page = false, // 是否为分页查询
      responseType = false,
    } = options
    // console.log(response)
    if (status === 200) { // http 200状态
      let data = response.data
      if (responseType) {
        return Promise.resolve(data)
      }
      return Promise.resolve(data)
    }
    return Promise.reject(statusText)
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
