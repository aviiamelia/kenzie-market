import { userRouter } from "./user.router";
import { Express } from "express";
import { loginRouter } from "./login";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
import { orderRouter } from "./order.router";
import { emailRouter } from "./email.router";
import { recoverRouter } from "./recover.router";
import { changePasswordRouter } from "./changePassword.router";

export const routerInit = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
  app.use("/product", productRouter());
  app.use("/cart", cartRouter());
  app.use("/buy", orderRouter());
  app.use("/email", emailRouter());
  app.use("/recuperar", recoverRouter());
  app.use("/alterar_senha", changePasswordRouter());
};
