<template>
	<div class="home-page">

		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">

				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="user" class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'your_feed'
									}"
									:to="{
										name: 'home',
										query: {
											tab: 'your_feed'
										}
									}"
									exact
								>
									Your Feed
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'global_feed'
									}"
									:to="{
										name: 'home',
										query: {
											tab: 'global_feed'
										}
									}"
									exact
								>
									Global Feed
								</nuxt-link>
							</li>
							<li class="nav-item" v-if="tag">
								<nuxt-link
									class="nav-link active"
									:class="{
										active: tab === 'tag'
									}"
									:to="{
										name: 'home',
										query: {
											tab: 'tag'
										}
									}"
									exact
								>
									# {{ tag }}
								</nuxt-link>
							</li>
						</ul>
					</div>

					<article-preview v-for="article in articles" :key="article.slug" :article="article" />

					<nav>
						<ul class="pagination">
							<li
								class="page-item"
								:class="{
									active: item === page
								}"
								v-for="item in totalPage"
								:key="item">
								<nuxt-link
									class="page-link"
									:to="{
										name: 'home',
										query: {
											page: item,
											tag,
											tab
										}
									}"
								>
									{{ item }}
								</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link
								v-for="(tag, index) in tags"
								:key="index" href=""
								:to="{
									name: 'home',
									query: {
										tag,
										tab: 'tag'
									}
								}"
								class="tag-pill tag-default">
								{{ tag }}
							</nuxt-link>
						</div>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
import { getArticles, getFeedArticles } from "@/api/article"
import { getTags } from "@/api/tag"
import { mapState } from "vuex"
import ArticlePreview from '@/components/article-preview'

export default {
  name: "HomeIndex",
	watchQuery: ['page', 'tag', 'tab'],
	components: {
		ArticlePreview
	},
	async asyncData ({ query, store }) {
  	const page = Number.parseInt(query.page || 1)
		const tag = query.tag
  	const limit = 20
		const tab = query.tab || 'global_feed'
		const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles

		const [articlesData, tagsData] = await Promise.all([
			loadArticles({
				limit,
				offset: (page - 1) * limit,
				tag
			}),
			getTags()
		])
		const { articles, articlesCount } = articlesData.data
		articles.forEach(article => article.favoritedDisabled = false)
		const { tags } = tagsData.data
		return {
  		articles,
			articlesCount,
			limit,
			page,
			tags,
			tag,
			tab
		}
	},
	computed: {
  	...mapState(['user']),
  	totalPage () {
  		return Math.ceil(this.articlesCount / this.limit)
		}
	}
};
</script>

<style scoped>

</style>
