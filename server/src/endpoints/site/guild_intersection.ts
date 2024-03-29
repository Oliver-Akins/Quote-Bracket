import { Request, ResponseToolkit } from "@hapi/hapi";
import { config } from "@/main";

export default {
	method: `POST`, path: `/guilds/compare`,
	options: {
		auth: false,
		cors: {
			origin: [ `*` ],
		},
	},
	async handler(request: Request, h: ResponseToolkit) {
		let userGuilds = request.payload as Array<string>;
		let registeredGuilds = [];

		for (var gid in config.guilds) {

			// Don't intersect with guilds that have the history site disabled
			if (!config.guilds[gid].history_site) {
				continue;
			}

			if (userGuilds.includes(gid)) {
				registeredGuilds.push(gid);
			};
		};

		return registeredGuilds;
	},
};