import express from "express";
import cors from "cors";
import { json } from "body-parser";

const app = express();

app.use(json());

export { app };
