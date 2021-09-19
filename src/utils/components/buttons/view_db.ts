import { db } from "@/main";


export const viewDBButton = {
	type: 2,
	style: 1,
	label: `See Database Object`,
	custom_id: `viewDB`,
};


export async function viewDB(data: any): Promise<object> {
	let gID = data.guild_id;
	return {
		type: 4,
		data: {
			content: `\`\`\`json\n${JSON.stringify(db[gID].bracket, null, '  ')}\`\`\``,
			flags: 1 << 6,
		}
	};
}