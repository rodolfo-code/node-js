const bcrypt = require('bcrypt-nodejs');

const validationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(['id', 'name', 'email']);
  };

  const findOne = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwd, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new validationError('Nome é um atributo obrigatório');

    if (!user.email)
      throw new validationError('Email é um atributo obrigatório');

    if (!user.passwd)
      throw new validationError('Senha é um atributo obrigatório');

    const userDb = await findOne({ email: user.email });

    if (userDb.length > 0)
      throw new validationError('Já existe um usuário com este email');

    const newUser = { ...user };
    newUser.passwd = getPasswdHash(user.passwd);

    return app.db('users').insert(newUser, ['id', 'name', 'email']);
  };

  return { findAll, save, findOne };
};
