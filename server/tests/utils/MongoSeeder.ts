import { MongoConnection } from './../../app/utils/MongoConnection';
import { Seeder } from 'mongo-seeding';
import { container } from '../../app/registry';
import * as path from 'path';
import TYPES from '../../app/constants/types';

export const seedMongo = async (): Promise<void> => {
  try {
    const mongoConnection = container.get<MongoConnection>(TYPES.MongoConnection);
    const seeder = new Seeder({
      database: mongoConnection.connectionString,
      dropDatabase: true,
      dropCollections: true,
    });
    const collections = seeder.readCollectionsFromPath(path.resolve('./tests/functional/seed'));
    console.log('Seeding test database');
    await seeder.import(collections);
  } catch (err) {
    console.error(`Error seeding mongo: ${err.stack}`);
  }
};
