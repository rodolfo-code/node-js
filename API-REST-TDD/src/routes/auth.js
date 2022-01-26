const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const validationError = require('../errors/validationError');

const secret = 'segredosupersecreto';

// const decode = (token) => jwt.verify(token, secret);

module.exports = (app) => {
  const signin = (req, res, next) => {
    const { email, passwd } = req.body;
    app.services.userServices
      .findOne({ email })
      .then(([user]) => {
        if (!user) throw new validationError('Usuário ou senha inválidos');

        if (bcrypt.compareSync(passwd, user.passwd)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const token = jwt.sign(payload, secret);
          return res.status(200).json({ token });
        }

        throw new validationError('Usuário ou senha inválidos');
      })
      .catch((err) => next(err));
  };

  return { signin };
};
