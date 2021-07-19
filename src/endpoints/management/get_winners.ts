import { db } from "@/main"

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

		return { winners };
	},
}