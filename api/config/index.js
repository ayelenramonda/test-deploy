import dotenv from 'dotenv';
import yargs from 'yargs';
import minimist from 'minimist';

import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

dotenv.config();

export default {
	MONGO_ATLAS: process.env.MONGO_ATLAS,
	PUERTO: argv.port || 8080,
	admin: true,
	CRYPTO_SECRET: process.env.CRYPTO_SECRET,
	SECRET_STRING: process.env.SECRET_STRING
};

const optionalArgsObject = {
	alias: {
		p: 'puerto',
		m: 'modo'
	},
	default: {
		p: 8080,
		m: 'fork'
	}
};

export const args = minimist(process.argv.slice(2), optionalArgsObject);
