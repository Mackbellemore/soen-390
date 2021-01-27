import { Logger } from 'winston';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import Test from '../models/TestModel';

@injectable()
export class HomeService {
  @inject(TYPES.logger) private logger: Logger;

  public async exampleFunction(): Promise<string> {
    await Test.create({ description: 'test 123' });
    this.logger.info('Logging from Home Service');
    return 'From the Home Service Class';
  }
}
