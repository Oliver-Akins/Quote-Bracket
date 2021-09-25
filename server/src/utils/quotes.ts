import { loadUsedQuotes, saveUsedQuotes } from "./data";
import { config } from "../main";
import axios from "axios";

export async function getQuote(gID: string, count = 1) {
	let r = await axios.get(
		config.guilds[gID].api_base,
		{ params: config.guilds[gID].params }
	);
	let quoteList = r.data.split(`\n`);
	let history = await loadUsedQuotes(gID);

	// Populate the quotes list
	let quotes: quote[] = [];
	do {
		let quote: quote = {
			text: quoteList[Math.floor(Math.random() * quoteList.length)],
			votes: 0,
			win_streak: 0,
		};

		if (!quotes.includes(quote) && !history.includes(quote.text)) {
			quotes.push(quote);
			history.push(quote.text);
		};
	} while (quotes.length < count);

	await saveUsedQuotes(gID, history);

	return quotes;
};