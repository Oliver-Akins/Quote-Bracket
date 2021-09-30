<script setup>
import Dropdown from "../components/GuildDropdown.vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="guild-select">
		<div class="card">
			<h1>Quote Bracket</h1>
			<div v-if="loading">
				<h2>{{ message }}</h2>
				<button
					v-if="errored"
					@click.stop="$emit(`change-state`, `login`)"
				>
					Go Back
				</button>
			</div>
			<div v-else>
				<Dropdown
					:options="userGuilds"
					:default-option="null"
					@set-guild="selectGuild"
				/>
				<br>
				<button
					v-if="selectedGuild !== null"
					@click.stop="loadHistory"
				>
					Load History
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {return {
		userGuilds: [],
		loading: true,
		selectedGuild: null,
		message: `Loading Your Servers...`,
		errored: false,
	}},
	methods: {
		loadHistory() {
			this.$emit(`set-guild`, this.selectedGuild.id);
			this.$emit(`change-state`, `view-history`);
		},
		selectGuild(guild) {
			this.selectedGuild = guild;
		},
	},
	async mounted() {

		// Get the user's guilds from Discord
		let token = sessionStorage.getItem(`qb-auth-token`);
		try {
			var response = await axios.get(
				`${this.discord.api.base}${this.discord.api.getGuilds}`,
				{ headers: { 'Authorization': `Bearer ${token}` } }
			);
		} catch (err) {
			this.message = `Error Getting Your Server List From Discord`;
			this.errored = true;
			return;
		};

		let allGuilds = response.data;

		if (200 <= response.status && response.status < 300) {

			// Request the guild intersection from the server
			try {
				response = await axios.post(
					`${this.private.api}/guilds/compare`,
					response.data.map(g => g.id)
				);
			} catch (err) {
				this.message = `Error Comparing Server Lists`;
				this.errored = true;
				return;
			};

			let intersectedGuilds = response.data;

			if (intersectedGuilds.length === 1) {
				this.$emit(`set-guild`, intersectedGuilds[0]);
				this.$emit(`change-state`, `view-history`);
				return;
			};

			// Find all the guild objects that were returned from the private API
			for (var guild of allGuilds) {
				if (intersectedGuilds.includes(guild.id)) {
					this.userGuilds.push(guild);
				};
			};
			this.loading = false;
		}
	},
};
</script>

<style scoped>
#guild-select {
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
	width: 33%;
}

@media only screen and (max-width: 768px) {
	.card {
		width: 90%;
	}
}
</style>