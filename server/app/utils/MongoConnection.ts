import mongoose from 'mongoose';
import { IConfig } from 'config';

export class MongoConnection {
  private connectionString: string;
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

    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    if (config.get<string>('env') === 'development') {
      this.connectionString = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`;
      return;
    }

    // connection string for prod and staging cloud mongo cluster
    this.connectionString = `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority`;
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
