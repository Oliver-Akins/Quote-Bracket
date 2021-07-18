import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { getQuote } from "@/utils/quotes";
import { config, db } from "@/main";
import fs from "fs/promises";
import axios from "axios";

export default {
	method: `GET`, path: `/bracket/finish`,
	async handler(request: Request, h: ResponseToolkit) {

		if (!db.bracket.msg) {
			var quotes = await getQuote(config.discord.quote_max);
		} else {
			// Delete the old message from Discord while processing the new one
			let wh = db.webhook;
			await axios.delete(`${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}/messages/${db.bracket.msg}`);

			// Save the previous bracket to the history file
			let pastBrackets = JSON.parse(
				await fs.readFile(config.server.bracket_history, `utf-8`)
			);
			pastBrackets.push({
				quotes: db.bracket.quotes,
				votes: db.bracket.votes,
			});
			await fs.writeFile(config.server.bracket_history, JSON.stringify(pastBrackets));


			// Calculate the winners from the previous bracket
			let r = await request.server.inject(`/bracket/winners`);
			var quotes: string[] = JSON.parse(r.payload).winners;
			var winner_count = quotes.length;

			// Get any new quotes for the bracket
			quotes.push(...(await getQuote(config.discord.quote_max - quotes.length)));
		}

		// Setup the database for the new bracket
		db.bracket.quotes = quotes;
		db.bracket.votes = {};
		db.bracket.users = {};
		db.bracket.msg = "";


		let message = {
			content: `New Quote Bracket!`,
			embeds: [
				{
					description: `Note: If **more than ${Math.floor(config.discord.quote_max / 2)}** of the quotes tie, they will all be eliminated, otherwise, the ones that tie will move on to the next bracket.`,
					fields: quotes.map((quote, i) => { return {
						name: `${i < winner_count ? '👑 ' : ''}Quote: ${i + 1}`,
						value: quote,
					}}),
				}
			],
			components: [
				{
					type: 1,
					components: [
						{
							type: 3,
							custom_id: `quote`,
							placeholder: `Choose Your Favourite Quote`,
							options:quotes.map((_, i) => {
								return {
									label: `Quote ${i + 1}`,
									value: i,
									emoji: i < winner_count ? {
										name: `👑`
									} : null
								}
							}),
						}
					]
				},
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 1,
							label: `What Did I Vote For?`,
							custom_id: `showMyVote`
						},
						{
							type: 2,
							style: 4,
							label: `Remove Vote`,
							custom_id: `deleteVote`
						}
					]
				}
			]
		};

		if (config.discord.dev_buttons) {
			message.components.push({
				type: 1,
				components: [
					{
						type: 2,
						style: 1,
						label: `See Count`,
						custom_id: `showCount`,
					},
					{
						type: 2,
						style: 1,
						label: `See Database Object`,
						custom_id: `viewDB`,
					}
				]
			});
		};

		let url = `${DISCORD_API_URI}/webhooks/${db.webhook.id}/${db.webhook.token}`;
		let r = await axios.post(url, message, { params: { wait: true } });
		db.bracket.msg = r.data.id;
		return { status: r.status }
	},
}