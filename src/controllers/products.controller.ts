import { Request, Response } from "express";
import { createProduct, findProduct, listProducts } from "../services/products.services";

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).send(product);
  } catch (e) {
    console.log(e);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    let match = req.params.id.match(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    );
    if (!match) {
      return res.status(400).send({
        message: "Id param is not a valid uuid type string",
      });
    }
    let id = req.params.id;
    let product = await findProduct(id);
    console.log();
    if (product) {
      return res.status(200).send(product);
    } else {
      return res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: "Bad request",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products = await listProducts();
    return res.status(200).send(products);
  } catch (e) {
    return res.status(200).send({
      message: "bad request",
    });
  }
};
