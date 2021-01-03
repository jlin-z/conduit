import { request } from "@/plugins/request"

export const login = (data) => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

export const register = (data) => {
  return request({
    url: '/api/users',
    method: 'POST',
    data
  })
}

export const update = (data) => {
  return request({
    url: '/api/user',
    method: 'PUT',
    data
  })
}
