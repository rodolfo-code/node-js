const validationError = require('../errors/validationError');

module.exports = (app) => {
  const save = async (account) => {
    if (!account.name)
      throw new validationError('Nome é um atributo obrigatório');
    return app.db('accounts').insert(account, '*');
  };

  const findAll = (userId) => {
    return app.db('accounts').select().where({ user_id: userId });
  };

  const findById = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const update = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts').where({ id }).del();
  };

  return { save, findAll, findById, update, remove };
};
