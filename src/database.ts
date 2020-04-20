import { MSG_ID_FILE, DB_NAME } from "./config";
import * as fs from "fs";

export const LOAD_MSG_ID = (): string => {
	return fs.readFileSync(`./${MSG_ID_FILE}`, `utf8`)
};


export const WRITE_MSG_ID = (new_id: string) => {
	return fs.writeFileSync(`./${MSG_ID_FILE}`, new_id)
};


export const LOAD_USED_QUOTES = (): string[] => {
	return JSON.parse(fs.readFileSync(`./${DB_NAME}`, `utf8`));
};


export const WRITE_USED_QUOTES = (data: string[]) => {
	fs.writeFileSync(`${DB_NAME}`, JSON.stringify(data));
}