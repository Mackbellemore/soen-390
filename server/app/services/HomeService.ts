import { Logger } from 'winston';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';

@injectable()
export class HomeService {
  @inject(TYPES.logger) private logger: Logger;

  public exampleFunction(): string {
    this.logger.info('Logging from Home Service');
    return 'From the Home Service Class';
  }
}
