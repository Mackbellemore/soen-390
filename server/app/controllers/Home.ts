import { inject } from 'inversify';
import { controller, httpGet, BaseHttpController, results } from 'inversify-express-utils';
import { HomeService } from '../services/HomeService';
import TYPES from '../constants/types';

@controller('/')
export class HomeController extends BaseHttpController {
  constructor(@inject(TYPES.HomeService) private homeService: HomeService) {
    super();
  }

  @httpGet('/')
  public get(): results.JsonResult {
    try {
      const serviceString: string = this.homeService.exampleFunction();
      return this.json(JSON.stringify(serviceString));
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
