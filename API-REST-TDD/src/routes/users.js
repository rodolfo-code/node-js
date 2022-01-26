const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.userServices
      .findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.userServices.save(req.body);

      return res.status(201).json(result[0]);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
