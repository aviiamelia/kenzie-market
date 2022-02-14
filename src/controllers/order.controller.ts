import { Request, Response } from "express";
import { createOrder, findOrder, listOrders } from "../services/order.services";

export const create = async (req: Request, res: Response) => {
  try {
    let userid = req.user.uuid;
    let order = await createOrder(userid);
    if (order) {
      if (order === "empty") {
        return res.status(400).send({
          message: "There is no products in the cart to make a purchase",
        });
      }
      return res.status(201).send(order);
    } else {
      return res.status(400).send({
        message: "bad request",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "bad request" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    let orderId = req.params.id;
    let order = await findOrder(orderId);
    if (order) {
      return res.status(200).send(order);
    } else {
      return res.status(404).send({
        message: "Order not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "bad request",
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    let orders = await listOrders();
    return res.status(200).send(orders);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "Bad request",
    });
  }
};
