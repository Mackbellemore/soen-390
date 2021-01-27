import mongoose from 'mongoose';

export class MongoConnection {
  public static async initConnection(): Promise<void> {
    const connectionString = 'mongodb://root:example@mongo:27017/app_db?authSource=admin';
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
    mongoose.connection.on('disconnected', () =>
      MongoConnection.connect('mongodb://root:example@mongo:27017/app_db?authSource=admin')
    );
  }

  public static async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
}
