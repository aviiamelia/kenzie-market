import { Request, Response } from "express";
import { createUser } from "../services/user.services";

import {
  listusers,
  userLogin,
  getUserProfile,
  deleteUser,
  recoverPassword,
  changePassword,
} from "../services/user.services";

export const create = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (e: any) {
    res.status(400).send({
      message: "Bad request",
    });
  }
};

export const list = async (req: Request, res: Response) => {
  const users = await listusers();
  res.status(200).send(users);
};

export const login = async (req: Request, res: Response) => {
  try {
    let token = await userLogin(req.body);
    if (token.token === undefined) {
      res.status(401).send({
        message: "Wrong email/password",
      });
    } else {
      res.status(200).send(token);
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({
      message: "Wrong email/password",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserProfile(req.params);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    return res.status(200).send(user);
  } catch (e: any) {
    res.status(400).send({
      message: "bad request",
    });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  try {
    let response = await deleteUser(req.params.uuid);
    if (response) {
      return res.status(200).send({
        message: "User deleted with success",
      });
    } else {
      return res.status(404).send({
        message: "User not found",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const recuperar = async (req: Request, res: Response) => {
  try {
    if (req.body.email === undefined) {
      return res.status(400).send({
        message: "You must pass your email in the request body",
      });
    }
    let code = await recoverPassword(req.body.email);

    if (code) {
      return res.status(200).send({
        message: "We have sent a recovery code to your email",
      });
    } else {
      return res.status(404).send({
        message: "User not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "Bad request",
    });
  }
};

export const alterarSenha = async (req: Request, res: Response) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let match = await changePassword(email, req.body.code, password);
    if (match) {
      return res.status(200).send({
        message: "Your password has been sucessfully changed!",
      });
    } else {
      return res.status(400).send({
        message: "The code sended does not match the one in your email",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: "bad request",
    });
  }
};
