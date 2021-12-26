import httpError from "http-errors";

export default (app) => {
  // Error handler
  // 404 error
  app.use((req, res, next) => {
    next(httpError(404).message);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err });
  });
};
