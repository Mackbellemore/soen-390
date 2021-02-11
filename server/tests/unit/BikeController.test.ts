import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { BikeController } from './../../app/controllers/BikeController';
import { NotFoundError } from '../../app/errors';

const bikeService: any = {
  getBikes: Function,
  createBike: Function,
  deleteBike: Function,
  updateBike: Function,
  findById: Function,
};
const mockBike = {
  description: 'test',
  color: 'green',
  weightAmount: 69,
  id: '12312313',
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

  describe('Get All Endpoint', () => {
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
          weightAmount: 3,
          id: '12312313',
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
          weightAmount: 3,
          id: '12312313',
        },
      ]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const expectedErrorMsg = 'Some bs error';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'getBikes')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.get();

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
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

    it('returns 500 if an unexpected error occurs', async () => {
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
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('Delete Endpoint', () => {
    it('delete a bike with requested body', async () => {
      const mockRequest = {
        body: mockBike,
      } as Request;

      const bikeServiceStub = sandbox.stub(bikeService, 'deleteBike').returns(mockBike);

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(bikeServiceStub.calledOnceWith()).to.equal(true);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        description: 'test',
        color: 'green',
        weightAmount: 69,
        id: '12312313',
      });
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockBike,
      } as Request;

      const expectedErrorMsg = 'Some test error';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'deleteBike')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockBike,
      } as Request;

      const expectedErrorMsg = 'Not found error gang';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'deleteBike')
        .throws(new NotFoundError(expectedErrorMsg));

      const res = await controller.delete(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.equal(expectedErrorMsg);
    });
  });

  describe('Update Endpoint', () => {
    it('update a bike with requested body', async () => {
      const mockRequest = {
        body: mockBike,
        params: {
          id: '12312313',
        },
      } as Request | any;

      sandbox.stub(bikeService, 'updateBike').returns(mockBike);

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        description: 'test',
        color: 'green',
        weightAmount: 69,
        id: '12312313',
      });
    });

    it('returns 404 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockBike,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Cannot find';
      sandbox.stub(bikeService, 'updateBike').throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(404);
      expect(response.json).to.equal(expectedErrorMsg);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockBike,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Some test error';
      sandbox.stub(bikeService, 'updateBike').throws(new Error(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });

  describe('Update Endpoint', () => {
    it('get a bike with requested id', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const bikeServiceStub = sandbox.stub(bikeService, 'findById').returns(mockBike);

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        description: 'test',
        color: 'green',
        weightAmount: 69,
        id: '12312313',
      });
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Not found error gang';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'findById')
        .returns(mockBike)
        .throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(404);
      expect(response.json).to.equal(expectedErrorMsg);
    });

    it('Should throw a 500 when service throws an error', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Some random error';
      const bikeServiceStub = sandbox
        .stub(bikeService, 'findById')
        .returns(mockBike)
        .throws(new Error(expectedErrorMsg));

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(bikeServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });
});
