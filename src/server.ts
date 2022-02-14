import app from "./app";
import "reflect-metadata";
import { createConnection } from "typeorm";

let port = 3000;

createConnection().then(() => {
  console.log("database connected");
  app.listen(process.env.PORT || port, () => {
    console.log(`Server running at localhost:${port}`);
  });
});
