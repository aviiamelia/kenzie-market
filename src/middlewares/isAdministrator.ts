import { Request, Response, NextFunction } from "express";

export const isAdiminstrator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.uuid === req.params.uuid) {
    return next();
  }
  if (req.user.isAdm !== true) {
    return res.status(401).send({
      message: "You must be a Administrator to access this route",
    });
  }
  return next();
};
