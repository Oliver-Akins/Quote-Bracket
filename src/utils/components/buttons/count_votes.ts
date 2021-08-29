import { db } from "@/main";


export async function countVotes(data: any): Promise<object> {
	let gID = data.guild_id;

	let response = `Quote Votes:`;
	for (var i in db[gID].bracket.quotes) {
		response += `\n${db[gID].bracket.quotes[i].votes} votes for \`${db[gID].bracket.quotes[i]}\``;
	};
	return {
		type: 4,
		data: {
			content: response,
			flags: 1 << 6,
		}
	};
}