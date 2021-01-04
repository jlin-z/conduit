<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<ul class="error-messages">
						<template v-for="(messages, field) in errors">
							<li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset :disabled="formDisabled">
							<fieldset class="form-group">
								<input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
							</fieldset>
							<fieldset class="form-group">
								<input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
							</fieldset>
							<fieldset class="form-group">
								<textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
							</fieldset>
							<button class="btn btn-lg pull-xs-right btn-primary" type="submit">
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { create, getArticle } from "@/api/article"

export default {
	name: "EditorIndex",
	async asyncData ({ params }) {
		const { slug } = params
		const article = {}
		if (slug) {
			const { data } = await getArticle(slug)
			article.title = data.article.title
			article.description = data.article.description
			article.body = data.article.body
			article.tagList = data.article.tagList
		}
		return {
			article,
			errors: [],
			formDisabled: false
		}
	},
	methods: {
		async onSubmit () {
			this.formDisabled = true
			try {
				const { data } = await create({article: this.article})
				const { article } = data
				this.$router.push({
					name: 'article',
					params: {
						slug: article.slug
					}
				})
			} catch (err) {
				console.log(err.response.data)
				this.errors = err.response.data.errors
				this.formDisabled = false
			}
		}
	}
};
</script>

<style scoped>

</style>
