import { config } from "@/main";


export const historyLinkButton = (guild_id: string): link_button => {
	return {
		type: 2,
		style: 5,
		label: `Bracket History`,
		url: `${config.server.history_site_base}?gid=${guild_id}`
	};
};