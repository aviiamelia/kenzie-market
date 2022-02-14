import { Router } from "express";
import { send } from "../controllers/email.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdiminstrator } from "../middlewares/isAdministrator";
import { validate } from "../middlewares/validate.user";
import { emailSchema } from "../models/email.model";

const router = Router();

export const emailRouter = () => {
  router.post("", validate(emailSchema), isAuthenticated, isAdiminstrator, send);
  return router;
};
