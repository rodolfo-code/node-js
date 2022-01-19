module.exports = (app) => {
  const create = (req, res) => {
    app.services.accountServices.save(req.body).then((result) => {
      return res.status(201).json(result[0]);
    });
  };

  const getAll = (req, res) => {
    app.services.accountServices.findAll().then((result) => {
      res.status(200).json(result);
    });
  };

  const getById = (req, res) => {
    app.services.accountServices
      .findById({ id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      });
  };

  return {
    create,
    getAll,
    getById,
  };
};
