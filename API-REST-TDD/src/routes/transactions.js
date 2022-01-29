const express = require('express');

module.exports = (app) => {
  const router = express.Router();

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

  return router;
};
