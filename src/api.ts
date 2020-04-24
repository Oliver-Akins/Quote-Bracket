const axios = require("axios").default;
import {
	QUOTE_URL,
	RESULT_WEBHOOK,
	DISCORD_WEBHOOK,
	DISCORD_API_BASE,
	DISCORD_CHANNEL_ID,
	DISCORD_OAUTH_TOKEN,
	DISCORD_WEBHOOK_USERNAME
} from "./config";
import { LOAD_USED_QUOTES, WRITE_USED_QUOTES } from "./database";



export const GET_QUOTE = async (count = 1): Promise<string> => {
	return axios.get(
		QUOTE_URL
	).then((response: any) => {
		let used_quotes = LOAD_USED_QUOTES();
		let quotes = response.data.split("\n");
		let quote = quotes[Math.floor(Math.random() * quotes.length)];

		while (used_quotes.includes(quote)) {
			quote = quotes[Math.floor(Math.random() * quotes.length)];
		};
		used_quotes.push(quote);
		WRITE_USED_QUOTES(used_quotes);

		return quote
	})
	.catch((err: any) => {throw err});
}



export const GET_MESSAGE = async (id: string): Promise<msg_meta> => {
	return axios.get(
		`${DISCORD_API_BASE}/channels/${DISCORD_CHANNEL_ID}/messages/${id}`,
		{
			headers: {
				Authorization: `Bot ${DISCORD_OAUTH_TOKEN}`
			}
		}
	)
	.then((response:any) => {
		response = response.data;

		if (response.reactions) {
			return {
				reactions: response.reactions,
				quote_a: response.embeds[0].fields[0],
				quote_b: response.embeds[0].fields[1]
			}
		} else {
			return {
				reactions: [],
				quote_a: response.embeds[0].fields[0],
				quote_b: response.embeds[0].fields[1]
			}
		}
	}).catch((err:any) => {throw err});
};



const WEBHOOK_POST = async (webhook: string, username: string, embed: any): Promise<object> => {
	return await axios.post(
		`${DISCORD_WEBHOOK}?wait=true`,
		{
			username: username,
			embeds: [embed]
		}
	)
	.then((response: any) => {
		return response.data;
	}).catch((err:any) => {throw err});
};



export const POST_NEW_BRACKET = async (embed: any) => {
	// @ts-ignore
	return (await WEBHOOK_POST(DISCORD_WEBHOOK, DISCORD_WEBHOOK_USERNAME, embed)).id
};