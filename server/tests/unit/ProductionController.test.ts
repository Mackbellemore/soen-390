import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { ProductionController } from './../../app/controllers/ProductionController';
import { BadRequestError, NotFoundError } from '../../app/errors';

const productionService: any = {
  getProductions: Function,
  createProduction: Function,
  deleteProduction: Function,
  updateProduction: Function,
};

const mockProduction = {
  type: 'Bike',
  componentDetail: {
    name: 'carbon road bike',
    description: 'some_description',
    weightAmount: 5,
    weightType: 'kg',
    color: 'blue',
    parts: {
      handle_bar: '6067e869bb33d1d88855e396',
      wheels: '6067e869bb33d1d88855e397',
      chain: '6067e869bb33d1d88855e398',
      frame: '6067e869bb33d1d88855e399',
      pedal: '6067e869bb33d1d88855e39a',
      brakes: '6067e869bb33d1d88855e39b',
      seat: '6067e869bb33d1d88855e39c',
      fork: '6067e869bb33d1d88855e39d',
    },
  },
  status: 'Ongoing',
  quantity: 2,
  startDate: '2021-01-01',
  endDate: '2021-01-03',
  assemblyMachine: 'A',
  note: 'B',
};

let sandbox: SinonSandbox;
let controller: ProductionController;

describe('ProductionController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new ProductionController(productionService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET All
  describe('Get All Request', () => {
    it('returns an empty array with a 200 status when service layer returns empty array', async () => {
      const productionServiceStub = sandbox.stub(productionService, 'getProductions').returns([]);

      const response = await controller.get();

      sinon.assert.calledOnce(productionServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns a an array of productions with a 200 status when service layer returns a production', async () => {
      const productionArray = [mockProduction];

      const productionServiceStub = sandbox
        .stub(productionService, 'getProductions')
        .returns(productionArray);

      const response = await controller.get();

      sinon.assert.calledOnce(productionServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([mockProduction]);
      expect(response.statusCode).to.equal(200);
    });

    it('Should return a 400 when the service layer throws a BadRequestError', async () => {
      const productionServiceStub = sandbox
        .stub(productionService, 'getProductions')
        .throws(new BadRequestError('Bad Request failure!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(productionServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.deep.equal('Bad Request failure!');
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const productionServiceStub = sandbox
        .stub(productionService, 'getProductions')
        .throws(new Error('Random production failure!!!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(productionServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random production failure!!!');
    });
  });

  // POST
  describe('Post Request', async () => {
    it('Should return a production on success from the service layer', async () => {
      const mockRequest = {
        body: mockProduction,
      } as Request;

      const productionServiceStub = sandbox
        .stub(productionService, 'createProduction')
        .returns(mockProduction);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(productionServiceStub.calledOnceWith(mockProduction)).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockProduction);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockProduction,
      } as Request;

      const productionServiceStub = sandbox
        .stub(productionService, 'createProduction')
        .throws(new Error('Random Production failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(productionServiceStub.calledOnceWith(mockProduction)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Production failure!!');
    });
  });

  // PATCH
  describe('Patch Request', () => {
    it('Should return a 200 with updated production', async () => {
      const mockRequest = {
        body: { status: 'Idle' },
        params: { id: '123' },
      } as Request | any;

      sandbox.stub(productionService, 'updateProduction').returns(mockProduction);

      const res = await controller.update(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockProduction);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: { status: 'Idle' },
        params: { id: '123' },
      } as Request | any;
      sandbox
        .stub(productionService, 'updateProduction')
        .throws(new NotFoundError('Not found error'));

      const res = await controller.update(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });
  });

  // DELETE
  describe('Delete Request', async () => {
    it('Should return a 200 with delete production', async () => {
      const mockRequest = {
        params: { id: '123' },
      } as Request | any;
      sandbox.stub(productionService, 'deleteProduction').returns(mockProduction);
      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockProduction);
    });
  });

  it('Should throw a 404 when service throws a NotFoundError', async () => {
    const mockRequest = {
      params: { id: '123' },
    } as Request | any;

    sandbox
      .stub(productionService, 'deleteProduction')
      .throws(new NotFoundError('Not found error'));

    const res = await controller.delete(mockRequest);

    expect(res).to.be.an.instanceof(results.JsonResult);
    expect(res.statusCode).to.equal(404);
    expect(res.json).to.deep.equal('Not found error');
  });

  it('Should throw a 500 when service throws an error', async () => {
    const mockRequest = {
      params: { id: '123' },
    } as Request | any;

    sandbox
      .stub(productionService, 'deleteProduction')
      .throws(new Error('Random Production failure!!'));

    const res = await controller.delete(mockRequest);

    expect(res).to.be.an.instanceof(results.JsonResult);
    expect(res.statusCode).to.equal(500);
    expect(res.json).to.deep.equal('Random Production failure!!');
  });
});
