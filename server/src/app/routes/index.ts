import express from "express";
import { bookRouter } from "./book.routes";

const router = express.Router();

router.use("/book",bookRouter);

export {router as appRouter};