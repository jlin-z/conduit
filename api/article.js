import request from "@/utils/request"

export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params
  })
}
