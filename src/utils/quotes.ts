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
	let quotes: string[] = [];
	do {
		let quote = quoteList[Math.floor(Math.random() * quoteList.length)];

		if (!quotes.includes(quote) && !history.includes(quote)) {
			quotes.push(quote);
		};
	} while (quotes.length < count);

	history.push(...quotes)

	await saveUsedQuotes(gID, history);

	return quotes;
};