import { Request, ResponseToolkit } from "@hapi/hapi";
import { config } from "@/main";

export default {
	method: `GET`, path: `/discord/auth`,
	async handler(request: Request, h: ResponseToolkit) {
		return h.redirect(
			`https://discord.com/api/oauth2/authorize?client_id=${config.discord.client_id}&redirect_uri=${encodeURIComponent(config.discord.auth_redirect)}&response_type=code&scope=webhook.incoming`
		);
	},
}