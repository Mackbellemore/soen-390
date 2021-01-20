import { injectable } from 'inversify';

@injectable()
export class HomeService {
  public exampleFunction(): string {
    return 'From the Home Service Class';
  }
}
