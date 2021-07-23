import { db } from "@/main";


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