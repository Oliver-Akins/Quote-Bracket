export var BRACKET_DATA: bracket_data = {
	msg: "",
	quotes: [],
	users: {},
	channel: "",
};

export var CHANNEL_DATA: channel_data = {
	version: 2,
	webhook: {
		token: "",
		id: "",
	},
	bracket: BRACKET_DATA,
};

export var DISCORD_API_URI: string = `https://discord.com/api/v9`;