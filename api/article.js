import { request } from "@/plugins/request"

export const getArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params
  })
}

export const getFeedArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST'
  })
}

export const deleteFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE'
  })
}

export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET'
  })
}

export const getComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET'
  })
}

export const addComment = (slug, data) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'POST',
    data
  })
}

export const deleteComment = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'DELETE'
  })
}

export const create = (data) => {
  return request({
    url: '/api/articles',
    method: 'POST',
    data
  })
}

export const del = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'DELETE'
  })
}