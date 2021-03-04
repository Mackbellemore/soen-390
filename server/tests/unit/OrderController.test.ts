import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { OrderController } from './../../app/controllers/OrderController';
import { NotFoundError } from '../../app/errors';

const orderService: any = {
  getOrders: Function,
  createOrder: Function,
  deleteOrder: Function,
  updateOrder: Function,
  findById: Function,
};
const mockOrder = {
  componentName: 'Frame',
  option1: 'Color Red',
  option2: 'Size 30cm',
  quantity: 100,
  cost: 1000,
  manufacture: 'Joe',
  deliveryDate: '2020-02-21',
  orderDate: '2020-02-20',
  id: '12312313',
};

let sandbox: SinonSandbox;
let controller: OrderController;

describe('OrderController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new OrderController(orderService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get All Endpoint', () => {
    it('returns an empty array with a 200 status when service layer returns empty array', async () => {
      const orderServiceStub = sandbox.stub(orderService, 'getOrders').returns([]);

      const response = await controller.get();

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns an array of Orders with a 200 status when service layer returns an order', async () => {
      const mockArr = [
        {
          componentName: 'Frame',
          option1: 'Color Red',
          option2: 'Size 30cm',
          quantity: 100,
          cost: 1000,
          manufacture: 'Joe',
          deliveryDate: '2020-02-21',
          orderDate: '2020-02-20',
          id: '12312313',
        },
      ];
      const orderServiceStub = sandbox.stub(orderService, 'getOrders').returns(mockArr);

      const response = await controller.get();

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([
        {
          componentName: 'Frame',
          option1: 'Color Red',
          option2: 'Size 30cm',
          quantity: 100,
          cost: 1000,
          manufacture: 'Joe',
          deliveryDate: '2020-02-21',
          orderDate: '2020-02-20',
          id: '12312313',
        },
      ]);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const expectedErrorMsg = 'Some bs error';
      const orderServiceStub = sandbox
        .stub(orderService, 'getOrders')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.get();

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('Post Endpoint', () => {
    it('creates a order with a request body', async () => {
      const mockRequest = {
        body: mockOrder,
      } as Request;

      const orderServiceStub = sandbox.stub(orderService, 'createOrder').returns(mockOrder);

      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal(mockOrder);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockOrder,
      } as Request;

      const expectedErrorMsg = 'Some test error';
      const orderServiceStub = sandbox
        .stub(orderService, 'createOrder')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
    });
  });

  describe('Delete Endpoint', () => {
    it('delete an order with requested body', async () => {
      const mockRequest = {
        body: mockOrder,
      } as Request;

      const orderServiceStub = sandbox.stub(orderService, 'deleteOrder').returns(mockOrder);

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(orderServiceStub.calledOnceWith()).to.equal(true);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        componentName: 'Frame',
        option1: 'Color Red',
        option2: 'Size 30cm',
        quantity: 100,
        cost: 1000,
        manufacture: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
      });
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockOrder,
      } as Request;

      const expectedErrorMsg = 'Some test error';
      const orderServiceStub = sandbox
        .stub(orderService, 'deleteOrder')
        .throws(new Error(expectedErrorMsg));

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(500);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockOrder,
      } as Request;

      const expectedErrorMsg = 'Not found error gang';
      const orderServiceStub = sandbox
        .stub(orderService, 'deleteOrder')
        .throws(new NotFoundError(expectedErrorMsg));

      const res = await controller.delete(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.equal(expectedErrorMsg);
    });
  });

  describe('Update Endpoint', () => {
    it('update a order with requested body', async () => {
      const mockRequest = {
        body: mockOrder,
        params: {
          id: '12312313',
        },
      } as Request | any;

      sandbox.stub(orderService, 'updateOrder').returns(mockOrder);

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        componentName: 'Frame',
        option1: 'Color Red',
        option2: 'Size 30cm',
        quantity: 100,
        cost: 1000,
        manufacture: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
      });
    });

    it('returns 404 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockOrder,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Cannot find';
      sandbox.stub(orderService, 'updateOrder').throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(404);
      expect(response.json).to.equal(expectedErrorMsg);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockOrder,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Some test error';
      sandbox.stub(orderService, 'updateOrder').throws(new Error(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });

  describe('Update Endpoint', () => {
    it('get a order with requested id', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const orderServiceStub = sandbox.stub(orderService, 'findById').returns(mockOrder);

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        componentName: 'Frame',
        option1: 'Color Red',
        option2: 'Size 30cm',
        quantity: 100,
        cost: 1000,
        manufacture: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
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
      const orderServiceStub = sandbox
        .stub(orderService, 'findById')
        .returns(mockOrder)
        .throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

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
      const orderServiceStub = sandbox
        .stub(orderService, 'findById')
        .returns(mockOrder)
        .throws(new Error(expectedErrorMsg));

      const response = await controller.getById(mockRequest);

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });
});
