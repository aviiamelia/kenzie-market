import { getRepository } from "typeorm";
import { IProduct } from "../types/products.types";
import { Product } from "../entities";

export const createProduct = async (data: IProduct) => {
  const productRepository = getRepository(Product);
  const { name, category, price } = data;
  const product = productRepository.create({ name, category, price });
  await productRepository.save(product);
  let response = {
    message: "Product created",
    product: product,
  };
  return response;
};

export const findProduct = async (id: string) => {
  const productRepository = getRepository(Product);
  let product = productRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!product) {
    return false;
  }
  return product;
};

export const listProducts = async () => {
  const productRepository = getRepository(Product);
  let products = await productRepository.find();
  return products;
};
