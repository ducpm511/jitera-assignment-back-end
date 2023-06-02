import { Request } from 'express';
import { CorsOptionsDelegate, CorsOptions } from 'cors';

const whitelist = [
	'http://localhost:3000',
];

const corsOptionsDelegate: CorsOptionsDelegate<Request> = (req: Request, callback: any) => {
	let corsOptions: CorsOptions;
	if (whitelist.indexOf(req.header('Origin') || '') !== -1) {
		corsOptions = { origin: true, methods: 'GET,PUT,POST,DELETE,PATCH', exposedHeaders: 'refresh-token-authorization', credentials: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

export = corsOptionsDelegate;
