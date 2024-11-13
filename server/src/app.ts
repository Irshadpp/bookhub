import express from "express";
import cors from "cors";
import { json } from "body-parser";
import errorHandler from "./app/middlewares/error-handler";
import { appRouter } from "./app/routes";
import { CustomError } from "./app/utils/custom-error";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/v1", appRouter);

app.all("*",()=>{
    throw new CustomError("Not found", 404);
})

app.use(errorHandler)

export { app };
