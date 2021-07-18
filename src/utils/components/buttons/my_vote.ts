import { db } from "@/main";

export async function showUserVote(data: any): Promise<object> {
	let vote = db.bracket.users[data.member.user.id];
	let quote = db.bracket.quotes[vote];

	let response = `You currently haven't voted for a quote!`;
	if (quote) {
		response = `Your vote is for:\n> ${quote}`;
	};

	return {
		type: 4,
		data: {
			content: response,
			flags: 1 << 6,
		}
	};
}