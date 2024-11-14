import { BookAttrs, BookDoc } from "../model/books.model";

export interface IBookService{
    createBook(attrs: BookAttrs): Promise<BookDoc>;
    findBook(id: string): Promise<BookDoc | null>;
    updateBook(id: string, attrs: BookAttrs): Promise<BookDoc | null>;
    deleteBook(id: string): Promise<void>;
    getAllBooks(page: number, limit: number): Promise<{
        books: BookDoc[];
        totalBooks: number;
        totalPages: number;
      }>;
}