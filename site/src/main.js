import { createApp } from "vue";
import App from "./App.vue";

let app = createApp(App);

app.mixin({
	data() {return {
		discord: {
			client: {
				id: `863968565353906226`,
			},
			auth: {
				base: `https://discord.com/api/oauth2/authorize`,
				scopes: [
					`identify`,
					`guilds`,
				],
				useState: true,
			},
			api: {
				base: `https://discord.com/api/v9`,
				getGuilds: `/users/@me/guilds`,
			},
		},
		private: {
			api: `http://localhost:3001`,
		},
	}},
	methods: {},
	computed: {},
})

app.mount('#app');