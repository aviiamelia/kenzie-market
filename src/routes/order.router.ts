import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { create, getOrderById, getOrders } from "../controllers/order.controller";
import { isAdiminstrator } from "../middlewares/isAdministrator";

const router = Router();

export const orderRouter = () => {
  router.post("", isAuthenticated, create);
  router.get("/:id", isAuthenticated, isAdiminstrator, getOrderById);
  router.get("", isAuthenticated, isAdiminstrator, getOrders);
  return router;
};
