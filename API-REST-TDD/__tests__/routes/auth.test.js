const request = require('supertest');
const app = require('../../src/app');

const chance = require('chance').Chance();

const email = chance.email({ domain: 'gmail.com' });
const name = chance.name({ middle: true });

test('Deve receber token ao logar', () => {
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
