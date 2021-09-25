import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { config, db } from "@/main";
import axios from "axios";

export default {
	method: `GET`, path: `/{guild_id}/bracket/isTied`,
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;
		let thread_behaviour = config.guilds[gID].tie_reminder;

		let r = await request.server.inject({
			url: `/${gID}/bracket/winners`,
			auth: request.auth,
		});
		let data = JSON.parse(r.payload);

		if (data.count >= 2) {
			let bracket = db[gID].bracket;

			// Construct the primary body of the message
			let content = `The bracket currently has a tie between:\n> `;
			content += data.winners
				.map((q:quote) => q.text)
				.join('\n~~------------------------------------~~\n> ');

			// Alert users if all will be eliminated or not
			if (data.eliminate_all) {
				content += `\n\n**If the tie remains, all quotes will be eliminated**`;
			} else {
				content += `\n\n**All of these quotes will advance if the tie isn't broken.**`;
			};

			// Define the query params that are needed all the time
			let params: execute_webhook_query_params = { wait: true };

			// Check if the user is wanting to use a thread notification
			if ((thread_behaviour !== "channel") && config.guilds[gID].bot_token) {
				try {
					await axios.get(
						`${DISCORD_API_URI}/channels/${bracket.msg}`,
						{
							headers: {
								Authorization: `Bot ${config.guilds[gID].bot_token}`
							}
						}
					);
					params.thread_id = bracket.msg;
				} catch (err) {
					try {
						await axios.post(
							`${DISCORD_API_URI}/channels/${bracket.channel}/messages/${bracket.msg}/threads`,
							{
								name: config.guilds[gID].thread_name ?? `Quote Bracket Discussion`,
								auto_archive_duration: 1440,
							},
							{
								headers: {
									Authorization: `Bot ${config.guilds[gID].bot_token}`
								}
							}
						).then(response => {
							params.thread_id = bracket.msg
						});
					} catch (err) {};
				};
			};

			// Add link if we know what channel the message was posted in
			if (db[gID].bracket.channel) {
				switch (thread_behaviour) {
					case "channel":
					case "thread":
						content += `\n\n[Jump To Bracket](https://discord.com/channels/${gID}/${bracket.channel}/${bracket.msg})`;
						break;
					case "thread_no_jump_link":
						if (!params.thread_id) {
							content += `\n\n[Jump To Bracket](https://discord.com/channels/${gID}/${bracket.channel}/${bracket.msg})`;
						};
						break;
				};
			};

			let wh = db[gID].webhook;
			let r = await axios.post(
				`${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}`,
				{ content },
				{ params }
			);
			return h.response(r.data).code(r.status);
		};

		return h.response({ result: `No Tie` }).code(200);
	},
}