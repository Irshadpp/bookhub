import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";
import { CustomError } from "../utils/custom-error";
import mongoose from "mongoose";
import { BOOK_INDEX, ElasticService } from "../services/elastic.service";
import { elasticClient } from "../../config/elastic-search";

const bookService = new BookService();
const elasticService = new ElasticService();

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingBook = await bookService.findBooksByIsbn(req.body.isbn);
    if(existingBook){
      throw new CustomError("Book already exists in this ISBN", 400);
    }

    const newBook = await bookService.createBook(req.body);

    await elasticService.indexBook(newBook);

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

    const existingBook = await bookService.findBooksByIsbn(req.body.isbn);
    if(existingBook && existingBook.id !== bookId){
      throw new CustomError("Book already exists in this ISBN", 400);
    }
    const updatedBook = await bookService.updateBook(bookId, req.body);

    await elasticService.updateBookIndex(bookId, updatedBook);

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteBook = async (
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

    await bookService.deleteBook(bookId);

    await elasticService.deleteBookIndex(bookId);

    res.status(200).json({
      message: "Book deleted successfully",
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

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Get paginated results
    const bookData = await bookService.getAllBooks(page, limit);

    res.status(200).json({
        message: "Books fetched successfully",
        data: {
          ...bookData,
          currentPage: page,
        },
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


export const searchBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query } = req.query;
        if(!query || query === ""){
            throw new CustomError("Invalid search parameter", 400);
        }
      
        const { hits } = await elasticClient.search({
          index: BOOK_INDEX,
          body: {
            size: 10,
            query: {
              bool: {
                should: [
                  {
                    match_phrase_prefix: {
                      title: {
                        query: query as string,
                        max_expansions: 10 
                      }
                    }
                  },
                  {
                    match_phrase_prefix: {
                      author: {
                        query: query as string,
                        max_expansions: 10
                      }
                    }
                  }
                ]
              }
            }
          }
        });
      
        // Extracting only the relevant parts from hits
        const results = hits.hits.map(hit => hit._source);
    
        res.status(200).json({
          success: true,
          data: results,
        });
    } catch (error) {
        next(error);
    }
  };