<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">

				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<ul class="error-messages">
						<template v-for="(messages, field) in errors">
							<li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
							</fieldset>
							<fieldset class="form-group">
								<input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
							</fieldset>
							<fieldset class="form-group">
								<textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
							</fieldset>
							<fieldset class="form-group">
								<input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right">
								Update Settings
							</button>
						</fieldset>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import { update } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
	name: "SettingsIndex",
	middleware: 'authenticated',
	data () {
		const user = {}
		const { email, bio, image, username } = this.$store.state.user
		user.email = email
		user.bio = bio
		user.image = image
		user.username = username
		return {
			user,
			errors: []
		}
	},
	methods: {
		...mapMutations(['setUser']),
		async onSubmit () {
			try {
				if (this.user.password === '') {
					this.$delete(this.user, 'password')
				}
				const { data } = await update({ user: this.user })
				const { user } = data
				this.setUser(user)
				this.$router.push({
					name: 'profile',
					params: {
						username: user.username
					}
				})
			} catch (err) {
				this.errors = err.response.data.errors
			}
		}
	}
}
</script>

<style scoped>

</style>
