import express from "express";
import { routerInit } from "./routes";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));
routerInit(app);
export default app;
