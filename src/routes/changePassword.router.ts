import { Router } from "express";
import { alterarSenha } from "../controllers/user.controller";
import { changePassSchema } from "../models/changePass.model";
import { validate } from "../middlewares/validate.user";
const router = Router();

export const changePasswordRouter = () => {
  router.post("", validate(changePassSchema), alterarSenha);
  return router;
};
