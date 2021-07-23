// Filepath alias resolution
import "module-alias/register";

// Begin personal code
import basic from "@hapi/basic";
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


function saveDB() {
	console.log(`Saving database`);
	fs.writeFileSync(config.server.db_file, JSON.stringify(db));
	process.exit(0);
};

process.on(`SIGINT`, saveDB);
process.on(`SIGTERM`, saveDB);
process.on(`uncaughtException`, saveDB);


async function init() {

	const server = new Server({
		port: config.server.port,
	});

	// Setup authentication
	server.register(basic);
	server.auth.strategy(`simple`, `basic`, {
		async validate(request: Request, user: string, pass: string, h: ResponseToolkit) {

			// Are we attempting to authenticate, then use the auth password
			if (request.path === `/discord/auth`) {
				return {
					isValid: config.discord.auth_password === pass,
					credentials: { pass },
				};
			};

			// Ensure the guild has a config
			if (!config.guilds[user]) {
				return { isValid: false, };
			};

			return {
				isValid: config.guilds[user].password === pass,
				credentials: { user }
			};
		},
		allowEmptyUsername: true,
	});
	server.auth.default(`simple`)

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