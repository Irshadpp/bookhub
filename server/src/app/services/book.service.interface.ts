import { BookAttrs, BookDoc } from "../model/books.model";

export interface IBookService{
    createBook(attrs: BookAttrs): Promise<BookDoc>;
    findBook(id: string): Promise<BookDoc | null>;
    updateBook(id: string, attrs: BookAttrs): Promise<BookDoc | null>;
    getAllBooks(): Promise<BookDoc[] | []>;
}