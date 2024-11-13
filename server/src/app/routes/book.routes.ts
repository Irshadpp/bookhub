import express from "express";
import { createBook } from "../controllers/book.controller";
import { createBookValidator } from "../utils/validators";
import validateRequest from "../middlewares/validate-request";

const router = express.Router();

router.post("/",
    createBookValidator,
    validateRequest,
    createBook
);

export {router as bookRouter};