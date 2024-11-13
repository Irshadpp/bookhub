import { BookAttrs, BookDoc } from "../model/books.model";

export interface IBookService{
    createBook(attrs: BookAttrs): Promise<BookDoc>;
}