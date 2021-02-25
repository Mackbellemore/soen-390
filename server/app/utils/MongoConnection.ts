import mongoose from 'mongoose';
import { IConfig } from 'config';

export class MongoConnection {
  public connectionString: string;
  private connected = false;
  private connecting = false;

  protected database: string;
  protected options: Record<string, unknown>;

  constructor(config: IConfig) {
    const host = config.get<string>('mongo.host');
    const pass = config.get<string>('mongo.pass');
    const port = config.get<number>('mongo.port');
    const user = config.get<string>('mongo.user');
    const dbName = config.get<string>('mongo.db');
    const stagingDbName = config.get<string>('mongo.dbStaging');

    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    const env = config.get<string>('env');

    // use the local container for mongodb when the app is ran locally or integration tests are running
    if (env === 'development' || env === 'test') {
      this.connectionString = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`;
      return;
    }

    // only use prod db if deploying main branch
    const cloudDbName = config.get<string>('zeetEnv') === 'main' ? dbName : stagingDbName;
    this.connectionString = `mongodb+srv://${user}:${pass}@${host}/${cloudDbName}?retryWrites=true&w=majority`;
  }

  public async connect(): Promise<void> {
    if (!this.connected && !this.connecting) {
      this.connecting = true;
      try {
        await mongoose.connect(this.connectionString, this.options);
        this.connected = true;
      } catch (err) {
        console.log(err);
        mongoose.disconnect().catch(() => null);
        throw err;
      } finally {
        this.connecting = false;
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connected) {
      await mongoose.disconnect();
      this.connected = false;
    }
  }

  public async getModel<T extends mongoose.Document>(
    name: string,
    schema: mongoose.Schema
  ): Promise<mongoose.Model<T>> {
    if (!this.connected && !this.connecting) {
      await this.connect();
    }

    return mongoose.model<T>(name, schema);
  }
}
