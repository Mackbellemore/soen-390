import { IConfig } from 'config';
import mongoose from 'mongoose';

export class MongoConnection {
  private static connectionStr: string;

  public static async initConnection(config: IConfig): Promise<void> {
    const host = config.get<string>('mongo.host');
    const pass = config.get<string>('mongo.pass');
    const port = config.get<number>('mongo.port');
    const user = config.get<string>('mongo.user');
    const dbName = config.get<string>('mongo.db');

    const connectionString = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`;
    this.connectionStr = connectionString;
    await MongoConnection.connect(connectionString);
  }

  public static async connect(connStr: string): Promise<typeof mongoose> {
    const connection = await mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return connection;
  }

  public static setAutoReconnect(): void {
    mongoose.connection.on('disconnected', () => {
      if (!this.connectionStr) return;
      MongoConnection.connect(this.connectionStr);
    });
  }

  public static async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
}
