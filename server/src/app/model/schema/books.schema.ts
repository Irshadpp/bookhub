import mongoose from "mongoose";
import { BookAttrs, BookDoc, BookModel } from "../books.model";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    imageURL: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>("Book", bookSchema);

export { Book };
