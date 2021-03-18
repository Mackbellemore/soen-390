import 'reflect-metadata';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { Request } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';
import { NotFoundError } from '../../app/errors';
import { SchedulingController } from './../../app/controllers/SchedulingController';
import { IScheduling } from '../../app/models/SchedulingModel';
import SchedulingEntity from '../../app/entities/Scheduling';

const schedulingService: any = {
  getSchedulings: Function,
  createScheduling: Function,
  updateScheduling: Function,
  deleteScheduling: Function,
  findById: Function,
};

const mockScheduling = ({
  name: 'wheel',
  quantity: 100,
  cost: 50,
  operatingTime: 'January 1, 1970 00:00:00 UTC',
  id: '12312313',
} as unknown) as IScheduling;

let sandbox: SinonSandbox;
let controller: SchedulingController;

describe('Scheduling Controller', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new SchedulingController(schedulingService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET ALL
  describe('Get list request', () => {
    it('Should return a list of schedules on success from the service layer', async () => {
      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'getSchedulings')
        .returns([mockScheduling]);

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      sinon.assert.calledOnce(schedulingServiceStub);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockScheduling]);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'getSchedulings')
        .throws(new Error('Random scheduling failure!!!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      sinon.assert.calledOnce(schedulingServiceStub);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random scheduling failure!!!');
    });
  });

  // Get by id
  describe('Get by id Request', () => {
    it('Should return a 200 with a scheduling', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'findById')
        .returns(mockScheduling);

      const res = await controller.getById(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      sinon.assert.calledOnce(schedulingServiceStub);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockScheduling);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        params: {
          id: '12312313',
        },
      } as Request | any;

      const expectedErrorMsg = 'Not found error gang';

      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'findById')
        .throws(new NotFoundError(expectedErrorMsg));

      const res = await controller.getById(mockRequest);

      sinon.assert.calledOnce(schedulingServiceStub);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.equal(expectedErrorMsg);
    });
  });

  // POST
  describe('Post Request', async () => {
    it('Should return a scheduling on success from the service layer', async () => {
      const mockRequest = {
        body: mockScheduling,
      } as Request;

      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'createScheduling')
        .returns(mockScheduling);
      sandbox.stub(SchedulingEntity, 'validate').resolves(mockScheduling);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      sinon.assert.calledOnce(schedulingServiceStub);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockScheduling);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockScheduling,
      } as Request;

      sandbox.stub(SchedulingEntity, 'validate').resolves(mockScheduling);
      const schedulingServiceStub = sandbox
        .stub(schedulingService, 'createScheduling')
        .throws(new Error('Random scheduling failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(schedulingServiceStub.calledOnceWith(mockScheduling)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random scheduling failure!!');
    });
  });

  // PATCH
  describe('Patch Request', () => {
    it('Should return a 200 with updated scheduling', async () => {
      const mockRequest = {
        body: mockScheduling,
        params: {
          name: 'wheel',
        },
      } as Request | any;

      sandbox.stub(SchedulingEntity, 'validate').resolves(mockScheduling);
      sandbox.stub(schedulingService, 'updateScheduling').returns(mockScheduling);

      const res = await controller.update(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockScheduling);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockScheduling,
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox.stub(SchedulingEntity, 'validate').resolves(mockScheduling);
      sandbox
        .stub(schedulingService, 'updateScheduling')
        .throws(new NotFoundError('Not found error'));

      const res = await controller.update(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });

    it('returns 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        body: mockScheduling,
        params: {
          id: '12312313',
        },
      } as Request | any;

      sandbox.stub(SchedulingEntity, 'validate').resolves(mockScheduling);

      const expectedErrorMsg = 'Some test error';
      sandbox.stub(schedulingService, 'updateScheduling').throws(new Error(expectedErrorMsg));

      const response = await controller.update(mockRequest);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.statusCode).to.equal(500);
      expect(response.json).to.equal(expectedErrorMsg);
    });
  });

  // DELETE
  describe('Delete Request', async () => {
    it('Should return a 200 with delete scheduling', async () => {
      const mockRequest = {
        params: {
          name: 'wheel',
        },
      } as Request | any;
      sandbox.stub(schedulingService, 'deleteScheduling').returns(mockScheduling);
      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockScheduling);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox
        .stub(schedulingService, 'deleteScheduling')
        .throws(new NotFoundError('Not found error'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });

    it('Should throw a 500 when service throws an error', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox
        .stub(schedulingService, 'deleteScheduling')
        .throws(new Error('Random Scheduling failure!!'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Scheduling failure!!');
    });
  });
});
