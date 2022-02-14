import dotenv from "dotenv";

dotenv.config();

export const config = {
  secret: "secret_key",
  expiresIn: process.env.EXPIRESIN,
};
