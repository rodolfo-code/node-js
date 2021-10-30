const logRouter = (req, _res, next) => {
  const { method, url } = req;

  const route = `[${method.toUpperCase()}] ${url}`;
  console.log(route);
  next();
};

module.exports = logRouter;
