const request = require('supertest');
const jwt = require('jsonwebtoken');
const chance = require('chance').Chance();
const knex = require('knex');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/users';

const email = chance.email({ domain: 'gmail.com' });
const name = chance.name({ middle: true });
const secret = 'segredosupersecreto';

let user;

describe('Testes de rotas de usuário!', () => {
  beforeAll(() => {
    return app.db.raw('TRUNCATE TABLE users CASCADE');
  });

  beforeAll(async () => {
    const res = await app.services.userServices.save({
      name,
      email: chance.email({ domain: 'gmail' }),
      passwd: '123456',
    });

    user = { ...res[0] };
    user.token = jwt.sign(user, secret);
  });

  test('Deve listar todos os usuários', () => {
    return request(app)
      .get(MAIN_ROUTE)
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  test('Deve inserir usuário com sucesso', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Walter Mitty',
        email,
        passwd: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Walter Mitty');
        expect(res.body).not.toHaveProperty('passwd');
      });
  });

  test('Deve armazenar senha criptografada', async () => {
    const res = await request(app)
      .post(MAIN_ROUTE)
      .send({
        name: 'Walter Mitty',
        email: `${Date.now()}@gmail.com`,
        passwd: '123456',
      })
      .set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(201);

    const { id } = res.body;
    const [userDb] = await app.services.userServices.findOne({ id });
    expect(userDb.passwd).not.toBeUndefined();
    expect(userDb.passwd).not.toBe('123456');
  });

  test('Não deve inserir usuário sem nome', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        email,
        passwd: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Nome é um atributo obrigatório');
      });
  });

  test('Não deve inserir usuário sem email', async () => {
    const result = await request(app)
      .post(MAIN_ROUTE)
      .send({ name, passwd: '123456' })
      .set('authorization', `bearer ${user.token}`);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email é um atributo obrigatório');
  });

  test('Não deve inserir usuário sem senha', (done) => {
    request(app)
      .post(MAIN_ROUTE)
      .send({ name, email })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Senha é um atributo obrigatório');
        done();
      });
  });

  test('Não deve inserir usuário com email existente', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({
        name,
        email,
        passwd: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Já existe um usuário com este email');
      });
  });
});
