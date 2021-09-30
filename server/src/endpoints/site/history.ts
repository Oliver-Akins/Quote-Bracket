import { Request, ResponseToolkit } from "@hapi/hapi";
import { loadHistory } from "@/utils/data";
import { config } from "@/main";
import boom from "@hapi/boom";

export default {
	method: `GET`, path: `/{guild_id}/history`,
	options: {
		auth: false,
		cors: {
			origin: [ `*` ],
		},
	},
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;

		if (!config.guilds[gID].history_site) {
			throw boom.notFound();
		};

		return await loadHistory(gID);
	},
};