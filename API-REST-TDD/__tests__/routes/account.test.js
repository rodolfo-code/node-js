const request = require('supertest');
const chance = require('chance').Chance();
const jwt = require('jsonwebtoken');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/accounts';

const name = chance.name({ middle: true });
const secret = 'segredosupersecreto';
let user;
let user2;

describe('Testes de rotas de contas', () => {
  beforeAll(() => {
    // app.db('accounts').truncate();
    return app.db.raw('TRUNCATE TABLE users, accounts CASCADE');
  });

  beforeEach(async () => {
    const res = await app.services.userServices.save({
      name: 'User account 1',
      email: chance.email(),
      passwd: '123456',
    });

    user = { ...res[0] };
    user.token = jwt.sign(user, secret);

    const res2 = await app.services.userServices.save({
      name: 'User account 2',
      email: chance.email(),
      passwd: '123456',
    });

    user2 = { ...res2[0] };
  });

  test('Deve inserir uma conta com sucesso', async () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({ name: 'Acc #1' })
      .set('authorization', `bearer ${user.token}`)
      .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body.name).toBe('Acc #1');
      });
  });

  test('Não deve inserir uma conta sem nome', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .send({})
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Nome é um atributo obrigatório');
      });
  });

  test.skip('Não deve inserir conta com nome já existente para o mesmo usuário', () => {});

  test('Deve listar apenas contas do usuário', () => {
    return app
      .db('accounts')
      .insert([
        { name: 'Acc User #1', user_id: user.id },
        { name: 'Acc User #2', user_id: user2.id },
      ])
      .then(() =>
        request(app)
          .get(MAIN_ROUTE)
          .set('authorization', `bearer ${user.token}`),
      )
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        // expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Acc User #1');
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              user_id: expect.any(Number),
            }),
          ]),
        );
      });
  });

  test('Deve retornar uma conta pelo ID', () => {
    return app
      .db('accounts')
      .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
      .then((acc) =>
        request(app)
          .get(`${MAIN_ROUTE}/${acc[0].id}`)
          .set('authorization', `bearer ${user.token}`),
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Acc By Id');
        expect(res.body.user_id).toBe(user.id);
      });
  });

  test.skip('Não deve retornar uma conta de outro usuário', () => {});

  test('Deve alterar uma conta', () => {
    return app
      .db('accounts')
      .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
      .then((acc) => {
        return request(app)
          .put(`${MAIN_ROUTE}/${acc[0].id}`)
          .send({ name: 'Acc Updated' })
          .set('authorization', `bearer ${user.token}`);
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Acc Updated');
        expect(res.body.user_id).toBe(user.id);
      });
  });

  test('Deve remover uma conta', () => {
    return app
      .db('accounts')
      .insert({ name: 'Acc To Remove', user_id: user.id }, ['id'])
      .then((acc) =>
        request(app)
          .delete(`${MAIN_ROUTE}/${acc[0].id}`)
          .set('authorization', `bearer ${user.token}`),
      )
      .then((res) => {
        expect(res.status).toBe(204);
      });
  });
});
