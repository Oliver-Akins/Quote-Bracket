interface database {
	webhook: {
		id: string;
		token: string;
	};
	bracket: {
		msg: string;
		quotes: string[];
		votes: { [index: number]: number };
		users: { [index: string]: number };
	};
}