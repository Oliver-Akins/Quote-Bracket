function convert_database(data) {
	let new_data = {
		version: 2,
		webhook: data.webhook,
		bracket: {
			quotes: [],
			users: {},
			channel: data.bracket.channel,
			msg: data.bracket.msg,
		},
	};

	for (qid in data.bracket.quotes) {
		new_data.bracket.quotes.push({
			text: data.bracket.quotes[qid],
			win_streak: 0,
			votes: data.bracket.votes[qid] ?? 0,
		});
	};

	return new_data;
};


let date = new Date();
console.log(`Date detected as: ${date.toLocaleDateString()}`);
date.setDate(date.getDate() - 1);
date.setHours(12, 0, 0, 0);
console.log(`Date converted to: ${date.toLocaleDateString()}`);

function convert_history(hist) {
	let new_hist = {
		version: 2,
		date: date.toJSON(),
		quotes: []
	};

	for (qid in hist.quotes) {
		new_hist.quotes.push({
			text: hist.quotes[qid],
			votes: hist.votes[qid],
			win_streak: 0,
		});
	};
	date.setDate(date.getDate() - 1);
	return new_hist;
};


let fs = require("fs");

let database = JSON.parse(fs.readFileSync(`./test_data/db.json`, `utf-8`));
let history = JSON.parse(fs.readFileSync(`./test_data/history.json`, `utf-8`));


for (guild_id in database) {
	database[guild_id] = convert_database(database[guild_id]);
};


// Convert the history
history = history.reverse()
for (bracket_id in history) {
	history[bracket_id] = convert_history(history[bracket_id]);
};
history = history.reverse();

fs.writeFileSync(`./test_data/db.json`, JSON.stringify(database, null, `\t`));
fs.writeFileSync(`./test_data/history.json`, JSON.stringify(history, null, `\t`));