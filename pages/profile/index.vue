<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>
							{{ profile.bio }}
						</p>
						<nuxt-link
							v-if="user && profile.username === user.username"
							class="btn btn-sm btn-outline-secondary action-btn"
							:to="{
								name: 'settings',
							}"
						>
							<i class="ion-plus-round"></i>
							&nbsp;
							Edit Profile Settings
						</nuxt-link>
						<button v-else class="btn btn-sm btn-outline-secondary action-btn" @click="onFollow">
							<i class="ion-plus-round"></i>
							&nbsp;
							<template v-if="profile.following">
								Unfollow
							</template>
							<template v-else>
								Follow
							</template>
							{{ profile.username }}
						</button>
					</div>

				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{ active: tab === 'my_articles' }"
									exact
									:to="{
										name: 'profile',
										params: {
											username
										},
										query: {
											tab: 'my_articles'
										}
									}"
								>
									My Articles
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{ active: tab === 'favorited_articles' }"
									exact
									:to="{
										name: 'profile',
										params: {
											username
										},
										query: {
											tab: 'favorited_articles'
										}
									}"
								>
									Favorited Articles
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
										name: 'profile',
										params: {
											username
										},
										query: {
											page: item,
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
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile, follow, unfollow } from '@/api/profiles'
import { getArticles } from '@/api/article'
import ArticlePreview from '@/components/article-preview'

export default {
	name: "ProfileIndex",
	middleware: 'authenticated',
	watchQuery: ['page', 'tab'],
	components: {
		ArticlePreview
	},
	computed: {
		...mapState(['user']),
		totalPage () {
			return Math.ceil(this.articlesCount / this.limit)
		}
	},
	async asyncData ({ params, query }) {
		const tab = query.tab || 'my_articles'
		const { username } = params
		const limit = 5
		const page = Number.parseInt(query.page || 1)
		const getArticlesData = {
			limit,
			offset: (page - 1) * limit
		}
		if (tab === 'my_articles') {
			getArticlesData.author = username
		} else if (tab === 'favorited_articles') {
			getArticlesData.favorited = username
		}
		const [profileData, articlesData] = await Promise.all([
			getProfile(username),
			getArticles(getArticlesData)
		])
		const { profile } = profileData.data
		console.log(articlesData.data)
		const { articles, articlesCount } = articlesData.data
		articles.forEach(article => article.favoritedDisabled = false)
		return {
			profile,
			username,
			tab,
			articles,
			articlesCount,
			limit,
			page
		}
	},
	methods: {
		async onFollow () {
			if (!this.user) {
				this.$router.push('/login')
				return false
			}
			if (this.profile.following) {
				await unfollow(this.profile.username)
				this.profile.following = false
			} else {
				await follow(this.profile.username)
				this.profile.following = true
			}
		}
	}
};
</script>

<style scoped>

</style>
