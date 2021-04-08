/* global describe it */
import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { MachineController } from './../../app/controllers/MachineController';
import { BadRequestError, NotFoundError } from '../../app/errors';

const machineService: any = {
  getMachines: Function,
  createMachine: Function,
  deleteMachine: Function,
  getByMachineName: Function,
};

const mockMachine = {
  id: 1,
  machineName: 'monster',
  status: 'Active',
};

let sandbox: SinonSandbox;
let controller: MachineController;

describe('MachineController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new MachineController(machineService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET ALL
  describe('Get list request', () => {
    it('Should return a list of machines on success from the service layer', async () => {
      const machineServiceStub = sandbox.stub(machineService, 'getMachines').returns([mockMachine]);

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockMachine]);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const machineServiceStub = sandbox
        .stub(machineService, 'getMachines')
        .throws(new Error('Random machine failure!!!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random machine failure!!!');
    });

    it('Should return a 400 when the service layer throws a BadRequestError', async () => {
      const machineServiceStub = sandbox
        .stub(machineService, 'getMachines')
        .throws(new BadRequestError('Bad Request failure!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.deep.equal('Bad Request failure!');
    });
  });

  // POST
  describe('Post Request', async () => {
    it('Should return a machine on success from the service layer', async () => {
      const mockRequest = {
        body: mockMachine,
      } as Request;

      const machineServiceStub = sandbox.stub(machineService, 'createMachine').returns(mockMachine);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith(mockMachine)).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockMachine);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockMachine,
      } as Request;

      const machineServiceStub = sandbox
        .stub(machineService, 'createMachine')
        .throws(new Error('Random Machine failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith(mockMachine)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Machine failure!!');
    });

    it('Should return a 404 when the service layer throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockMachine,
      } as Request;

      const machineServiceStub = sandbox
        .stub(machineService, 'createMachine')
        .throws(new NotFoundError('machine not found!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith(mockMachine)).to.equal(true);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('machine not found!');
    });
  });

  // DELETE
  describe('Delete Request', async () => {
    it('Should return a 200 with the deleted machine', async () => {
      const mockRequest = {
        body: ['machineId'],
      } as Request;
      sandbox.stub(machineService, 'deleteMachine').returns([mockMachine]);
      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockMachine]);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: ['machineId'],
      } as Request | any;

      sandbox.stub(machineService, 'deleteMachine').throws(new NotFoundError('Not found error'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });

    it('Should throw a 500 when service throws an error', async () => {
      const mockRequest = {
        body: ['machineId'],
      } as Request | any;

      sandbox.stub(machineService, 'deleteMachine').throws(new Error('Random Machine failure!!'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Machine failure!!');
    });
  });

  // Get by name
  describe('Get by name Request', () => {
    it('Should return a 200 with a machine', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      const machineServiceStub = sandbox
        .stub(machineService, 'getByMachineName')
        .returns(mockMachine);

      const res = await controller.getByMachineName(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(machineServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockMachine);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox
        .stub(machineService, 'getByMachineName')
        .throws(new NotFoundError('Not found error gang'));

      const res = await controller.getByMachineName(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error gang');
    });
  });
});
