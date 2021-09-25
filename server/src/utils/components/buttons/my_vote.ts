import { db } from "@/main";


export const showUserVoteButton = {
	type: 2,
	style: 1,
	label: `What Did I Vote For?`,
	custom_id: `showMyVote`,
};

export async function showUserVote(data: any): Promise<object> {
	let gID = data.guild_id;
	let vote = db[gID].bracket.users[data.member.user.id];
	let quote = db[gID].bracket.quotes[vote];

	let content = `You currently haven't voted for a quote!`;
	if (quote) {
		content = `Your vote is for:\n> ${quote.text}`;
	};

	return {
		type: 4,
		data: {
			content,
			flags: 1 << 6,
		}
	};
}