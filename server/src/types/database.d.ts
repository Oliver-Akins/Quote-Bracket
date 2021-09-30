interface quote {
	text: string;
	votes: number;
	win_streak: number;
}


interface bracket_data {
	msg: string;
	channel: string;
	quotes: quote[];
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
	version: 2;
	date: string;
	quotes: quote[];
}