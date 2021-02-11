import 'reflect-metadata';
import { SystemController } from './../../app/controllers/SystemController';
import * as sinon from 'sinon';
import { Request } from 'express';
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';

const systemService: any = { sendEmail: Function };

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
let controller: SystemController;

describe('SystemController', () => {
  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    controller = new SystemController(systemService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('test send email endpoint', () => {
    it('Send email successfully', async () => {
      const mockRequest = {
        body: mockRealUser,
      } as Request;

      const userServiceStub = sandbox
        .stub(systemService, 'sendEmail')
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
        .stub(systemService, 'sendEmail')
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
