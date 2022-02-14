import { Request, Response } from "express";
import { emailSend } from "../services/email";

export const send = async (req: Request, res: Response) => {
  try {
    let admEmail = req.user.email;
    let options = req.body;
    let response = emailSend(options, admEmail);
    if (response) {
      return res.status(201).send(response);
    } else {
      return res.status(400).send({
        message: "Something went when sending your email",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: "Bad request",
    });
  }
};
