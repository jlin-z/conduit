<template>
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
        class="author"
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
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      :disabled="followDisabled"
      @click="onFollow"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      <template v-if="article.author.following">
        Unfollow
      </template>
      <template v-else>
        Follow
      </template>
      {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
      :disabled="favoritedDisabled"
      @click="onFavorited"
    >
      <i class="ion-heart"></i>
      &nbsp;
      <template v-if="article.favorited">
        Unfavorite Article
      </template>
      <template v-else>
        Favorite Article
      </template>
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article'
import { follow, unfollow } from '@/api/profiles'
import { mapState } from 'vuex'
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      favoritedDisabled: false,
      followDisabled: false
    }
  },
  methods: {
    async onFavorited () {
      if (!this.user) {
        this.$router.push('/login')
        return false
      }
      this.favoritedDisabled = true
      if (this.article.favorited) {
        await deleteFavorite(this.article.slug)
        this.article.favoritesCount += -1
        this.article.favorited = false
      } else {
        await addFavorite(this.article.slug)
        this.article.favoritesCount += 1
        this.article.favorited = true
      }
      this.favoritedDisabled = false
    },
    async onFollow () {
      if (!this.user) {
        this.$router.push('/login')
        return false
      }
      this.followDisabled = true
      if (this.article.author.following) {
        await unfollow(this.article.author.username)
        this.article.author.following = false
      } else {
        await follow(this.article.author.username)
        this.article.author.following = true
      }
      this.followDisabled = false
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>

</style>