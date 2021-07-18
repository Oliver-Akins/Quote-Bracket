import { readFileSync, writeFileSync } from "fs";
import { config } from "../main";
import axios from "axios";

export async function getQuote(count = 1) {
	let r = await axios.get(
		config.quote.api_base,
		{ params: { token: config.quote.token } }
	);
	let quoteList = r.data.split(`\n`);
	let history: string[] = JSON.parse(readFileSync(config.server.quote_history, `utf-8`));

	// Populate the quotes list
	let quotes: string[] = [];
	do {
		let quote = quoteList[Math.floor(Math.random() * quoteList.length)];

		if (!quotes.includes(quote) && !history.includes(quote)) {
			quotes.push(quote);
		};
	} while (quotes.length < count);

	history.push(...quotes)

	writeFileSync(config.server.quote_history, JSON.stringify(history));

	return quotes;
};