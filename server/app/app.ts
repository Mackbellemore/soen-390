import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './registry';
import { Application } from 'express';
import { IConfig } from 'config';
import * as bodyParser from 'body-parser';
import { Server } from 'http';

export class App {
    private config: IConfig;
	private app: Application;
	private listener: Server;
	

	constructor() {
		this.config = container.get<IConfig>('config');
	}
	
	public init(): void {
    	try {
    		const appBuilder = new InversifyExpressServer(container);

    		appBuilder.setConfig((server: Application) => {
    			server.use(bodyParser.urlencoded({
					extended: true
				}));
				server.use(bodyParser.json());
    		});

    		this.app = appBuilder.build();
    	} catch ({ message }) {
    		console.error(message);
    		process.exit(1);
    	}
	}

	public async start(): Promise<void> {
		try {
			if (!this.app) {
				throw new Error('app failed to initialize');
			}
			const port = this.config.get<number>('server.port');

			this.listener = this.app.listen(port, () => {
				console.log(`Backend booted on port ${port}`);
			});
		} catch ({ message }) {
			console.error(message);
			process.exit(1);
		}
	}

	public async close(): Promise<void> {
		try {
			this.listener.close();
		} catch ({ message }) {
			console.error(message);
			process.exit(1);
		}
	}
}