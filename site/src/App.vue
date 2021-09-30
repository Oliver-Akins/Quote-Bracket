<script setup>
import LoginView from "./views/Login.vue";
import GuildSelect from "./views/GuildSelect.vue";
import InputID from "./views/InputID.vue";
import History from "./views/History.vue";
</script>

<template>
	<LoginView
		class="inner-view"
		v-if="state === `login`"
		@change-state="state = $event"
	/>
	<GuildSelect
		class="inner-view"
		v-else-if="state === `guild-select`"
		@set-guild="setGuild($event)"
		@change-state="state = $event"
	/>
	<InputID
		class="inner-view"
		v-else-if="state === `id-entry`"
		@set-guild="setGuild($event)"
		@change-state="state = $event"
	/>
	<History
		class="inner-view"
		v-else-if="state === `view-history`"
		:gid="gid"
		@set-guild="setGuild($event)"
		@change-state="state = $event"
	/>
</template>

<script>
export default {
	data() {return {
		state: `login`,
		gid: null,
	}},
	methods: {
		setGuild(guild) {
			this.gid = guild;

			// Don't set null as a parameter
			if (guild) {
				let url = new URL(window.location.href);
				let qs = url.searchParams;

				qs.set(`gid`, guild);

				window.history.replaceState(null, null, url);
			}
		},
	},
	mounted() {

		let qs = new URLSearchParams(window.location.search);

		if (qs.has(`gid`)) {
			this.gid = qs.get(`gid`);
			this.state = `view-history`;
			return;
		};

		let hash = new URLSearchParams(window.location.hash);

		if (hash.has(`access_token`)) {

			// Check if the state is enabled
			if (this.discord.auth.useState) {

				// Assert state validity
				if (sessionStorage.getItem(`qb-auth-state`) === hash.get(`state`)) {
					console.info(`State compare success`);
					sessionStorage.setItem(`qb-auth-token`, hash.get(`access_token`));
					sessionStorage.removeItem(`qb-auth-state`);
					window.location.hash = ``;
				} else {
					console.error(`State compare failed`);
					window.location.hash = ``;
				};
			} else {
				sessionStorage.setItem(`qb-auth-token`, hash.get(`access_token`));
			};
		};

		if (sessionStorage.getItem(`qb-auth-token`)) {
			this.state = `guild-select`;
		};
	},
};
</script>

<style>
@import "css/themes/dark.css";
@import "css/inputs.css";

html, body {
	margin: 0;
	padding: 0;
}

h1, h2, h3, h4, h5, h6 {
	margin-top: 5px;
	margin-bottom: 15px;
}

body {
	background: var(--primary-background);
	color: var(--light-text);
	font-family: var(--fonts);
	overflow-x: hidden;
	overflow-y: auto;
}
</style>