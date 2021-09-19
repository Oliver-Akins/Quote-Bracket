import { db } from "@/main";


export const countVotesButton: button = {
	type: 2,
	style: 2,
	label: `See Count`,
	custom_id: `showCount`,
};


export async function countVotes(data: any): Promise<object> {
	let gID = data.guild_id;

	let response = `Quote Votes:`;
	for (var q of db[gID].bracket.quotes) {
		response += `\n${q.votes} vote${q.votes !== 1 ? 's' : ''} for ${q.text}`;
	}
	return {
		type: 4,
		data: {
			content: response,
			flags: 1 << 6,
		}
	};
}