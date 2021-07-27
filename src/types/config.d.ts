interface channel_config {
	password: string;
	api_base: string;
	quote_max: number;
	bot_token?: string;
	delete_mode: "remove_components" | "delete_message";
	params: { [index: string]: any };
}

interface config {
	discord: {
		auth_password: string;
		client_id: string;
		secret: string;
		public_key: string;
		auth_redirect: string;
		dev_buttons: boolean;
	};
	server: {
		host: string;
		port: number;
	};
	guilds: {
		[index: string]: channel_config;
	};
}