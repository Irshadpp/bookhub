import { BookAttrs, BookDoc } from "../model/books.model";
import { Book } from "../model/schema/books.schema";
import { IBookService } from "./book.service.interface";

export class BookService implements IBookService{
    async createBook(attrs: BookAttrs): Promise<BookDoc> {
        return await Book.build(attrs).save();
    }
}