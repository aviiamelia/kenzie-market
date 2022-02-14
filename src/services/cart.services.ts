import { Cart, Order, Product, User } from "../entities";
import { getRepository } from "typeorm";

export const createCart = async (user: User) => {
  const cartRepository = getRepository(Cart);
  let cart = cartRepository.create({ user });
  await cartRepository.save(cart);
};

export const addToCart = async (products: Product, userid: string) => {
  const cartRepository = getRepository(Cart);
  let productRepository = getRepository(Product);
  let cart = await cartRepository.findOne({
    where: {
      user: userid,
    },
  });

  let product = await productRepository.findOne({
    where: {
      name: products.name,
    },
  });
  if (product) {
    let products = cart?.products;
    products?.push(product);
    let data = { id: cart?.id, products: products };
    await cartRepository.save(data);
    let response = await cartRepository.findOne({ where: { user: userid } });
    return response;
  }
  return false;
};

export const listCart = async () => {
  let cartRepository = getRepository(Cart);
  let carts = await cartRepository.find();
  return carts;
};

export const findCart = async (cartid: string) => {
  const cartRepository = getRepository(Cart);
  let cart = await cartRepository.findOne({
    where: {
      id: cartid,
    },
  });
  if (cart) {
    return cart;
  } else {
    return false;
  }
};

export const deleteProductFromCart = async (productid: string, userid: string) => {
  const cartRepository = getRepository(Cart);
  const productRepository = getRepository(Product);
  let cart = await cartRepository.findOne({
    where: {
      user: userid,
    },
  });
  let productFound = await productRepository.findOne({
    where: {
      id: productid,
    },
  });
  if (productFound) {
    let newCart = cart?.products.filter((product) => product.id !== productFound?.id);
    console.log(newCart);
    let data = { id: cart?.id, products: newCart };
    await cartRepository.save(data);
    return true;
  } else {
    false;
  }
};
