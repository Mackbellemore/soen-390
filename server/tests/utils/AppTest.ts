import 'reflect-metadata';
import { App } from '../../app/App';

export class AppTest {
  private static app: App;
  public static async init(): Promise<App> {
    if (AppTest.app === undefined) {
      AppTest.app = new App(9999);
      await this.app.init();
      await this.app.start();
    }

    return this.app;
  }
}
