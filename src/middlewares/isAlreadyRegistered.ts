import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User, Product } from "../entities";

export const IsProductAlreadyRegisted = async (req: Request, res: Response, next: NextFunction) => {
  let productRepository = getRepository(Product);
  let product = await productRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (product) {
    console.log(product);
    return res.status(409).send({
      message: "Product already registered",
    });
  }
  return next();
};

export const IsUserAlreadyRegisted = async (req: Request, res: Response, next: NextFunction) => {
  let userRepository = getRepository(User);
  let user = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    console.log(user);
    return res.status(409).send({
      message: "user already registered",
    });
  }
  return next();
};
