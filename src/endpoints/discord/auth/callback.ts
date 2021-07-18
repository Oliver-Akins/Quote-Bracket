import { Request, ResponseToolkit } from "@hapi/hapi";
import { config, db } from "@/main";
import axios from "axios";

export default {
	method: `GET`, path: `/discord/auth/callback`,
	async handler(request: Request, h: ResponseToolkit) {
		console.log(`Authentication finishing!`)
		let code = request.query.code;

		let data = new URLSearchParams();
		data.set(`client_id`, config.discord.client_id);
		data.set(`client_secret`, config.discord.secret);
		data.set(`grant_type`, `authorization_code`);
		data.set(`code`, code);
		data.set(`redirect_uri`, config.discord.auth_redirect);

		let r = await axios.post(`https://discord.com/api/v8/oauth2/token`, data, {
			headers: {
				'Content-Type': `application/x-www-form-urlencoded`
			}
		});

		db.webhook.token = r.data.webhook.token;
		db.webhook.id = r.data.webhook.id;

		return r.data;
	},
}