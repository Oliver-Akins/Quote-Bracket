interface database {
	[index: string]: {
		webhook: {
			id: string;
			token: string;
		};
		bracket: {
			msg: string;
			channel: string;
			quotes: string[];
			votes: { [index: number]: number };
			users: { [index: string]: number };
		};
	}
}

interface bracket_history {
	quotes: string[];
	votes: { [index: number]: number };
}