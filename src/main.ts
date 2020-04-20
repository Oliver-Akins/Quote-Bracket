import { LOAD_MSG_ID, WRITE_MSG_ID } from "./database";
import { GET_MESSAGE, GET_QUOTE, WEBHOOK_PUSH } from "./api";
import { EMOJI_A_ID, EMOJI_B_ID, EMOJI_B_NAME, EMOJI_A_NAME } from "./config";

const MAIN = async () => {

	// Load message ID from file
	let msg_id: string = LOAD_MSG_ID();

	// Get message data
	let msg: msg_meta = await GET_MESSAGE(msg_id);



	// Compare values of reaction counts
	let emoji_a: reaction|undefined = msg.reactions.find(
		(reaction: reaction) => {return reaction.emoji.id === EMOJI_A_ID}
	);
	let emoji_b: reaction|undefined = msg.reactions.find(
		(reaction: reaction) => {return reaction.emoji.id === EMOJI_B_ID}
	);


	// Both quotes have had a reaction
	let winning_emoji: reaction|"TIE"|"NO_DATA";
	if (emoji_a !== undefined && emoji_b !== undefined) {
		if (emoji_a!.count === emoji_b!.count) {
			winning_emoji = "TIE";
		}
		else if (emoji_a!.count > emoji_b!.count) {
			winning_emoji = emoji_a!;
		}
		else if (emoji_a!.count < emoji_b!.count) {
			winning_emoji = emoji_b!;
		};
	}

	// Only emoji_a has had a reaction
	else if (emoji_a !== undefined && emoji_b === undefined) { winning_emoji = emoji_a!; }

	// Only emoji_b has had a reaction
	else if (emoji_a === undefined && emoji_b !== undefined) { winning_emoji = emoji_b!; }

	// Neither emoji has had a reaction
	else { winning_emoji = "NO_DATA"; }

	winning_emoji = winning_emoji!;


	var new_quote_a: string, new_quote_b: string;
	// Get new quotes
	switch (winning_emoji) {

		// Discard both previous quotes
		case "TIE":
		case "NO_DATA":
			new_quote_a = await GET_QUOTE();
			new_quote_b = await GET_QUOTE();
			break;

		// Only get one new quote
		default:
			winning_emoji = winning_emoji as reaction;
			let split_str: string = " - **"
			if (winning_emoji.emoji.id === EMOJI_A_ID) {
				new_quote_a = msg.quote_a.value.split(split_str, 2)[1].slice(0, -2);
			} else {
				new_quote_a = msg.quote_b.value.split(split_str, 2)[1].slice(0, -2);
			};
			new_quote_b = await GET_QUOTE();
			break;
	};


	// Construct new embed
	let embed: any = {
		title: `Quote Bracketeering`,
		description: `Vote for your favourite quote by reacting to this message with the proper emoji!\n\n\n**Note:** If both quotes end in the same number of votes they will __**BOTH**__ be eliminated.`,
		color: 43520,
		fields: [
			{
				name: `Quote A:`,
				value: `<:${EMOJI_A_NAME}:${EMOJI_A_ID}> - **${new_quote_a}**`,
				inline: false
			},
			{
				name: `Quote B:`,
				value: `<:${EMOJI_B_NAME}:${EMOJI_B_ID}> - **${new_quote_b}**`,
				inline: false
			}
		]
	}
	// Post to webhook and store new message ID
	let new_msg_id = await WEBHOOK_PUSH(embed);

	WRITE_MSG_ID(new_msg_id);
};


MAIN();