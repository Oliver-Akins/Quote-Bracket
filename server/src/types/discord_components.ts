interface emoji {
	name: string;
	id: string;
	animated: boolean;
}

interface action_row {
	type: 1,
	components: any[];
}

interface button {
	type: 2;

	/**
	 * - 1 = Primary (Blurple)
	 * - 2 = Secondary (Gray)
	 * - 3 = Success (Green)
	 * - 4 = Danger (Red)
	 */
	style: 1 | 2 | 3 | 4;
	custom_id: string;
	label?: string;
	emoji?: emoji;
	disabled?: boolean;
}

interface link_button {
	type: 2;
	style: 5;
	label: string;
	url: string;
}