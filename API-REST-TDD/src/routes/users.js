module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.userServices
      .findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.userServices.save(req.body);

      return res.status(201).json(result[0]);
    } catch (err) {
      next(err);
    }
  };

  return { findAll, create };
};
