import 'reflect-metadata';
import supertest from 'supertest';
import { expect, assert } from 'chai';
import { AppTest } from '../utils/AppTest';
import { App } from '../../app/App';
import { seedMongo } from '../utils/MongoSeeder';

describe('User controller', () => {
  let app: App;

  const postBody = {
    username: 'mackbellemoreTest2',
    email: 'mack@mack.com',
    password: 'SomeSecurePassword123!',
    role: 'Admin',
    approved: true,
  };

  const expectedUserRes = {
    approved: true,
    email: 'mack@mack.com',
    role: 'Admin',
    username: 'mackbellemoreTest2',
  };

  before(async () => {
    app = await AppTest.init();
    await seedMongo();
  });

  after(async () => {
    await app.close();
  });

  describe('GET /user/authCheck', () => {
    it('returns a 200 when auth is disabled', async () => {
      const res = await supertest(app.server).get('/user/authCheck');
      expect(res.status).to.be.equal(200);
    });
  });

  describe('POST /user/register', () => {
    it('returns a 200 with user when proper body is passed', async () => {
      const res = await supertest(app.server).post('/user/register').send(postBody);
      expect(res.status).to.be.equal(200);
      assert(res.body.id);
      // delete id since its impossible to assert on a random mongo uuid
      delete res.body.id;

      expect(res.body).to.deep.equal(expectedUserRes);
    });
  });

  describe('POST /user/login', () => {
    it('returns a 200 with user when proper password and email match in db', async () => {
      const res = await supertest(app.server).post('/user/login').send({
        email: postBody.email,
        password: postBody.password,
      });

      delete res.body.user.id;
      delete res.body.jwt;
      expect(res.body).to.deep.equal({
        user: expectedUserRes,
      });
      expect(res.status).to.be.equal(200);
    });
  });
});
