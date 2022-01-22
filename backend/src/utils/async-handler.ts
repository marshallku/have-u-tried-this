import { Request, Response, NextFunction } from "express";

interface IRequestHandler {
  (req: Request, res: Response): Promise<void>;
}

export default (requestHandler: IRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err.message);
    }
  };
