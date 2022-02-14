import { Router } from "express";
import { validate } from "../middlewares/validate.user";
import { productSchema } from "../models/product.model";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { add, getCarts, getCart, deleteProduct } from "../controllers/cart.controller";
import { isAdiminstrator } from "../middlewares/isAdministrator";

const router = Router();

export const cartRouter = () => {
  router.post("", validate(productSchema), isAuthenticated, add);
  router.get("", isAuthenticated, isAdiminstrator, getCarts);
  router.get("/:id", isAuthenticated, isAdiminstrator, getCart);
  router.delete("/:id", isAuthenticated, isAdiminstrator, deleteProduct);
  return router;
};
