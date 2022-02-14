import { getRepository } from "typeorm";
import { Cart, Order, User } from "../entities";
import { mailOption, sendEmail } from "../email/email.services";
import dotenv from "dotenv";
dotenv.config();

export const createOrder = async (userid: string) => {
  const orderRepository = getRepository(Order);
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  let user = await userRepository.findOne({
    where: {
      id: userid,
    },
  });

  if (user) {
    let cart = await cartRepository.findOne({ where: { user: userid } });
    if (cart) {
      if (cart.products.length < 1) {
        return "empty";
      }
    }
    let order = orderRepository.create({ user });
    await orderRepository.save(order);
    let userEmail = process.env.EMAIL_USER;

    let response = {
      order,
      cart_id: cart?.id,
      cart_creation_date: cart?.createdOn,
      products: cart?.products,
    };
    let emailResponse = {
      user: order.user.name,
      userEmail: order.user.email,
      order_date: order.orderDate,
      products_Bought: cart?.products,
    };
    if (userEmail) {
      sendEmail(
        mailOption(
          userEmail,
          user.email,
          "Order made on kenzie Market",
          JSON.stringify(emailResponse)
        )
      );
    }
    return response;
  } else {
    return false;
  }
};

export const findOrder = async (orderid: string) => {
  const orderRepository = getRepository(Order);
  const cartRepository = getRepository(Cart);
  let order = await orderRepository.findOne({
    where: {
      id: orderid,
    },
  });
  if (order) {
    let userid = order.user.id;
    let cart = await cartRepository.findOne({ where: { user: userid } });
    let response = { order, cart: cart };
    return response;
  } else {
    return false;
  }
};

export const listOrders = async () => {
  const orderRepository = getRepository(Order);
  let orders = orderRepository.find();
  return orders;
};
