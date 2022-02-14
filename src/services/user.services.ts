import { getRepository, getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/index";
import { IUser, ILogin } from "../types/user.types";
import UserRepository from "../repositories/user.repository";
import { createCart } from "./cart.services";
import { sendEmail } from "../email/email.services";

export const createUser = async (data: IUser) => {
  const userRepository = getRepository(User);

  const { name, email, password, isAdm } = data;
  const user = userRepository.create({ name, password, email, isAdm });
  await userRepository.save(user);
  await createCart(user);
  const { password: erase, ...response } = user;
  return response;
};

export const listusers = async () => {
  const userRepository = getCustomRepository(UserRepository);
  const users = userRepository.list();
  return users;
};

export const userLogin = async (data: ILogin) => {
  let { password, email } = data;
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { message: "Wrong email/password" };
  }

  let token = jwt.sign(
    { uuid: user.id, email: user.email, password: user.password, isAdm: user.isAdm },
    "secret_key",
    {
      expiresIn: "1d",
    }
  );
  return {
    token: token,
  };
};

export const getUserProfile = async (data: any) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: data.id,
    },
  });
  if (!user) {
    return false;
  }
  let { password: erase, ...response } = user;
  return response;
};

export const deleteUser = async (id: string) => {
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ id: id });
  if (user) {
    await userRepository.delete({ id: id });
    return true;
  }
  return false;
};

export const recoverPassword = async (userEmail: string) => {
  if (userEmail === undefined) {
    return false;
  }
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });
  let hashedcode = bcrypt.hashSync(userEmail, 5);
  let options = {
    to: userEmail,
    subject: "Password Recover",
    text: `This is your code: ${hashedcode}`,
  };
  sendEmail(options);
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const changePassword = async (email: string, recoveryCode: string, password: string) => {
  const userRepository = getRepository(User);
  let match = bcrypt.compareSync(email, recoveryCode);
  if (match) {
    let hashed = bcrypt.hashSync(password, 10);
    await userRepository.update({ email: email }, { password: hashed });
    return true;
  } else {
    return false;
  }
};
