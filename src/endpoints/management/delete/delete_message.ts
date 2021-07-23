import { DISCORD_API_URI } from "@/constants";
import { db } from "@/main";
import { Request, ResponseToolkit } from "@hapi/hapi";
import axios from "axios";

export default {
	method: `DELETE`, path: `/{guild_id}/bracket/delete_message`,
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;

		let wh = db[gID].webhook;
		let r = await axios.delete(
			`${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}/messages/${db[gID].bracket.msg}`
		);

		return h.response(r.data).code(r.status);
	},
}