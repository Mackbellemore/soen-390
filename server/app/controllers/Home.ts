import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { HomeService } from '../services/HomeService';
import TYPES from '../constants/types';

@controller('/')
export class HomeController {
	constructor(
		@inject(TYPES.HomeService) private homeService: HomeService
	) {}

  @httpGet('/')
	public get(): string {
		return this.homeService.exampleFunction();
	}
}
