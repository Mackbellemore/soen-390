/* global describe it */
import 'reflect-metadata';
import { expect } from 'chai';
import { Request } from 'express';
import { results } from 'inversify-express-utils';
import * as sinon from 'sinon';
import { SinonSandbox } from 'sinon';
import { DefectController } from './../../app/controllers/DefectController';
import { BadRequestError, NotFoundError, ConflictError } from '../../app/errors';

const defectService: any = {
  getDefects: Function,
  createDefect: Function,
  deleteDefects: Function,
};

const mockDefect = {
  id: 1,
  type: 'Broken',
  status: 'Solved',
  description: 'desc',
  partName: 'partName',
};

let sandbox: SinonSandbox;
let controller: DefectController;

describe('DefectController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new DefectController(defectService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET ALL
  describe('Get list request', () => {
    it('Should return a list of defects on success from the service layer', async () => {
      const defectServiceStub = sandbox.stub(defectService, 'getDefects').returns([mockDefect]);

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockDefect]);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const defectServiceStub = sandbox
        .stub(defectService, 'getDefects')
        .throws(new Error('Random defect failure!!!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random defect failure!!!');
    });

    it('Should return a 400 when the service layer throws a BadRequestError', async () => {
      const defectServiceStub = sandbox
        .stub(defectService, 'getDefects')
        .throws(new BadRequestError('Bad Request failure!'));

      const res = await controller.get();

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.deep.equal('Bad Request failure!');
    });
  });

  // POST
  describe('Post Request', async () => {
    it('Should return a defect on success from the service layer', async () => {
      const mockRequest = {
        body: mockDefect,
      } as Request;

      const defectServiceStub = sandbox.stub(defectService, 'createDefect').returns(mockDefect);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith(mockDefect)).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockDefect);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockDefect,
      } as Request;

      const defectServiceStub = sandbox
        .stub(defectService, 'createDefect')
        .throws(new Error('Random Defect failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith(mockDefect)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Defect failure!!');
    });

    it('Should return a 404 when the service layer throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockDefect,
      } as Request;

      const defectServiceStub = sandbox
        .stub(defectService, 'createDefect')
        .throws(new NotFoundError('parName not found!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith(mockDefect)).to.equal(true);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('parName not found!');
    });

    it('Should return a 409 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockDefect,
      } as Request;

      const defectServiceStub = sandbox
        .stub(defectService, 'createDefect')
        .throws(new ConflictError('parName already has a defect!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(defectServiceStub.calledOnceWith(mockDefect)).to.equal(true);
      expect(res.statusCode).to.equal(409);
      expect(res.json).to.deep.equal('parName already has a defect!');
    });
  });

  // DELETE
  describe('Delete Request', async () => {
    it('Should return a 200 with the deleted defect', async () => {
      const mockRequest = {
        body: ['defectId'],
      } as Request;
      sandbox.stub(defectService, 'deleteDefects').returns([mockDefect]);
      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockDefect]);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: ['defectId'],
      } as Request | any;

      sandbox.stub(defectService, 'deleteDefects').throws(new NotFoundError('Not found error'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });

    it('Should throw a 500 when service throws an error', async () => {
      const mockRequest = {
        body: ['defectId'],
      } as Request | any;

      sandbox.stub(defectService, 'deleteDefects').throws(new Error('Random Defect failure!!'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Defect failure!!');
    });
  });
});
