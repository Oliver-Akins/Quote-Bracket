import fs from "fs/promises";

/**
 * Retrieves the historical data for each bracket that was ran for a channel.
 *
 * @param guild_id The guild ID that we are loading the history of brackets for
 */
export async function loadHistory(guild_id: string): Promise<bracket_history[]> {
	try {
		return JSON.parse(await fs.readFile(`data/history/${guild_id}.json`, `utf-8`))
	} catch (err) {
		return [];
	};
};

/**
 * Loads all of the quotes used by the system in previous quote brackets to
 * prevent duplicates.
 *
 * @param guild_id The guild ID that we are loading quotes for
 * @returns The quotes which have been used
 */
export async function loadUsedQuotes(guild_id: string): Promise<string[]> {
	try {
		return JSON.parse(await fs.readFile(`data/used_quotes/${guild_id}.json`, `utf-8`))
	} catch (err) {
		return [];
	};
};

/**
 * Saves the guild's quote bracket history.
 *
 * @param guild_id The ID of the guild which is being saved.
 * @param data The data that we are saving to disk.
 */
export async function saveHistory(guild_id: string, data: any) {
	fs.writeFile(`data/history/${guild_id}.json`, JSON.stringify(data));
};

/**
 * Saves the data to the guild's Used Quotes file to prevent duplicate quotes from
 * being used.
 *
 * @param guild_id The guild's ID
 * @param data The data that we are saving
 */
export async function saveUsedQuotes(guild_id: string, data: any) {
	fs.writeFile(`data/used_quotes/${guild_id}.json`, JSON.stringify(data));
};