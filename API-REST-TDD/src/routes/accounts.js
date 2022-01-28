module.exports = (app) => {
  const create = (req, res, next) => {
    app.services.accountServices
      .save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      })
      .catch((err) => next(err));
  };

  const getAll = (req, res, next) => {
    app.services.accountServices
      .findAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  };

  const getById = (req, res, next) => {
    app.services.accountServices
      .findById({ id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  };

  const update = (req, res, next) => {
    const id = req.params.id;
    const account = req.body;
    app.services.accountServices
      .update(id, account)
      .then((result) => {
        res.status(200).json(result[0]);
      })
      .catch((err) => next(err));
  };

  const remove = (req, res, next) => {
    const id = req.params.id;
    app.services.accountServices
      .remove(id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  return {
    create,
    getAll,
    getById,
    update,
    remove,
  };
};
