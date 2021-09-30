interface channel_config {
	password: string;
	api_base: string;
	quote_max: number;
	bot_token?: string;
	delete_mode: "remove_components" | "delete_message";
	params: { [index: string]: any };
	thread_name?: string;
	show_win_streak?: boolean;
	extra_buttons?: string[];
	tie_reminder: "channel" | "thread" | "thread_no_jump_link";
	history_site: boolean;
}

interface config {
	discord: {
		auth_password: string;
		client_id: string;
		secret: string;
		public_key: string;
		auth_redirect: string;
	};
	server: {
		host: string;
		port: number;
		history_site_base: string;
	};
	guilds: {
		[index: string]: channel_config;
	};
}