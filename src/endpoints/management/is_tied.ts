import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { config, db } from "@/main";
import axios from "axios";

export default {
	method: `GET`, path: `/{guild_id}/bracket/isTied`,
	async handler(request: Request, h: ResponseToolkit) {
		let gID = request.params.guild_id;

		let r = await request.server.inject({
			url: `/${gID}/bracket/winners`,
			auth: request.auth,
		});
		let data = JSON.parse(r.payload);

		if (data.count >= 2) {

			// Construct the primary body of the message
			let content = `The bracket currently has a tie between:\n> ${data.winners.join('\n~~------------------------------------~~\n> ')}`;

			// Alert users if all will be eliminated or not
			if (data.eliminate_all) {
				content += `\n\n**If the tie remains, all quotes will be eliminated**`;
			} else {
				content += `\n\n**All of these quotes will advance if the tie isn't broken.**`;
			};

			// Add link if we know what channel the message was posted in
			if (db[gID].bracket.channel) {
				content += `\n\n[Jump To Bracket](https://discord.com/channels/${gID}/${db[gID].bracket.channel}/${db[gID].bracket.msg})`
			};

			let wh = db[gID].webhook;
			let r = await axios.post(
				`${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}`,
				{ content },
				{ params: { wait: true } }
			);
			return h.response(r.data).code(r.status);
		};

		return h.response({ result: `No Tie` }).code(200);
	},
}