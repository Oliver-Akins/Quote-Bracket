import { Request, ResponseToolkit } from "@hapi/hapi";
import { CHANNEL_DATA, DISCORD_API_URI } from "@/constants";
import { config, db } from "@/main";
import boom from "@hapi/boom";
import axios from "axios";

export default {
	method: `GET`, path: `/discord/auth/callback`,
	async handler(request: Request, h: ResponseToolkit) {
		let code = request.query.code;

		let data = new URLSearchParams();
		data.set(`client_id`, config.discord.client_id);
		data.set(`client_secret`, config.discord.secret);
		data.set(`grant_type`, `authorization_code`);
		data.set(`code`, code);
		data.set(`redirect_uri`, config.discord.auth_redirect);

		let r = await axios.post(`${DISCORD_API_URI}/oauth2/token`, data, {
			headers: {
				'Content-Type': `application/x-www-form-urlencoded`
			}
		});

		let { guild_id, id, token } = r.data.webhook;

		// Assert the guild is allowed to be setup.
		if (!config.guilds[guild_id]) {

			// Delete the webhook so that it doesn't remain in the server
			await axios.delete(r.data.webhook.url);

			throw boom.notFound(`Cannot save a webhook for a guild that doesn't have a config set up.`);
		};

		db[guild_id] = JSON.parse(JSON.stringify(CHANNEL_DATA))
		db[guild_id].webhook.token = token;
		db[guild_id].webhook.id = id;

		return r.data;
	},
}