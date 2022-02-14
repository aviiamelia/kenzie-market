import { Request, Response } from "express";
import { addToCart, listCart, findCart, deleteProductFromCart } from "../services/cart.services";

export const add = async (req: Request, res: Response) => {
  try {
    let user = req.user;

    let product = await addToCart(req.body, user.uuid);
    if (product) {
      return res.status(201).send(product);
    } else {
      return res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "something went wrong",
    });
  }
};

export const getCarts = async (req: Request, res: Response) => {
  try {
    let carts = await listCart();
    return res.status(200).send(carts);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "Bad request",
    });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let cart = await findCart(id);
    if (cart) {
      return res.status(200).send(cart);
    } else {
      return res.status(200).send({
        message: "Cart not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "bad request",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    let match = req.params.id.match(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    );
    if (!match) {
      return res.status(400).send({
        message: "Id param is not a valid uuid type string",
      });
    }
    let productId = req.params.id;
    let userId = req.user.uuid;
    let response = await deleteProductFromCart(productId, userId);
    if (response) {
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "Bad request",
    });
  }
};
