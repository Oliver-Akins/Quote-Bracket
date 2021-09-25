import { db } from "@/main";


export const deleteVoteButton = {
	type: 2,
	style: 4,
	label: `Remove Vote`,
	custom_id: `deleteVote`
};


export async function deleteVote(data: any): Promise<object> {
	let userID = data.member.user.id;
	let gID = data.guild_id;

	// Assert the user has voted
	if (db[gID].bracket.users[userID] == null) {
		return {
			type: 4,
			data: {
				content: `You haven't voted in the bracket, so you can't delete your vote.`,
				flags: 1 << 6,
			}
		};
	};

	// Subtract user's vote from total
	let vote = db[gID].bracket.users[userID];
	--db[gID].bracket.quotes[vote].votes;

	delete db[gID].bracket.users[userID];

	return {
		type: 4,
		data: {
			content: `Your vote has been deleted.`,
			flags: 1 << 6,
		}
	};
}