import 'reflect-metadata';
import { UserController } from './../../app/controllers/UserController';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';
import * as authMiddleWare from '../../app/middlewares/authentication';
import config from 'config';

const userService: any = { registerUser: Function, loginUser: Function, sendEmail: Function };

const mockUser = {
  username: 'test',
  email: 'test@test.com',
  id: 'test',
};

const mockRealUser = {
  to: ['soen390.team07@gmail.com'],
  subject: 'unit test',
  emailBody: 'testing ...',
};

const mockValidEmailResponse = {
  accepted: ['soen390.team07@gmail.com'],
  rejected: [],
  envelopeTime: 261,
  messageTime: 553,
  messageSize: 310,
  response: '250 2.0.0 OK  1612980487 p16sm1761093qtq.24 - gsmtp',
  envelope: {
    from: 'soen390.team07@gmail.com',
    to: ['soen390.team07@gmail.com'],
  },
  messageId: '<8a42ee24-f4a2-936b-e8e2-714dd76d34b8@gmail.com>',
};

const mockInvalidEmailResponse =
  "Can't send mail - all recipients were rejected: 553-5.1.3 The recipient address <soen390.team07@.com> is not a valid RFC-5321\n553 5.1.3 address. m64sm1983689qkb.90 - gsmtp";

let sandbox: SinonSandbox;
let controller: UserController;

describe('UserController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new UserController(userService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('register endpoint', () => {
    it('returns a user with a 200 status when service layer returns a user', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;
      const userServiceStub = sandbox.stub(userService, 'registerUser').returns(mockUser);

      const response = await controller.register(mockRequest);

      sinon.assert.calledOnce(userServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal(mockUser);
      expect(response.statusCode).to.equal(200);
    });

    it('returns a 400 when service layer throws an error', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;
      const userServiceStub = sandbox
        .stub(userService, 'registerUser')
        .throws(new Error('some bs error'));

      const response = await controller.register(mockRequest);

      sinon.assert.calledOnce(userServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal('some bs error');
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('login endpoint', () => {
    it('returns a user with a 200 status when service layer returns a user', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;
      const mockResponse = {} as Response;

      const configStub = sandbox.stub(config, 'get').returns(false);
      const userServiceStub = sandbox.stub(userService, 'loginUser').returns(mockUser);

      const response = await controller.login(mockRequest, mockResponse);
      sinon.assert.calledOnce(userServiceStub);
      sinon.assert.calledOnce(configStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal({ user: mockUser });
      expect(response.statusCode).to.equal(200);
    });

    it('returns returns a 400 status when service layer throws an error', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;
      const mockResponse = {} as Response;

      const userServiceStub = sandbox
        .stub(userService, 'loginUser')
        .throws(new Error('some bs error'));

      const response = await controller.login(mockRequest, mockResponse);
      sinon.assert.calledOnce(userServiceStub);

      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal('some bs error');
      expect(response.statusCode).to.equal(400);
    });

    it('returns returns cookie with a token when auth is enabled', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;
      const mockResponse = { cookie: sinon.spy() } as any;

      sandbox.stub(config, 'get').returns(true);
      const userServiceStub = sandbox.stub(userService, 'loginUser').returns(mockUser);
      const dummyToken = '12345abcde';

      sandbox.stub(authMiddleWare, 'generateToken').returns(dummyToken);

      const response = await controller.login(mockRequest, mockResponse);
      sinon.assert.calledOnce(userServiceStub);

      expect(mockResponse.cookie.calledWith('jwt', dummyToken, { httpOnly: true }));
      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal({ user: mockUser });
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('test send email endpoint', () => {
    it('Send email successfully', async () => {
      const mockRequest = {
        body: mockRealUser,
      } as Request;

      const userServiceStub = sandbox
        .stub(userService, 'sendEmail')
        .returns(mockValidEmailResponse);
      const response = await controller.email(mockRequest);
      sinon.assert.calledOnce(userServiceStub);

      expect(response.json).to.have.property('response');
      expect(response.json).to.have.property('messageId');
      expect(response.statusCode).to.equal(200);
    });

    it('Send email unsuccessfully', async () => {
      const mockRequest = {
        body: mockRealUser,
      } as Request;

      const userServiceStub = sandbox
        .stub(userService, 'sendEmail')
        .throws(new Error(mockInvalidEmailResponse));
      const response = await controller.email(mockRequest);
      sinon.assert.calledOnce(userServiceStub);

      expect(response.json).to.not.have.property('response');
      expect(response.json).to.not.have.property('messageId');
      expect(response.json).to.be.string("Can't send mail");
      expect(response.statusCode).to.equal(400);
    });
  });
});
