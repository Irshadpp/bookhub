import { body } from "express-validator";

export const createBookValidator = [
  body("title")
    .trim()
    .isString()
    .withMessage("Title must be a valid")
    .notEmpty()
    .withMessage("Title is required"),
  body("author")
    .trim()
    .isString()
    .withMessage("Author must be a valid")
    .notEmpty()
    .withMessage("Author is required"),
  body("publicationYear")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Publication year must be a valid year"),
  body("isbn")
    .trim()
    .isString()
    .withMessage("ISBN must be valid")
    .notEmpty()
    .withMessage("ISBN is required"),
  body("description")
    .trim()
    .isString()
    .withMessage("Description must be a valid")
    .notEmpty()
    .withMessage("Description is required"),
    body("imageURL")
    .trim()
    .isString()
    .withMessage("image url must be a valid")
    .notEmpty()
    .withMessage("image is required"),
];

export const updateBookValidator = [
  body("title")
    .optional()
    .trim()
    .isString()
    .withMessage("Title must be a valid")
    .notEmpty()
    .withMessage("Title is required"),
  body("author")
    .optional()
    .trim()
    .isString()
    .withMessage("Author must be a valid")
    .notEmpty()
    .withMessage("Author is required"),
  body("publicationYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Publication year must be a valid year"),
  body("isbn")
    .optional()
    .trim()
    .isString()
    .withMessage("ISBN must be valid")
    .notEmpty()
    .withMessage("ISBN is required"),
  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a valid")
    .notEmpty()
    .withMessage("Description is required"),
    body("imageURL")
    .optional()
    .trim()
    .isString()
    .withMessage("image url must be a valid")
    .notEmpty()
    .withMessage("image is required"),
];
