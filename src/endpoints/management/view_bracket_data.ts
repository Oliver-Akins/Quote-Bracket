import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { config, db } from "@/main";
import axios from "axios";

export default {
	method: `GET`, path: `/{guild_id}/bracket`,
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;
		let { convert_ids } = request.query;

		// See if we are adding the user's conversion table to the response
		let users: {[index: string]: string} = {};
		if (convert_ids.toLowerCase() === `true` && config.guilds[gID].bot_token) {
			for (var k in db[gID].bracket.users) {
				let r = await axios.get(
					`${DISCORD_API_URI}/users/${k}`,
					{
						headers: {
							Authorization: `Bot ${config.guilds[gID].bot_token}`
						}
					}
				);
				users[k] = `${r.data.username}#${r.data.discriminator}`
			};
		};

		return h.response({
			db: db[gID].bracket,
			user_conversion: users
		});
	},
}