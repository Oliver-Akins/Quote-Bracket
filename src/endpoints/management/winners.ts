import { Request, ResponseToolkit } from "@hapi/hapi";
import { config, db } from "@/main";

export default {
	method: `GET`, path: `/{guild_id}/bracket/winners`,
	async handler(request: Request, h: ResponseToolkit) {
		let gID = request.params.guild_id;
		let data = db[gID].bracket;

		let winners: string[] = [];
		let highest = -1;

		// Iterate through all quotes that were voted for
		for (var quote in data.votes) {

			// New maximum, reset array of winners
			if (data.votes[quote] > highest) {
				winners = [ data.quotes[quote] ];
				highest = data.votes[quote];
			}

			// Tied highest, add to list
			else if (data.votes[quote] == highest) {
				winners.push( data.quotes[quote] );
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