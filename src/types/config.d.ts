interface config {
	discord: {
		quote_max: number;
		client_id: string;
		secret: string;
		public_key: string;
		auth_redirect: string;
		dev_buttons: boolean;
	};
	server: {
		host: string;
		port: number;
		db_file: string;
		quote_history: string;
		bracket_history: string;
	};
	quote: {
		api_base: string;
		token: string;
	};
}