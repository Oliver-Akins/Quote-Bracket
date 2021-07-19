import { db } from "@/main";

export async function selectQuote(data: any): Promise<object> {
	let vote = parseInt(data.data.values[0]);
	let userID = data.member.user.id;
	let oldVote = db.bracket.users[userID];


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
	if (!db.bracket.votes[vote]) {
		db.bracket.votes[vote] = 0;
	};

	++db.bracket.votes[vote];
	db.bracket.users[userID] = vote;

	// User changed their vote
	if (oldVote != null) {

		--db.bracket.votes[oldVote];

		return {
			type: 4,
			data: {
				content: `Your vote has been changed from:\n> ${db.bracket.quotes[oldVote]}\nto:\n> ${db.bracket.quotes[vote]}`,
				flags: 1 << 6,
			}
		};
	}

	// User voted for the first time
	else {
		return {
			type: 4,
			data: {
				content: `Your vote has been recorded for:\n> ${db.bracket.quotes[vote]}`,
				flags: 1 << 6,
			}
		};
	};
};