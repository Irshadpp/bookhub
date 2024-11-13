import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";

const bookService = new BookService();

export const createBook = async (req: Request, res: Response, next: NextFunction) =>{
    try {
       const newBook = await bookService.createBook(req.body);
        res.status(201).json({
        message: "Book created successfully",
        data: newBook
       })
    } catch (error) {
        next(error);
    }
}