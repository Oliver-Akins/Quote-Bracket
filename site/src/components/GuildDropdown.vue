<template>
	<div
		class="custom-select"
		:tabindex="tabindex"
		@blur="open = false"
	>
		<div
			class="selected"
			:class="{open: open}"
			@click.stop="open = !open"
		>
			<span v-if="selected === null">
				Select a Server
			</span>
			<div v-else class="guild-card">
				<img
					class="guild-icon"
					:src="`https://cdn.discordapp.com/icons/${selected.id}/${selected.icon}.png`"
					:alt="`${selected.name}'s Server Icon`"
				>
				{{ selected.name }}
			</div>
		</div>
		<div
			class="items"
			:class="{selectHide: !open}"
		>
			<div
				class="item"
				v-for="(guild, i) of options"
				:key="i"
				@click.stop="handleSelect(guild)"
			>
				<div class="guild-card">
					<img
						v-if="guild.icon"
						class="guild-icon"
						:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
						:alt="`${guild.name}'s Server Icon`"
					>
					{{ guild.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: [`setGuild`],
	props: {
		options: {
			required: true,
			type: Array,
		},
		defaultOption: {
			required: false,
			type: Number,
			default: 0,
		},
		tabindex: {
			required: false,
			type: Number,
			default: 0,
		},
	},
	data() {return {
		selected: null,
		open: false,
	}},
	methods: {
		handleSelect(guild) {
			this.$emit(`setGuild`, guild);
			this.selected = guild;
			this.open = false;
		},
	},
	mounted() {
		if (this.options?.length && this.defaultOption !== null) {
			this.selected = this.options[this.defaultOption];
			this.$emit('setGuild', this.selected);
		};
	},
};
</script>

<style scoped>
.guild-card {
	align-items: center;
	display: flex;
	padding: 5px;
}

.guild-icon {
	--size: 50px;
	border-radius: calc(var(--size) / 2);
	height: var(--size);
	margin-right: 10px;
	width: var(--size);
}

.custom-select {
	position: relative;
	width: 100%;
	text-align: left;
	outline: none;
	height: 47px;
	line-height: 47px;
}

.selected {
	background-color: var(--tertiary-background);
	border-radius: 6px;
	border: 1px solid var(--accent-neutral);
	color: var(--light-text);
	padding-left: 8px;
	cursor: pointer;
	user-select: none;
}

.selected.open{
	border: 1px solid var(--accent-positive);
	border-radius: 6px 6px 0px 0px;
}

.selected:after {
	position: absolute;
	content: "";
	top: 22px;
	right: 10px;
	width: 0;
	height: 0;
	border: 4px solid transparent;
	border-color: #fff transparent transparent transparent;
}

.items {
	color: #ffffff;
	border-radius: 0px 0px 6px 6px;
	overflow: hidden;
	border-right: 1px solid var(--accent-positive);
	border-left: 1px solid var(--accent-positive);
	border-bottom: 1px solid var(--accent-positive);
	position: absolute;
	background-color: var(--tertiary-background);
	left: 0;
	right: 0;
}

.item{
	color: var(--light-text);
	padding-left: 8px;
	cursor: pointer;
	user-select: none;
}

.item:hover{
	background: #2b3035;
}

.selectHide {
	display: none;
}
</style>