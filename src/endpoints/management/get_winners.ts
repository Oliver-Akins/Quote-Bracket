import { config, db } from "@/main"

export default {
	method: `GET`, path: `/bracket/winners`,
	async handler() {
		let winners: string[] = [];
		let highest = -1;

		// Find the winners of the quote
		for (var i in db.bracket.quotes) {
			if (db.bracket.votes[i] > highest) {
				winners = [ db.bracket.quotes[i] ];
				highest = db.bracket.votes[i];
			} else if (db.bracket.votes[i] === highest) {
				winners.push(db.bracket.quotes[i]);
			};
		};

		// Ensure that the all elimination limit didn't get hit
		if (winners.length > Math.floor(config.discord.quote_max / 2)) {
			return { winners: [] };
		};

		return { winners };
	},
}