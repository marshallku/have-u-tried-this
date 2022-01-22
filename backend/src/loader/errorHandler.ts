import { Router, Request, Response, NextFunction } from "express";
import httpError from "http-errors";

export default (app: Router) => {
  // Error handler
  // 404 error
  app.use((req, res, next) => {
    next(httpError(404).message);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: true, message: err });
  });
};
