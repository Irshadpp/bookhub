import { BookAttrs, BookDoc } from "../model/books.model";
import { Book } from "../model/schema/books.schema";
import { IBookService } from "./book.service.interface";

export class BookService implements IBookService {
  async createBook(attrs: BookAttrs): Promise<BookDoc> {
    return await Book.build(attrs).save();
  }
  async findBook(id: string): Promise<BookDoc | null> {
    return await Book.findById(id);
  }
  async findBooksByIsbn(isbn: string): Promise<BookDoc | null> {
    return await Book.findOne({isbn:isbn})
  }
  async updateBook(id: string, attrs: BookAttrs): Promise<BookDoc | null> {
    return Book.findByIdAndUpdate(id, { $set: attrs }, { new: true });
  }
  async deleteBook(id: string): Promise<void> {
    await Book.findByIdAndDelete(id);
  }
  async getAllBooks(
    page: number,
    limit: number
  ): Promise<{
    books: BookDoc[];
    totalBooks: number;
    totalPages: number;
  }> {

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find()
      .skip((page - 1) * limit) 
      .limit(limit); 

    return {
      books,
      totalBooks,
      totalPages,
    };
  }
}
