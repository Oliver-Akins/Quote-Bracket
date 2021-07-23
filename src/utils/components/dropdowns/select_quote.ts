import { db } from "@/main";

export async function selectQuote(data: any): Promise<object> {
	let vote = parseInt(data.data.values[0]);
	let userID = data.member.user.id;
	let gID = data.guild_id;
	let oldVote = db[gID].bracket.votes[userID];


	// Assert votes are different
	if (oldVote === vote) {
		return {
			type: 4,
			data: {
				content: `You're already voting for that quote!`,
				flags: 1 << 6,
			}
		};
	};


	// Set quote to 0 if it hasn't been voted for yet
	if (!db[gID].bracket.votes[vote]) {
		db[gID].bracket.votes[vote] = 0;
	};

	++db[gID].bracket.votes[vote];
	db[gID].bracket.users[userID] = vote;

	// User changed their vote
	if (oldVote != null) {

		--db[gID].bracket.votes[oldVote];

		return {
			type: 4,
			data: {
				content: `Your vote has been changed from:\n> ${db[gID].bracket.quotes[oldVote]}\nto:\n> ${db[gID].bracket.quotes[vote]}`,
				flags: 1 << 6,
			}
		};
	}

	// User voted for the first time
	else {
		return {
			type: 4,
			data: {
				content: `Your vote has been recorded for:\n> ${db[gID].bracket.quotes[vote]}`,
				flags: 1 << 6,
			}
		};
	};
};