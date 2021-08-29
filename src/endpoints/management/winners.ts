import { Request, ResponseToolkit } from "@hapi/hapi";
import { config, db } from "@/main";

export default {
	method: `GET`, path: `/{guild_id}/bracket/winners`,
	async handler(request: Request, h: ResponseToolkit) {
		let gID = request.params.guild_id;
		let data = db[gID].bracket;

		let winners: quote[] = [];
		let highest = -1;

		// Run through all of the quotes to find the most voted for ones
		for (var quote of data.quotes) {

			// New maximum, remove all previous winners
			if (quote.votes > highest) {
				winners = [ quote ];
				highest = quote.votes;
			}

			else if (quote.votes === highest) {
				winners.push( quote );
			};
		};

		let count = winners.length;
		return h.response({
			winners,
			count,
			eliminate_all: count > Math.floor(config.guilds[gID].quote_max / 2),
		}).code(200);
	},
}