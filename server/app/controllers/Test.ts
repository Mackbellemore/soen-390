import { controller, httpGet } from 'inversify-express-utils';

@controller('/test')
export class TestController {
  @httpGet('/')
  public get(): string {
    return 'test';
  }
}
