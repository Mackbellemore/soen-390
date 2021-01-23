import 'reflect-metadata';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { SinonSandbox } from 'sinon';
import { HomeController } from '../../app/controllers/Home';
import { expect } from 'chai';

const homeService: any = { exampleFunction: Function };

let sandbox: SinonSandbox;
let controller: HomeController;

describe('HomeController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new HomeController(homeService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns 200 if no errors are returned from service layer', () => {
    const testMessage = 'This Message is returned from the service';
    const homeServiceStub = sandbox.stub(homeService, 'exampleFunction').returns(testMessage);

    const response = controller.get();

    sinon.assert.calledOnce(homeServiceStub);

    expect(response).to.be.an.instanceof(results.JsonResult);
    expect(JSON.parse(response.json)).to.equal(testMessage);
    expect(response.statusCode).to.equal(200);
  });

  it('returns 400 if an unexpected error occurs', () => {
    const expectedErrorMsg = 'Some bs error';
    const homeServiceStub = sandbox
      .stub(homeService, 'exampleFunction')
      .throws(new Error(expectedErrorMsg));

    const response = controller.get();

    sinon.assert.calledOnce(homeServiceStub);

    expect(response).to.be.an.instanceof(results.JsonResult);
    expect(response.json).to.equal(expectedErrorMsg);
    expect(response.statusCode).to.equal(400);
  });
});
