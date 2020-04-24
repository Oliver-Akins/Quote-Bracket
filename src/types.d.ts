type bracket_result = reaction|"TIE"|"NO_DATA";
type snowflake = number;

interface emoji {
	name: string;
	id: string;
}

interface reaction {
	emoji: emoji;
	count: number;
	me: boolean;
}


interface embed_field {
	name: string;
	value: string;
	inline: boolean;
}


interface msg_meta {
	reactions: reaction[];
	quote_a: embed_field;
	quote_b: embed_field;
}