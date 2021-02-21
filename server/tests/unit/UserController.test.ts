import 'reflect-metadata';
import { UserController } from './../../app/controllers/UserController';
import * as sinon from 'sinon';
import { results } from 'inversify-express-utils';
import { Request } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';
// import * as authMiddleWare from '../../app/middlewares/authentication';
// import config from 'config';

const userService: any = {
  registerUser: Function,
  loginUser: Function,
  sendEmail: Function,
  getUsers: Function,
};

const mockUser = {
  username: 'test',
  email: 'test@test.com',
  id: 'test',
  role: 'General',
};

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

    //   it('returns a 400 when service layer throws an error', async () => {
    //     const mockRequest = {
    //       body: mockUser,
    //     } as Request;
    //     const userServiceStub = sandbox
    //       .stub(userService, 'registerUser')
    //       .throws(new Error('some bs error'));

    //     const response = await controller.register(mockRequest);

    //     sinon.assert.calledOnce(userServiceStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.deep.equal('some bs error');
    //     expect(response.statusCode).to.equal(400);
    //   });
    // });

    // describe('login endpoint', () => {
    //   it('returns a user with a 200 status when service layer returns a user', async () => {
    //     const mockRequest = {
    //       body: mockUser,
    //     } as Request;

    //     const configStub = sandbox.stub(config, 'get').returns(false);
    //     const userServiceStub = sandbox.stub(userService, 'loginUser').returns(mockUser);

    //     const response = await controller.login(mockRequest);
    //     sinon.assert.calledOnce(userServiceStub);
    //     sinon.assert.calledOnce(configStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.deep.equal({ user: mockUser, jwt: '' });
    //     expect(response.statusCode).to.equal(200);
    //   });

    //   it('returns a 400 status when service layer throws an error', async () => {
    //     const mockRequest = {
    //       body: mockUser,
    //     } as Request;

    //     const userServiceStub = sandbox
    //       .stub(userService, 'loginUser')
    //       .throws(new Error('some bs error'));

    //     const response = await controller.login(mockRequest);
    //     sinon.assert.calledOnce(userServiceStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.deep.equal('some bs error');
    //     expect(response.statusCode).to.equal(400);
    //   });

    //   it('returns json with user and jwt', async () => {
    //     const mockRequest = {
    //       body: mockUser,
    //     } as Request;

    //     sandbox.stub(config, 'get').returns(true);
    //     const userServiceStub = sandbox.stub(userService, 'loginUser').returns(mockUser);
    //     const dummyToken = '12345abcde';

    //     sandbox.stub(authMiddleWare, 'generateToken').returns(dummyToken);

    //     const response = await controller.login(mockRequest);
    //     sinon.assert.calledOnce(userServiceStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.deep.equal({ user: mockUser, jwt: dummyToken });
    //     expect(response.statusCode).to.equal(200);
    //   });
    // });

    // describe('getUsers endpoint', () => {
    //   it('returns an array of Users with a 200 status when service layer returns users', async () => {
    //     const usersArr = [
    //       {
    //         username: 'test',
    //         email: 'test@test.com',
    //         id: 'test',
    //         role: 'General',
    //       },
    //     ];

    //     sandbox.stub(config, 'get').returns(true);
    //     const userServiceStub = sandbox.stub(userService, 'getUsers').returns(usersArr);

    //     const response = await controller.get();

    //     sinon.assert.calledOnce(userServiceStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.deep.equal([
    //       {
    //         username: 'test',
    //         email: 'test@test.com',
    //         id: 'test',
    //         role: 'General',
    //       },
    //     ]);
    //     expect(response.statusCode).to.equal(200);
    //   });

    //   it('returns 400 if an unexpected error occurs', async () => {
    //     const expectedErrorMsg = 'Some error';
    //     const userServiceStub = sandbox
    //       .stub(userService, 'getUsers')
    //       .throws(new Error(expectedErrorMsg));

    //     const response = await controller.get();

    //     sinon.assert.calledOnce(userServiceStub);

    //     expect(response).to.be.an.instanceof(results.JsonResult);
    //     expect(response.json).to.equal(expectedErrorMsg);
    //     expect(response.statusCode).to.equal(400);
    //   });
  });
});
