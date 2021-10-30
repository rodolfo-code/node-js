const express = require('express');

const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: 'something wrong' });
    });
});

module.exports = router;
