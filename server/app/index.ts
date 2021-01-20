const uncaughtException = (err: Error): void => {
	console.error(err.message, null, ['uncaught', 'exception'], {stack: err.stack});
	process.exit(1);
};

const gracefulClose = () => {
	app.close()
		.then(() => {
			console.log('gracefully shutting down');
			process.exit(0);
		})
		.catch((e) => {
			console.error(e);
			process.exit(1);
		});
};

process.on('uncaughtException', uncaughtException);

process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
	console.warn(`Unhandled Rejection at: Promise', ${p}, reason: ${reason}`, null, ['unhandled', 'rejection']);
});

process.on('SIGTERM', gracefulClose);
process.on('SIGINT', gracefulClose);

import { App } from './app';
const app = new App();

app.init();
app.start().catch(uncaughtException);