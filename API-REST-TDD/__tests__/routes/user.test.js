const request = require('supertest');
const chance = require('chance').Chance();

const app = require('../../src/app');

// const chance = new Chance();

describe('Testes de rotas de usuário!', () => {
  test('Deve listar todos os usuários', () => {
    return request(app)
      .get('/users')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  test('Deve inserir usuário com sucesso', () => {
    // const email = `${Date.now()}@email.com`

    return request(app)
      .post('/users')
      .send({
        name: 'Walter Mitty',
        email: chance.email({ domain: 'gmail.com' }),
        passwd: '123456',
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Walter Mitty');
      });
  });
});
