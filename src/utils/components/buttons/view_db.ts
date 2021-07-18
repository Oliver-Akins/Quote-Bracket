import { db } from "@/main";


export async function viewDB(data: any): Promise<object> {
	return {
		type: 4,
		data: {
			content: `\`\`\`json\n${JSON.stringify(db.bracket, null, '  ')}\`\`\``,
			flags: 1 << 6,
		}
	};
}