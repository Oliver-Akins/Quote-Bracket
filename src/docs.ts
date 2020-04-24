import { DISCORD_CDN_BASE } from "./config";
import * as fs from "fs";


export const ADD_TO_DOCS = (msg: msg_meta, won: bracket_result) => {
	let addition_indicator: string = `<!-- BOTTOM -->`;
	let split_str: string = ` - **`;
	let result: string;

	switch (won) {
		case "NO_DATA":
		case "TIE":
			result = won;
			break;
		default:
			result = `<img src="${DISCORD_CDN_BASE}/emojis/${won.emoji.id}.png" class="emoji">`
			break;
	};

	let docstring_to_add: string = `<hr>
	<div>
		Winner: ${result}
		<br><br>
		<span class="quote">
			<img src="${DISCORD_CDN_BASE}/emojis/701289851923988540.png" class="emoji">
			<br>
			${msg.quote_a.value.split(split_str, 2)[1].slice(0, -2)}
		</span>
		<br><br>
		<span class="quote">
			<img src="${DISCORD_CDN_BASE}/emojis/701289852146286633.png" class="emoji">
			<br>
			${msg.quote_b.value.split(split_str, 2)[1].slice(0, -2)}
		</span>
	</div>
	${addition_indicator}`;

	let docs: string = fs.readFileSync(`./docs/index.html`, `utf8`);
	console.log(docs)
	docs = docs.replace(`<!-- BOTTOM -->`, `${docstring_to_add}`);
	console.log(docs);
	fs.writeFileSync(`./docs/index.html`, `${docs}`);
}