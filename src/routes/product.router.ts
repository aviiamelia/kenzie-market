import { Router } from "express";
import { create, getProductById, getProducts } from "../controllers/products.controller";
import { isAdiminstrator } from "../middlewares/isAdministrator";
import { validate } from "../middlewares/validate.user";
import { productSchema } from "../models/product.model";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { IsProductAlreadyRegisted } from "../middlewares/isAlreadyRegistered";

const router = Router();

export const productRouter = () => {
  router.post(
    "",
    validate(productSchema),
    IsProductAlreadyRegisted,
    isAuthenticated,
    isAdiminstrator,
    create
  );
  router.get("/:id", getProductById);
  router.get("", getProducts);
  return router;
};
