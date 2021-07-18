import { db } from "@/main";


export async function countVotes(data: any): Promise<object> {

	let response = `Quote Votes:`;
	for (var i in db.bracket.quotes) {
		response += `\n${db.bracket.votes[i] ?? 0} votes for \`${db.bracket.quotes[i]}\``;
	};
	return {
		type: 4,
		data: {
			content: response,
			flags: 1 << 6,
		}
	};
}