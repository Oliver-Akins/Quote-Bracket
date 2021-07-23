import { CHANNEL_DATA, DISCORD_API_URI } from "@/constants";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { config, db } from "@/main";
import boom from "@hapi/boom";
import axios from "axios";

export default {
	method: `GET`, path: `/discord/auth/callback`,
	async handler(request: Request, h: ResponseToolkit) {
		let { code, guild_id: gID } = request.query;


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

		let { id, token } = r.data.webhook;

		db[gID] = JSON.parse(JSON.stringify(CHANNEL_DATA))
		db[gID].webhook.token = token;
		db[gID].webhook.id = id;

		return r.data;
	},
}