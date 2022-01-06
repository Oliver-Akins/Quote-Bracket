<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
<div id="history">
	<div class="card">
		<h2>Quote Bracket History</h2>
		<div
			v-if="bracket"
		>
			<div class="flex-row controls">
				<button
					class="no-mobile"
					:disabled="isFirst"
					@click.stop="newestBracket"
				>
					Newest
				</button>
				<button
					:disabled="isFirst"
					@click.stop="newerBracket"
				>
					Newer
				</button>
				<span>{{ date }}</span>
				<button
					:disabled="isLast"
					@click.stop="olderBracket"
				>
					Older
				</button>
				<button
					class="no-mobile"
					:disabled="isLast"
					@click.stop="oldestBracket"
				>
					Oldest
				</button>
			</div>
			<div class="quotes">
				<div
					class="quote"
					v-for="(quote, i) in bracket.quotes"
					:key="i"
					:class="quoteClasses(i)"
				>
					<span class="text">
						{{ quote.text }}
					</span>
					<div class="metadata flex-row">
						<span class="votes">Votes: {{ quote.votes }}</span>
						<span
							class="streak"
							v-if="quote.win_streak > 0"
						>
							Win Streak: {{ quote.win_streak }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p>
				There was an error loading the quote bracket information. Please
				wait a minute and then try again. If the issue continues, let
				Oliver know.
			</p>
		</div>
		<button
			@click.stop="resetGuild"
		>
			Pick a Different Server
		</button>
	</div>
</div>
</template>

<script>
import axios from "axios";

export default {
	props: {
		gid: {
			required: true,
		}
	},
	data() {return {
		history: [],
		page: 0,
	}},
	computed: {
		bracket() {
			return this.history[this.page];
		},
		isFirst() {
			return this.page === this.history.length - 1;
		},
		isLast() {
			return this.page === 0;
		},
		date() {
			let date = new Date(this.bracket.date);
			return date.toLocaleString();
		},
		winners() {
			let max = -1;
			let quotes = [];

			for (var qi in this.bracket.quotes) {
				let q = this.bracket.quotes[qi];
				if (q.votes === max) {
					quotes.push(qi);
				} else if (q.votes > max) {
					max = q.votes;
					quotes = [qi];
				};
			};

			return quotes;
		},
	},
	methods: {
		quoteClasses(qi) {
			if (this.winners.includes(`${qi}`)) {
				return [`winner`];
			};
			return [];
		},
		updateQuery() {
			let url = new URL(window.location.href);
			let qs = url.searchParams;

			qs.set(`page`, this.page);

			history.replaceState(null, null, url);
		},
		oldestBracket() {
			this.page = 0;
			this.updateQuery();
		},
		olderBracket() {
			this.page--;
			this.updateQuery();
		},
		newerBracket() {
			this.page++;
			this.updateQuery();
		},
		newestBracket() {
			this.page = this.history.length - 1;
			this.updateQuery();
		},
		resetGuild() {
			window.location.search = "";

			this.$emit(`set-guild`, null);
			this.$emit(`change-state`, `login`);
		},
	},
	async mounted() {
		let qs = new URLSearchParams(window.location.search);

		try {
			let r = await axios.get(`${this.private.api}/${this.gid}/history`);
			if (r.status === 200) {
				this.history = r.data;
			};

			if (qs.has(`page`)) {
				this.page = parseInt(qs.get(`page`));
				this.updateQuery();
			} else {
				this.newestBracket();
			};
		} catch (err) {};
	},
}
</script>

<style scoped>
#history {
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
	width: 75%;
}

.flex-row {
	align-items: center;
	display: flex;
	justify-content: space-evenly;
}

.quote {
	background: var(--tertiary-background);
	border-radius: var(--large-border-radius);
	margin-bottom: 10px;
	padding: 10px;
	border-width: 1px;
	border-style: solid;
	border-color: var(--tertiary-background);
}
.quote.winner {
	border-color: gold;
}

.controls {
	margin-bottom: 15px;
}

.quote .metadata {
	margin-top: 10px;
}

@media only screen and (max-width: 768px) {
	.no-mobile {
		display: none;
	}
	.card {
		width: 90%;
	}
}
</style>