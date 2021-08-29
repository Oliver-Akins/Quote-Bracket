import { db } from "@/main";

export async function selectQuote(data: any): Promise<object> {
	let newVote = parseInt(data.data.values[0]);
	let userID = data.member.user.id;
	let gID = data.guild_id;
	let oldVote = db[gID].bracket.users[userID];


	// Assert votes are different
	if (oldVote === newVote) {
		return {
			type: 4,
			data: {
				content: `You're already voting for that quote!`,
				flags: 1 << 6,
			}
		};
	};

	++db[gID].bracket.quotes[newVote].votes;
	db[gID].bracket.users[userID] = newVote;

	// User changed their vote
	if (oldVote != null) {

		--db[gID].bracket.quotes[oldVote].votes;

		return {
			type: 4,
			data: {
				content: `Your vote has been changed from:\n> ${db[gID].bracket.quotes[oldVote].text}\nto:\n> ${db[gID].bracket.quotes[newVote].text}`,
				flags: 1 << 6,
			}
		};
	}

	// User voted for the first time
	else {
		return {
			type: 4,
			data: {
				content: `Your vote has been recorded for:\n> ${db[gID].bracket.quotes[newVote].text}`,
				flags: 1 << 6,
			}
		};
	};
};