import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { ShippingController } from './../../app/controllers/ShippingController';
import { NotFoundError } from '../../app/errors';

const shippingService: any = {
  createShipment: Function,
  deleteShipment: Function,
  getShippingList: Function,
  updateShipment: Function,
};
const mockShippings = [
  {
    status: 'Packaged',
    _id: '605b6d4adbe91200192f2190',
    company: 'a',
    location: 'montreal',
    shippingDate: '2020-01-01T00:00:00.000Z',
    deliveryDate: '2020-01-01T00:00:00.000Z',
  },
  {
    status: 'Shipped',
    _id: '605b6d4adbe91200192f2191',
    company: 'b',
    location: 'montreal',
    shippingDate: '2020-01-01T00:00:00.000Z',
    deliveryDate: '2020-01-01T00:00:00.000Z',
  },
  {
    status: 'Ordered',
    _id: '605b6d4adbe91200192f2192',
    company: 'a',
    location: 'montreal',
    shippingDate: '2020-01-01T00:00:00.000Z',
    deliveryDate: '2020-01-01T00:00:00.000Z',
  },
];

const mockShipment = {
  status: 'Ordered',
  _id: '605b6d4adbe91200192f2192',
  company: 'a',
  location: 'montreal',
  shippingDate: '2020-01-01T00:00:00.000Z',
  deliveryDate: '2020-01-01T00:00:00.000Z',
};

let sandbox: SinonSandbox;
let controller: ShippingController;

describe('ShippingController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new ShippingController(shippingService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get Shipping List', () => {
    it('should return an array of 3 shipments with a 200 status w', async () => {
      const shippingServiceStub = sandbox
        .stub(shippingService, 'getShippingList')
        .returns(mockShippings);

      const response = await controller.get();
      sinon.assert.calledOnce(shippingServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal(mockShippings);
      expect(response.json.length).to.equal(3);
      expect(response.json).to.deep.include(mockShipment);
      expect(response.statusCode).to.equal(200);
    });
  });
  describe('Delete Shipment', () => {
    it('should delete a shipment with requested body', async () => {
      const mockRequest = {
        body: mockShipment,
      } as Request;

      const shippingServiceStub = sandbox
        .stub(shippingService, 'deleteShipment')
        .returns(mockShipment);

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(shippingServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(shippingServiceStub.calledOnceWith()).to.equal(true);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        status: 'Ordered',
        _id: '605b6d4adbe91200192f2192',
        company: 'a',
        location: 'montreal',
        shippingDate: '2020-01-01T00:00:00.000Z',
        deliveryDate: '2020-01-01T00:00:00.000Z',
      });
    });

    it('should return 404 if invalid shipment id', async () => {
      const mockRequest = {
        body: mockShipment,
      } as Request;

      const expectedErrorMsg = 'Shipment 605b6d4adbe91200192f2192 was not deleted successfully';
      const shippingServiceStub = sandbox
        .stub(shippingService, 'deleteShipment')
        .throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.delete(mockRequest);

      sinon.assert.calledOnce(shippingServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.equal(expectedErrorMsg);
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('Update Shipment', () => {
    it('should update a shipment by id', async () => {
      const mockRequest = {
        body: mockShipment,
      } as Request;

      const shippingServiceStub = sandbox
        .stub(shippingService, 'updateShipment')
        .returns(mockShipment);

      const response = await controller.update(mockRequest);

      sinon.assert.calledOnce(shippingServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        status: 'Ordered',
        _id: '605b6d4adbe91200192f2192',
        company: 'a',
        location: 'montreal',
        shippingDate: '2020-01-01T00:00:00.000Z',
        deliveryDate: '2020-01-01T00:00:00.000Z',
      });
    });

    it('should return 404 if invalid shipment id', async () => {
      const mockRequest = {
        body: mockShipment,
      } as Request;

      const expectedErrorMsg = 'Shipment 605b6d4adbe91200192f2192 was not updated successfully';
      sandbox.stub(shippingService, 'updateShipment').throws(new NotFoundError(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(404);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });

  describe('Create Shipment', () => {
    it('should create a shipment with requested', async () => {
      const mockRequest = {
        body: mockShipment,
      } as Request;

      const shippingServiceStub = sandbox
        .stub(shippingService, 'createShipment')
        .returns(mockShipment);

      const response = await controller.post(mockRequest);

      sinon.assert.calledOnce(shippingServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(200);
      expect(response.json).to.deep.equal({
        status: 'Ordered',
        _id: '605b6d4adbe91200192f2192',
        company: 'a',
        location: 'montreal',
        shippingDate: '2020-01-01T00:00:00.000Z',
        deliveryDate: '2020-01-01T00:00:00.000Z',
      });
    });
  });
});
