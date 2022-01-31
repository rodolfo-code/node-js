module.exports = (app) => {
  const find = (userId, filter = {}) => {
    return app
      .db('transactions')
      .join('accounts', 'accounts.id', 'acc_id')
      .where(filter)
      .andWhere('accounts.user_id', '=', userId)
      .select();
  };

  const save = (newTransaction) => {
    return app.db('transactions').insert(newTransaction, '*');
  };

  const findOne = (filter) => {
    return app.db('transactions').where(filter).first();
  };

  const update = (id, trans) => {
    return app.db('transactions').where({ id }).update(trans, '*');
  };

  const remove = (id) => {
    return app.db('transactions').where({ id }).del();
  };

  return { find, save, findOne, update, remove };
};
