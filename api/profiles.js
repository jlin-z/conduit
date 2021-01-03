import { request } from "@/plugins/request"

export const follow = (username) => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'POST',
  })
}

export const unfollow = (username) => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'DELETE',
  })
}

export const getProfile = (username) => {
  return request({
    url: `/api/profiles/${username}`,
    method: 'GET',
  })
}