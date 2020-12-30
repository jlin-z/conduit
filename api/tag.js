import request from "@/utils/request"

export const getTags = () => {
  return request({
    url: '/api/tags',
    method: 'GET'
  })
}
