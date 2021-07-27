interface bracket_data {
	msg: string;
	channel: string;
	quotes: string[];
	votes: { [index: number]: number };
	users: { [index: string]: number };
}

interface database {
	[index: string]: {
		webhook: {
			id: string;
			token: string;
		};
		bracket: bracket_data;
	}
}

interface bracket_history {
	quotes: string[];
	votes: { [index: number]: number };
}