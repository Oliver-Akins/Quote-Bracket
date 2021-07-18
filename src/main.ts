// Filepath alias resolution
import "module-alias/register";

// Begin personal code
import { DB_DEFAULTS } from "@/constants";
import { Server } from "@hapi/hapi";
import path from "path";
import glob from "glob";
import toml from "toml";
import fs from "fs";

// load the config
if (!fs.existsSync(`config.toml`)) {
	console.log(`Please fill out the config and then try starting the server again.`);
	process.exit(1);
};
export const config: config = toml.parse(fs.readFileSync(`config.toml`, `utf-8`));


// Load the database
if (!fs.existsSync(config.server.db_file)) {
	console.log(`Can't find database file, creating default`);
	fs.writeFileSync(config.server.db_file, JSON.stringify(DB_DEFAULTS));
};
export var db: database = JSON.parse(fs.readFileSync(config.server.db_file, `utf-8`));


process.on(`SIGINT`, () => {
	console.log(`Saving database`);
	fs.writeFileSync(config.server.db_file, JSON.stringify(db));
	process.exit(0);
});


async function init() {

	const server = new Server({
		port: config.server.port,
		debug: {
			request: [ `error` ]
		}
	});


	// Register all the routes
	let files = glob.sync(
		`endpoints/**/!(*.map)`,
		{ cwd: __dirname, nodir: true}
	);
	for (var file of files) {
		let route = (await import(path.join(__dirname, file))).default;
		console.log(`Registering route: ${route.method} ${route.path}`);
		server.route(route);
	};

	server.start().then(() => {
		console.log(`Server listening on ${config.server.host}:${config.server.port}`);
	});
};

init();