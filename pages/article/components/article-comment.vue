<template>
  <div>
    <form v-if="user" @submit.prevent="onSubmit" class="card comment-form">
      <div class="card-block">
        <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>
    <p v-else style="display: inherit;">
      <nuxt-link to="/login">Sign in</nuxt-link>
      or
      <nuxt-link to="/register">sign up</nuxt-link>
      to add comments on this article.
    </p>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="user && user.username === comment.author.username">
<!--          <i class="ion-edit"></i>-->
          <i @click="delComment(comment)" class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { getComments, addComment, deleteComment } from "@/api/article"

export default {
  name: "ArticleComment",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      comment: {
        body: ''
      }
    }
  },
  async created () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onSubmit () {
      if (!this.user) {
        this.$router.push('/login')
        return false
      }
      if (this.comment.body) {
        const { data } = await addComment(this.article.slug, this.comment)
        this.comments.unshift(data.comment)
        this.comment.body = ''
      }
    },
    async delComment (comment) {
      const { id } = comment
      await deleteComment(this.article.slug, id)
      const index = this.comments.findIndex(comment => comment.id === id)
      if (index > -1) {
        this.comments.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>