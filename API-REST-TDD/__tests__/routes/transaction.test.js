const request = require('supertest');
const jwt = require('jsonwebtoken');
const chance = require('chance').Chance();

const app = require('../../src/app');
const transactions = require('../../src/routes/transactions');

const secret = 'segredosupersecreto';
const MAIN_ROUTE = '/v1/transactions';

let user;
let user2;
let accUser;
let accUser2;

describe('Teste de rotas de transações', () => {
  beforeAll(async () => {
    await app.db('transactions').del();
    await app.db('accounts').del();
    await app.db('users').del();

    const users = await app.db('users').insert(
      [
        {
          name: 'User #1',
          email: chance.email(),
          passwd:
            '$2a$10$kI.5iBk6XFq7FqXFqEPQ1O/TfL8abEUI54RbjmX8rEMaWAAhGoikq',
        },
        {
          name: 'User #2',
          email: chance.email(),
          passwd:
            '$2a$10$kI.5iBk6XFq7FqXFqEPQ1O/TfL8abEUI54RbjmX8rEMaWAAhGoikq',
        },
      ],
      '*',
    );

    [user, user2] = users;
    delete user.passwd;
    user.token = jwt.sign(user, secret);

    const accs = await app.db('accounts').insert(
      [
        { name: 'Acc #1', user_id: user.id },
        { name: 'Acc #2', user_id: user2.id },
      ],
      '*',
    );
    [accUser, accUser2] = accs;
  });

  test('Deve listar apenas as transações do usuário', () => {
    return app
      .db('transactions')
      .insert(
        [
          {
            description: 'T1',
            date: new Date(),
            ammount: 100,
            type: 'I',
            acc_id: accUser.id,
          },
          {
            description: 'T2',
            date: new Date(),
            ammount: 300,
            type: 'O',
            acc_id: accUser2.id,
          },
        ],
        '*',
      )
      .then(() => {
        return request(app)
          .get(MAIN_ROUTE)
          .set('authorization', `bearer ${user.token}`);
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].description).toBe('T1');
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              description: 'T1',
              date: expect.any(String),
              ammount: '100.00',
              type: 'I',
              acc_id: expect.any(Number),
              status: expect.any(Boolean),
            }),
          ]),
        );
      });
  });

  test('Deve inserir uma transação com sucesso', () => {
    return request(app)
      .post(MAIN_ROUTE)
      .set('authorization', `bearer ${user.token}`)
      .send({
        description: 'New T',
        date: new Date(),
        ammount: 100,
        type: 'I',
        acc_id: accUser.id,
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body[0].acc_id).toBe(accUser.id);
      });
  });

  test('Deve retornar uma transação por ID', () => {
    return app
      .db('transactions')
      .insert(
        {
          description: 'T ID',
          date: new Date(),
          ammount: 100,
          type: 'I',
          acc_id: accUser.id,
        },
        '*',
      )
      .then((trans) =>
        request(app)
          .get(`${MAIN_ROUTE}/${trans[0].id}`)
          .set('authorization', `bearer ${user.token}`)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(trans[0].id);
            expect(res.body.description).toBe('T ID');
          }),
      );
  });

  test('Deve alterar uma transação por ID', () => {
    return app
      .db('transactions')
      .insert(
        {
          description: 'T Alterar',
          date: new Date(),
          ammount: 100,
          type: 'I',
          acc_id: accUser.id,
        },
        '*',
      )
      .then((trans) =>
        request(app)
          .put(`${MAIN_ROUTE}/${trans[0].id}`)
          .send({
            description: 'T Alterado',
            ammount: 300,
          })
          .set('authorization', `bearer ${user.token}`)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.description).toBe('T Alterado');
            expect(res.body.ammount).toBe('300.00');
          }),
      );
  });

  test('Deve remover uma transação', () => {
    return app
      .db('transactions')
      .insert(
        {
          description: 'T Deletar',
          date: new Date(),
          ammount: 100,
          type: 'I',
          acc_id: accUser.id,
        },
        '*',
      )
      .then((trans) => {
        return request(app)
          .delete(`${MAIN_ROUTE}/${trans[0].id}`)
          .set('authorization', `bearer ${user.token}`)
          .then((res) => {
            expect(res.status).toBe(204);
            // expect(res.body).toBe();
          });
      });
  });

  test('Não deve remover uma transação de outro usuário', () => {
    return app
      .db('transactions')
      .insert(
        {
          description: 'T Deletar',
          date: new Date(),
          ammount: 100,
          type: 'I',
          acc_id: accUser2.id,
        },
        '*',
      )
      .then((trans) => {
        return request(app)
          .delete(`${MAIN_ROUTE}/${trans[0].id}`)
          .set('authorization', `bearer ${user.token}`)
          .then((res) => {
            expect(res.status).toBe(403);
            expect(res.body.error).toBe(
              'Você nao tem credenciais necessárias para acessar esse recurso',
            );
          });
      });
  });
});
