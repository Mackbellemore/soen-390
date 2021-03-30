import 'reflect-metadata';
import { expect } from 'chai';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { LogController } from './../../app/controllers/LogController';
import { Request } from 'express';

const logService: any = {
  getLogs: Function,
  addLog: Function,
};
const mockLog = {
  action: 'Created a bike',
  date: 'some date string',
  mongoCollection: 'bikes',
  email: 'mack@mack.mack',
};

let sandbox: SinonSandbox;
let controller: LogController;

describe('LogController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new LogController(logService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Post Endpoint', () => {
    it('creates a log success', async () => {
      const mockRequest = {
        body: mockLog,
      } as Request;

      const logServiceStub = sandbox.stub(logService, 'addLog');
      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(logServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockLog,
      } as Request;

      const logServiceStub = sandbox.stub(logService, 'addLog').throws(new Error('some bs error'));
      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(logServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal('some bs error');
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('Get /logs endpoint', () => {
    it('returns an empty array with a 200 status when service layer returns empty array', async () => {
      const logServiceStub = sandbox.stub(logService, 'getLogs').returns([]);

      const response = await controller.get();

      sinon.assert.calledOnce(logServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns a an array of Logs with a 200 status when service layer returns a log', async () => {
      const logArray = [mockLog];
      const logServiceStub = sandbox.stub(logService, 'getLogs').returns(logArray);

      const response = await controller.get();

      sinon.assert.calledOnce(logServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([mockLog]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const expectedErrorMsg = 'Some bs error';
      const logServiceStub = sandbox
        .stub(logService, 'getLogs')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.get();

      sinon.assert.calledOnce(logServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
    });
  });
});
