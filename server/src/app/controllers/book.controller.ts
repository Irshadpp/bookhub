import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";
import { CustomError } from "../utils/custom-error";
import mongoose from "mongoose";

const bookService = new BookService();

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json({
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      throw new CustomError("Book id not found", 400);
    }
    const book = await bookService.findBook(bookId);
    if (!book) {
      throw new CustomError("Book not found", 400);
    }
    const updatedBook = await bookService.updateBook(bookId, req.body);
    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      throw new CustomError("Book id is not found or Invalid ", 400);
    }
    const book = await bookService.findBook(bookId);
    if (!book) {
      throw new CustomError("Book not found", 400);
    }
    res.status(200).json({
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
