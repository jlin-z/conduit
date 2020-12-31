import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default function ({ store }) {
  request.interceptors.request.use(function (config) {
    // 设置请求 token
    const { user } = store.state
    user && user.token && (config.headers.Authorization = `Token ${user.token}`)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}
