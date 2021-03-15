import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { OrderController } from './../../app/controllers/OrderController';
import { NotApprovedError, NotFoundError } from '../../app/errors';
import { materialCost } from '../../app/entities/Material';

const orderService: any = {
  getOrders: Function,
  createOrder: Function,
  deleteOrder: Function,
  updateOrder: Function,
  findById: Function,
  approveOrder: Function,
};
const mockOrder = {
  materialType: 'steel',
  cost: 1000,
  quantity: 100,
  manufacturerName: 'Joe',
  deliveryDate: '2020-02-21',
  orderDate: '2020-02-20',
  id: '12312313',
  status: 'Pending',
  vendorLocation: 'My house',
  note: 'blabla',
};

const mockOrderApproved = {
  materialType: 'steel',
  cost: 1000,
  quantity: 100,
  manufacturerName: 'Joe',
  deliveryDate: '2020-02-21',
  orderDate: '2020-02-20',
  id: '12312313',
  status: 'Approved',
  vendorLocation: 'My house',
  note: 'blabla',
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
          materialType: 'steel',
          cost: 1000,
          quantity: 100,
          manufacturerName: 'Joe',
          deliveryDate: '2020-02-21',
          orderDate: '2020-02-20',
          id: '12312313',
          status: 'Pending',
          vendorLocation: 'My house',
          note: 'blabla',
        },
      ];
      const orderServiceStub = sandbox.stub(orderService, 'getOrders').returns(mockArr);

      const response = await controller.get();

      sinon.assert.calledOnce(orderServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal([
        {
          materialType: 'steel',
          cost: 1000,
          quantity: 100,
          manufacturerName: 'Joe',
          deliveryDate: '2020-02-21',
          orderDate: '2020-02-20',
          id: '12312313',
          status: 'Pending',
          vendorLocation: 'My house',
          note: 'blabla',
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
        materialType: 'steel',
        cost: 1000,
        quantity: 100,
        manufacturerName: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
        status: 'Pending',
        vendorLocation: 'My house',
        note: 'blabla',
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
        materialType: 'steel',
        cost: 1000,
        quantity: 100,
        manufacturerName: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
        status: 'Pending',
        vendorLocation: 'My house',
        note: 'blabla',
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
        materialType: 'steel',
        cost: 1000,
        quantity: 100,
        manufacturerName: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
        status: 'Pending',
        vendorLocation: 'My house',
        note: 'blabla',
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

  describe('getMaterialList', () => {
    it('Should get list of materials that can be ordered', async () => {
      const res = await controller.getMaterialList();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(materialCost);
    });
  });

  describe('approved', () => {
    it('Approves an order with associated body', async () => {
      const mockRequest = {
        body: mockOrderApproved,
        params: {
          id: '12312313',
        },
      } as Request | any;

      sandbox.stub(orderService, 'approveOrder').returns(mockOrderApproved);

      const response = await controller.approve(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        materialType: 'steel',
        cost: 1000,
        quantity: 100,
        manufacturerName: 'Joe',
        deliveryDate: '2020-02-21',
        orderDate: '2020-02-20',
        id: '12312313',
        status: 'Approved',
        vendorLocation: 'My house',
        note: 'blabla',
      });
    });

    it('returns 500 if an order is not approved', async () => {
      const mockRequest = {
        body: mockOrderApproved,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Order not approved';
      sandbox.stub(orderService, 'approveOrder').throws(new NotApprovedError(expectedErrorMsg));

      const response = await controller.approve(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });

    it('returns 404 if an order is not approved', async () => {
      const mockRequest = {
        body: mockOrderApproved,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Order not found';
      sandbox.stub(orderService, 'approveOrder').throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.approve(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(404);
      expect(response.json).to.equal(expectedErrorMsg);
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockOrderApproved,
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Some test error';
      sandbox.stub(orderService, 'approveOrder').throws(new Error(expectedErrorMsg));

      const response = await controller.approve(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });
});
