const validationError = require('../errors/validationError');

module.exports = (app) => {
  const findById = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const findAll = (userId) => {
    return app.db('accounts').select().where({ user_id: userId });
  };

  const save = async (account) => {
    if (!account.name)
      throw new validationError('Nome é um atributo obrigatório');

    const accDb = await findById({
      name: account.name,
      user_id: account.user_id,
    });

    if (accDb) throw new validationError('Esta nome de conta já está existe');

    return app.db('accounts').insert(account, '*');
  };

  const update = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts').where({ id }).del();
  };

  return { save, findAll, findById, update, remove };
};
