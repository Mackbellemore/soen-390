import 'reflect-metadata';
import { BikeController } from './../../app/controllers/BikeController';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { Request } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';

const bikeService: any = { getBikes: Function, createBike: Function };
const mockBike = {
  description: 'test',
  color: 'green',
  weight: 69,
};

let sandbox: SinonSandbox;
let controller: BikeController;

describe('BikeController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new BikeController(bikeService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get Endpoint', () => {
    it('returns an empty array with a 200 status when service layer returns empty array', async () => {
      const bikeServiceStub = sandbox.stub(bikeService, 'getBikes').returns([]);

      const response = await controller.get();

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns a an array of Bikes with a 200 status when service layer returns a bike', async () => {
      const bikeArr = [
        {
          description: 'test',
          color: 'test',
          weight: 3,
        },
      ];
      const bikeServiceStub = sandbox.stub(bikeService, 'getBikes').returns(bikeArr);

      const response = await controller.get();

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([
        {
          description: 'test',
          color: 'test',
          weight: 3,
        },
      ]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 400 if an unexpected error occurs', async () => {
      const expectedErrorMsg = 'Some bs error';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'getBikes')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.get();

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('Post Endpoint', () => {
    it('creates a bike with a request body', async () => {
      const mockRequest = {
        body: mockBike,
      } as Request;

      const bikeServiceStub = sandbox.stub(bikeService, 'createBike').returns(mockBike);

      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal(mockBike);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 400 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockBike,
      } as Request;

      const expectedErrorMsg = 'Some test error';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'createBike')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(400);
    });
  });
});
