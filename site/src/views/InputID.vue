<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="guild-id-input">
		<div class="card">
			<h1>Quote Bracket</h1>
			<div>
				<p>
					Enter a server ID in the box below in order to load the
					quote bracket history. If you need help finding out how to
					get the server's ID, you can read Discord's help article
					about getting IDs here:
					<a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">
						Where can I find my User/Server/Message ID?
					</a>
				</p>
				<div class="flex-row">
					<input
						type="text"
						name="Server ID"
						id="server-id"
						v-model="guildID"
					>
				</div>
				<div
					v-if="hasError"
				>
					The server ID you entered is invalid, please make sure that
					you entered it correctly.
				</div>
				<div class="flex-row">
					<button
						@click.stop="goBack"
					>
						Cancel
					</button>
					<button
						v-if="guildID && !hasError"
						@click.stop="loadHistory"
					>
						Load History
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {return {
		guildID: ``,
	}},
	computed: {
		hasError() {
			return this.guildID.match(/[^0-9]/g) != null;
		},
	},
	methods: {
		goBack() {
			this.$emit(`change-state`, `login`);
		},
		loadHistory() {
			this.$emit(`set-guild`, this.guildID);
			this.$emit(`change-state`, `view-history`);
		},
	},
	async mounted() {},
};
</script>

<style scoped>
#guild-id-input {
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

.flex-row {
	align-items: center;
	display: flex;
	justify-content: space-evenly;
}

button {
	margin-top: 10px;
}

#server-id {
	text-align: center;
	flex-grow: 1;
}

@media only screen and (max-width: 768px) {
	.card {
		width: 90%;
	}
}
</style>