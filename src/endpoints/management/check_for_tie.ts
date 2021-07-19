import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { config, db } from "@/main";
import axios from "axios";

export default {
	method: `GET`, path: `/bracket/isTie`,
	async handler(request: Request, h: ResponseToolkit) {
		let r = await request.server.inject(`/bracket/winners`);
		let winners = JSON.parse(r.payload).winners;

		if (winners.length >= 2) {

			let r = await axios.get(
				`${DISCORD_API_URI}/webhooks/${db.webhook.id}/${db.webhook.token}`
			);
			let { guild_id, channel_id } = r.data;

			let content = `The bracket currently has a tie between:\n> ${winners.join('\n~~------------------------------------~~\n> ')}`;

			if (winners.length > Math.floor(config.discord.quote_max / 2)) {
				content += `\n\n**If this tie is not broken, all of the quotes will be eliminated**`
			};

			// Assert that the guild and channel are both properly defined
			if (guild_id && channel_id) {
				content += `\n\n[Click Here To Jump To The Bracket](https://discord.com/channels/${guild_id}/${channel_id}/${db.bracket.msg})`
			}

			await axios.post(
				`${DISCORD_API_URI}/webhooks/${db.webhook.id}/${db.webhook.token}`,
				{ content }
			);
		};

		return { status: 200 }
	},
}