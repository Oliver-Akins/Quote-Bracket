import { db } from "@/main";


export async function deleteVote(data: any): Promise<object> {
	let userID = data.member.user.id;

	if (!db.bracket.users[userID]) {
		return {
			type: 4,
			data: {
				content: `You haven't voted in the bracket, so you can't delete your vote.`,
				flags: 1 << 6,
			}
		};
	};

	// Subtract user's vote from total
	let vote = db.bracket.users[userID];
	--db.bracket.votes[vote];

	delete db.bracket.users[userID];

	return {
		type: 4,
		data: {
			content: `Your vote has been deleted.`,
			flags: 1 << 6,
		}
	};
}