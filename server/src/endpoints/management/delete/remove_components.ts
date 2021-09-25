import { Request, ResponseToolkit } from "@hapi/hapi";
import { DISCORD_API_URI } from "@/constants";
import { db } from "@/main";
import axios from "axios";

export default {
	method: `DELETE`, path: `/{guild_id}/bracket/remove_components`,
	async handler(request: Request, h: ResponseToolkit) {
		let { guild_id: gID } = request.params;

		let wh = db[gID].webhook;
		let r = await axios.patch(
			`${DISCORD_API_URI}/webhooks/${wh.id}/${wh.token}/messages/${db[gID].bracket.msg}`,
			{ components: [] }
		);

		return h.response(r.data).code(r.status);
	},
}