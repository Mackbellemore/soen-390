import 'reflect-metadata';
import { PartController } from './../../app/controllers/PartController';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { Request } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';
import { BadRequestError, NotFoundError } from '../../app/errors';

const partService: any = {
  get: Function,
  createPart: Function,
  updatePart: Function,
  deletePart: Function,
};

const mockPart = {
  name: 'wheel',
  quality: 'high-quality',
  description: 'Circular frame of hard material that is solid',
  type: 'round',
  color: 'color',
  finish: 'glossy',
  grade: 'aluminum',
  detail: '18inch',
  id: '12312313',
};

let sandbox: SinonSandbox;
let controller: PartController;

describe('Part Controller', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new PartController(partService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET ALL
  describe('Get list request', () => {
    it('Should return a list of parts on success from the service layer', async () => {
      const partServiceStub = sandbox.stub(partService, 'get').returns([mockPart]);

      const res = await controller.get(undefined, undefined);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal([mockPart]);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const partServiceStub = sandbox
        .stub(partService, 'get')
        .throws(new Error('Random part failure!!!'));

      const res = await controller.get(undefined, undefined);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random part failure!!!');
    });

    it('Should return a 400 when the service layer throws a BadRequestError', async () => {
      const partServiceStub = sandbox
        .stub(partService, 'get')
        .throws(new BadRequestError('Bad Request failure!'));

      const res = await controller.get(undefined, undefined);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.deep.equal('Bad Request failure!');
    });
  });

  // Get by NAME
  describe('Get by name Request', () => {
    it('Should return a 200 with a part', async () => {
      const partServiceStub = sandbox.stub(partService, 'get').returns(mockPart);

      const res = await controller.get(undefined, 'wheel');

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockPart);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      sandbox.stub(partService, 'get').throws(new NotFoundError('Not found error'));

      const res = await controller.get(undefined, 'some not found name');

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });
  });

  // Get by ID
  describe('Get by id Request', () => {
    it('Should return a 200 with a part', async () => {
      const partServiceStub = sandbox.stub(partService, 'get').returns(mockPart);

      const res = await controller.get('12312313', undefined);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith()).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockPart);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      sandbox.stub(partService, 'get').throws(new NotFoundError('Not found error'));

      const res = await controller.get('some not found id', undefined);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });
  });

  // POST
  describe('Post Request', async () => {
    it('Should return a part on success from the service layer', async () => {
      const mockRequest = {
        body: mockPart,
      } as Request;

      const partServiceStub = sandbox.stub(partService, 'createPart').returns(mockPart);

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith(mockPart)).to.equal(true);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockPart);
    });

    it('Should return a 500 when the service layer throws an error', async () => {
      const mockRequest = {
        body: mockPart,
      } as Request;

      const partServiceStub = sandbox
        .stub(partService, 'createPart')
        .throws(new Error('Random Part failure!!'));

      const res = await controller.post(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(partServiceStub.calledOnceWith(mockPart)).to.equal(true);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Part failure!!');
    });
  });

  // PATCH
  describe('Patch Request', () => {
    it('Should return a 200 with updated part', async () => {
      const mockRequest = {
        body: mockPart,
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox.stub(partService, 'updatePart').returns(mockPart);

      const res = await controller.patch(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockPart);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        body: mockPart,
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox.stub(partService, 'updatePart').throws(new NotFoundError('Not found error'));

      const res = await controller.patch(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.deep.equal('Not found error');
    });
  });

  // DELETE
  describe('Delete Request', async () => {
    it('Should return a 200 with delete part', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;
      sandbox.stub(partService, 'deletePart').returns(mockPart);
      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(200);
      expect(res.json).to.deep.equal(mockPart);
    });

    it('Should throw a 404 when service throws a NotFoundError', async () => {
      const mockRequest = {
        params: {
          name: 'some not found name',
        },
      } as Request | any;

      sandbox.stub(partService, 'deletePart').throws(new NotFoundError('Not found error'));

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

      sandbox.stub(partService, 'deletePart').throws(new Error('Random Part failure!!'));

      const res = await controller.delete(mockRequest);

      expect(res).to.be.an.instanceof(results.JsonResult);
      expect(res.statusCode).to.equal(500);
      expect(res.json).to.deep.equal('Random Part failure!!');
    });
  });
});
