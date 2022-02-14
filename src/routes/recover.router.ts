import { Router } from "express";
import { recuperar } from "../controllers/user.controller";
const router = Router();

export const recoverRouter = () => {
  router.post("", recuperar);
  return router;
};
