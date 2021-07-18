import { selectQuote } from "@/utils/components/dropdowns/select_quote";
import { deleteVote } from "@/utils/components/buttons/delete_vote";
import { countVotes } from "@/utils/components/buttons/count_votes";
import { showUserVote } from "@/utils/components/buttons/my_vote";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { config } from "@/main";
import boom from "@hapi/boom";
import nacl from "tweetnacl";

import { viewDB } from "@/utils/components/buttons/view_db";


async function handleButton(data: any): Promise<object> {
	switch (data.data.custom_id) {
		case "deleteVote":
			return await deleteVote(data);
		case "showCount":
			return await countVotes(data);
		case "viewDB":
			return await viewDB(data);
		case "showMyVote":
			return await showUserVote(data);
	};
	return {
		type: 4,
		data: {
			content: `Unknown button, how did you trigger this response? 0\_o`,
			flags: 1 << 6,
		}
	};
};

export default {
	method: `POST`, path: `/discord/webhook`,
	async handler(request: Request, h: ResponseToolkit) {
		let sig = request.headers[`x-signature-ed25519`];
		let timestamp = request.headers[`x-signature-timestamp`];
		let body: any = request.payload;


		// Verify the body against Discord's stuff
		let verified = nacl.sign.detached.verify(
			Buffer.from(timestamp + JSON.stringify(body)),
			Buffer.from(sig, `hex`),
			Buffer.from(config.discord.public_key, `hex`)
		);

		if (!verified) {
			return boom.unauthorized(`invalid request signature`);
		};

		switch (body.type) {
			case 1:
				return { type: 1 };
			case 3:

				// Parse the data properly
				if (body.data.component_type === 3) {
					return await selectQuote(body)
				} else if (body.data.component_type === 2) {
					return await handleButton(body)
				};

				return {
					type: 4,
					data: {
						content: `Unknown component type.`,
						flags: 1 << 6,
					},
				};
			default:
				return boom.badRequest()
		};
	},
};