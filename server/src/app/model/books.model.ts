import mongoose from "mongoose";

export interface BookAttrs{
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
    description: string;
    imageURL: string;
}

export interface BookDoc extends mongoose.Document{
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
    description: string;
    imageURL: string;
}

export interface BookModel extends mongoose.Model<BookDoc>{
    build(attrs: BookAttrs): BookDoc
}