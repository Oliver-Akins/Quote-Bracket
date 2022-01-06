<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="login-view">
		<div class="card">
			<h1>Quote Bracket</h1>
			<button
				@click.stop="handleDiscordLogin"
				class="discord-login"
			>
				Login With Discord
			</button>
			<!--
			Hidden because for some reason Vue isn't actually being able to
			detect the guild ID in any case except for on the dev server and I
			have no idea why. So I'm just removing it for now.
			<br>
			<button
				@click.stop="handleGuildID"
				class="server-id-login"
			>
				Enter a Server ID
			</button>
			-->
		</div>
	</div>
</template>

<script>
export default {
	computed: {},
	methods: {
		handleDiscordLogin() {
			let qs = new URLSearchParams();
			qs.set(`response_type`, `token`);
			qs.set(`client_id`, this.discord.client.id);
			qs.set(`scope`, this.discord.auth.scopes.join(` `));

			// Construct the redirect URI for Discord
			qs.set(
				`redirect_uri`,
				window.location.origin + window.location.pathname
			);

			// Add state for verifying the response redirect from Discord
			if (this.discord.auth.useState) {
				let state = Math.random().toString(36).substring(2, 15)
					+ Math.random().toString(36).substring(2, 15);
				sessionStorage.setItem(`qb-auth-state`, state);
				qs.set(`state`, state);
			};

			window.location.href = `${this.discord.auth.base}?${qs.toString()}`;
		},
		handleGuildID() {
			this.$emit(`change-state`, `id-entry`)
		},
	},
};
</script>

<style scoped>
#login-view {
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	width: 100vw;
}

.card {
	background: var(--secondary-background);
	border-radius: 7px;
	padding: 15px;
	text-align: center;
}

@media only screen and (max-width: 768px) {
	.card {
		width: 90%;
	}
}
</style>