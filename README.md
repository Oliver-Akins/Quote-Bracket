# Quote Bracket
![GitHub Issues](https://img.shields.io/github/issues/Oliver-Akins/Quote-bracket?color=00aa00&label=Issues)

A system for determining the best quote for a stream. This was made for the [Resonym](https://discord.gg/resonym) community initially, but has since been expanded to allow the same system to run for multiple communities.

## Features
- Configurable on a per-guild level.
- Anywhere from 2-20 quotes per bracket.
- Can send an alert about any ties that exist in the bracket.

## Authors
- [@Oliver-Akins](https://github.com/Oliver-Akins)

## Setup Instructions
1. Clone the git repo to a server
2. Setup your domain to point to the server, this can be pointing through a reverse proxy like Nginx or directly at the Node server. **Note:** However you set it up, it must support HTTPS, otherwise Discord will not let you use the domain as a webhook endpoint.
3. Copy `config.template.toml` to `config.toml` and fill it out with the required information.
4. Run `npm install`
5. Run `tsc`
6. Set the `ExecStart` and `WorkingDirectory` in the service file to run the equivalent of `node dist/main.js`. (the `dist` folder is generated by Typescript when transcompiling the code into Javascript)
7. Add the service file to your system's service folder.
8. Start the service

## Support
For support, open a [GitHub Discussion](https://github.com/Oliver-Akins/Quote-Bracket/discussions)

## Feedback
If you have any feedback, please open a [GitHub Discussion](https://github.com/Oliver-Akins/Quote-Bracket/discussions)