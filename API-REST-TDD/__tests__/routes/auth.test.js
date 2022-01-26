const request = require('supertest');
const app = require('../../src/app');

const chance = require('chance').Chance();

const name = chance.name({ middle: true });

describe('Testes de autenticação de usuários', () => {
  test('Deve criar usuário via signup', () => {
    const email = chance.email();
    return request
      .agent(app)
      .post('/auth/signup')
      .send({ name: 'Billy', email, passwd: '123456' })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            name: 'Billy',
            email: email,
          }),
        );
        expect(res.body).not.toHaveProperty('passwd');
      });
  });

  test('Deve receber token ao logar', () => {
    const email = chance.email();
    return app.services.userServices
      .save({ name, email, passwd: '123456' })
      .then(() =>
        request(app).post('/auth/signin').send({ email, passwd: '123456' }),
      )
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
      });
  });

  test('Não deve autenticar usuário com senha incorreta', () => {
    const email = chance.email({ domain: 'gmail.com' });
    return app.services.userServices
      .save({ name, email, passwd: '123456' })
      .then(() =>
        request(app).post('/auth/signin').send({ email, passwd: '654321' }),
      )
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Usuário ou senha inválidos');
      });
  });

  test('Não deve logar com usuário inexistente', () => {
    return request(app)
      .post('/auth/signin')
      .send({ email: 'naoexiste@gmail.com', passwd: '654321' })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Usuário ou senha inválidos');
      });
  });

  test('Não deve acessar uma rota protegida sem token', () => {
    return request(app)
      .get('/users')
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
});
