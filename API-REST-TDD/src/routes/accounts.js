const express = require('express');
const recursoIndevidoError = require('../errors/recursoIndevidoError');

module.exports = (app) => {
  const router = express.Router();

  router.param('id', async (req, res, next) => {
    const { id } = req.user;
    app.services.accountServices
      .findById({
        id: req.params.id,
      })
      .then(({ user_id }) => {
        if (id !== user_id) {
          throw new recursoIndevidoError();
        }

        next();
      })
      .catch((err) => next(err));
  });

  router.post('/', (req, res, next) => {
    app.services.accountServices
      .save({ ...req.body, user_id: req.user.id })
      .then((result) => {
        res.status(201).json(result[0]);
      })
      .catch((err) => next(err));
  });

  router.get('/', async (req, res, next) => {
    app.services.accountServices
      .findAll(req.user.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.accountServices
      .findById({ id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const account = req.body;
    app.services.accountServices
      .update(id, account)
      .then((result) => {
        res.status(200).json(result[0]);
      })
      .catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    app.services.accountServices
      .remove(id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
