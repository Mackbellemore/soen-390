/* global describe it */
import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { SaleController } from './../../app/controllers/SaleController';
import { BadRequestError, NotFoundError } from '../../app/errors';

const saleService: any = {
  getSales: Function,
  createSale: Function,
  updateSale: Function,
};

const mockSale = {
  bikeId: '60371f4a1997c04822ab5927',
  customerEmail: 'gordon@gordon.com',
  quantity: 1,
  customer: 'Gordon',
  status: 'Placed',
};

let sandbox: SinonSandbox;
let controller: SaleController;

describe('SaleController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new SaleController(saleService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET ALL
  describe('Get all sales', () => {
    it('Should return a list of sales on success from the service layer', async () => {
      const saleServiceStub = sandbox.stub(saleService, 'getSales').returns([mockSale]);

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(saleServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockSale]);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const saleServiceStub = sandbox
        .stub(saleService, 'getSales')
        .throws(new Error('Random sale failure!!!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(saleServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random sale failure!!!');
    });

    it('Should return a 400 when the service layer throws a BadRequestError', async () => {
      const saleServiceStub = sandbox
        .stub(saleService, 'getSales')
        .throws(new BadRequestError('Bad Request failure!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(saleServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.deep.equal('Bad Request failure!');
    });
  });

  // POST
  describe('Create a sale', async () => {
    it('Should return a sale on success from the service layer', async () => {
      const mockRequest = {
        body: mockSale,
      } as Request;

      const saleServiceStub = sandbox.stub(saleService, 'createSale').returns(mockSale);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(saleServiceStub.calledOnceWith(mockSale)).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockSale);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockSale,
      } as Request;

      const saleServiceStub = sandbox
        .stub(saleService, 'createSale')
        .throws(new Error('Random sale failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(saleServiceStub.calledOnceWith(mockSale)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random sale failure!!');
    });

    it('Should return a 404 when the service layer throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockSale,
      } as Request;

      const defectServiceStub = sandbox
        .stub(saleService, 'createSale')
        .throws(new NotFoundError('sale not found!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith(mockSale)).to.equal(true);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('sale not found!');
    });
  });

  // UPDATE
  describe('Update sale', () => {
    it('get a order with requested id', async () => {
      const mockRequest = {
        body: {
          status: 'Cancelled',
          _id: '6054fd89c00ece0245834783',
          bikeId: '60371f4a1997c04822ab5928',
        },
      } as Request | any;

      const saleServiceStub = sandbox.stub(saleService, 'updateSale').returns({
        status: 'Cancelled',
        _id: '6054fd89c00ece0245834783',
        bikeId: '60371f4a1997c04822ab5928',
        customerEmail: 'gordon@gordon.com',
        quantity: 1,
      });

      const response = await controller.update(mockRequest);

      sinon.assert.calledOnce(saleServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        status: 'Cancelled',
        _id: '6054fd89c00ece0245834783',
        bikeId: '60371f4a1997c04822ab5928',
        customerEmail: 'gordon@gordon.com',
        quantity: 1,
      });
    });

    it('Should throw a 500 when service throws an error', async () => {
      const mockRequest = {
        body: {
          status: 'Cancelled',
          _id: '6054fd89c00ece0245834783',
          bikeId: '60371f4a1997c04822ab5928',
        },
      } as Request | any;

      const expectedErrorMsg = 'Some random error';
      const saleServiceStub = sandbox
        .stub(saleService, 'updateSale')
        .returns(mockSale)
        .throws(new Error(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      sinon.assert.calledOnce(saleServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });
});
