import { Request, ResponseToolkit } from "@hapi/hapi";
import { loadHistory, saveHistory } from "@/utils/data";
import { getQuote } from "@/utils/quotes";
import { db, config } from "@/main";
import { BRACKET_DATA, DISCORD_API_URI } from "@/constants";
import axios from "axios";
import { deleteVoteButton } from "@/utils/components/buttons/delete_vote";
import { showUserVoteButton } from "@/utils/components/buttons/my_vote";
import { viewDBButton } from "@/utils/components/buttons/view_db";
import { countVotesButton } from "@/utils/components/buttons/count_votes";
import { historyLinkButton } from "@/utils/components/buttons/history_site";

export default {
	method: `POST`, path: `/{guild_id}/bracket`,
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;
		let wh = db[gID].webhook;


		function generateFieldTitle(index: number, quote: quote): string {
			// Change the name based on if the quote won or not
			if (quote.win_streak > 0) {
				let name = `👑 Quote ${index + 1}:`;

				// Add the win streak information if desired
				if ((config.guilds[gID].show_win_streak ?? true)
					&& quote.win_streak > 0) {
					name += ` (Streak: ${quote.win_streak})`;
				};

				return name;
			}

			else {
				return `Quote ${index + 1}:`;
			};
		};



		// Create the very first quote bracket
		let quotes: quote[];
		if (!db[gID].bracket.msg) {
			quotes = await getQuote(gID, config.guilds[gID].quote_max);
		} else {

			await request.server.inject({
				method: `DELETE`,
				url: `/${gID}/bracket/${config.guilds[gID].delete_mode}`,
				auth: request.auth,
			});

			let pastBrackets = await loadHistory(gID);
			pastBrackets.push({
				version: 2,
				date: new Date().toISOString(),
				quotes: db[gID].bracket.quotes,
			});
			saveHistory(gID, pastBrackets);

			// Calculate the winners from the previous bracket
			let r = await request.server.inject({
				url: `/${gID}/bracket/winners?finalize=true`,
				auth: request.auth,
			});
			let data = JSON.parse(r.payload);
			var winner_count = data.count;

			// Check if we are getting rid of all winners
			if (data.eliminate_all) {
				quotes = [];
				winner_count = 0;
			} else {
				quotes = data.winners;
			};

			// Get enough quotes to meet the maximum for the guild
			let new_quotes = await getQuote(
				gID,
				config.guilds[gID].quote_max - quotes.length
			);
			quotes.push(...new_quotes);
		};

		// Setup the database for the new bracket
		db[gID].bracket = JSON.parse(JSON.stringify(BRACKET_DATA));
		db[gID].bracket.quotes = quotes;

		let message = {
			content: `New Quote Bracket!`,
			embeds: [
				{
					description: `Note: If **more than ${Math.floor(config.guilds[gID].quote_max / 2)}** of the quotes tie, they will all be eliminated, otherwise, the ones that tie will move on to the next bracket.`,
					fields: quotes.map((quote, i) => { return {
						name: generateFieldTitle(i, quote),
						value: quote.text,
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
							options: quotes.map((_, i) => {
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
						showUserVoteButton,
						deleteVoteButton,
					],
				}
			]
		};

		//---------------------------------
		// Add the extra buttons as desired
		let extra_buttons = config.guilds[gID].extra_buttons ?? [];
		if (extra_buttons.length > 0) {
			let actionRow: action_row = {
				type: 1,
				components: [],
			};

			if (extra_buttons.includes(`historyLink`) && config.server.history_site_base) {
				actionRow.components.push(historyLinkButton(gID));
			};

			if (extra_buttons.includes(`DB`)) {
				actionRow.components.push(viewDBButton);
			};

			if (extra_buttons.includes(`voteCount`)) {
				actionRow.components.push(countVotesButton);
			};

			message.components.push(actionRow);
		};

		let url = `${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}`;
		let r = await axios.post(url, message, { params: { wait: true } });
		db[gID].bracket.msg = r.data.id;
		db[gID].bracket.channel = r.data.channel_id;
		return h.response(r.data).code(r.status);
	},
}