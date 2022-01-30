const express = require('express');
const recursoIndevidoError = require('../errors/recursoIndevidoError');

module.exports = (app) => {
  const router = express.Router();

  router.param('id', (req, res, next) => {
    const userId = req.user.id;
    const transId = req.params.id;

    app.services.transactionServices
      .find(userId, {
        'transactions.id': transId,
      })
      .then((result) => {
        if (result.length > 0) return next();

        throw new recursoIndevidoError();
      })
      .catch((err) => next(err));
  });

  router.get('/', (req, res, next) => {
    const userId = req.user.id;

    app.services.transactionServices
      .find(userId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.post('/', (req, res, next) => {
    const newTransaction = req.body;
    app.services.transactionServices
      .save(newTransaction)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    app.services.transactionServices
      .findOne({ id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const trans = req.body;

    app.services.transactionServices
      .update(id, trans)
      .then(([result]) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    app.services.transactionServices
      .remove(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => next(err));
  });

  return router;
};
