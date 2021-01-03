<template>
  <div class="article-preview clearfix">
    <div class="article-meta">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
      >
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: article.author.username
            }
          }"
        >
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{ active: article.favorited }"
        @click="onFavorite(article)"
        :disabled="article.favoritedDisabled"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link
      class="preview-link"
      :to="{
        name: 'article',
        params: {
          slug: article.slug
        }
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">{{ tag }}</li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import { addFavorite, deleteFavorite } from "@/api/article"

  export default {
    name: "ArticlePreview",
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    methods: {
      async onFavorite (article) {
        if (!this.user) {
          return false
        }
        article.favoritedDisabled = true
        if (article.favorited) {
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoritedDisabled = false
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>

</style>