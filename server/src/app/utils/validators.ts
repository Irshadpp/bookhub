import { body } from "express-validator";

export const createBookValidator = [
    body('title')
    .trim()
      .isString().withMessage('Title must be a valid')
      .notEmpty().withMessage('Title is required'),
    body('author')
    .trim()
      .isString().withMessage('Author must be a valid')
      .notEmpty().withMessage('Author is required'),
    body('publicationYear')
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage('Publication year must be a valid year'),
    body('isbn')
    .trim()
      .isString().withMessage('ISBN must be valid')
      .notEmpty().withMessage('ISBN is required'),
    body('description')
      .trim()
      .isString().withMessage('Description must be a valid')
      .notEmpty().withMessage('Description is required')
  ];