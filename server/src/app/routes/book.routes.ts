import express from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/book.controller";
import { createBookValidator, updateBookValidator } from "../utils/validators";
import validateRequest from "../middlewares/validate-request";

const router = express.Router();


router.get("/:bookId",
    getBookById,
);

router.patch("/:bookId",
    updateBookValidator,
    validateRequest,
    updateBook
);

router.delete("/:bookId",
    deleteBook
)

router.post("/",
    createBookValidator,
    validateRequest,
    createBook
);

router.get("/",
    getBooks
);

export {router as bookRouter};