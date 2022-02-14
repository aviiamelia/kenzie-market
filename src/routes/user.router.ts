import { Router } from "express";
import { create, list, getUser, userDelete } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.user";
import { userSchema } from "../models/user.model";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdiminstrator } from "../middlewares/isAdministrator";
import { IsUserAlreadyRegisted } from "../middlewares/isAlreadyRegistered";

const router = Router();

export const userRouter = () => {
  router.post("", validate(userSchema), IsUserAlreadyRegisted, create);
  router.get("", isAuthenticated, isAdiminstrator, list);
  router.get("/:id", isAuthenticated, getUser);
  router.delete("/:uuid", isAuthenticated, isAdiminstrator, userDelete);
  return router;
};
