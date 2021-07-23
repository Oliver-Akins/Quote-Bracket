export var BRACKET_DATA = {
	msg: "",
	quotes: [],
	votes: {},
	users: {},
};

export var CHANNEL_DATA = {
	webhook: {
		token: "",
		id: "",
	},
	bracket: BRACKET_DATA,
};

export var DISCORD_API_URI: string = `https://discord.com/api/v8`;