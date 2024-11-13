import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Extract validation errors from the request
  const errors = validationResult(req);
  // If there are validation errors, return a 400 with the errors
  if (!errors.isEmpty()) {

    // serialize the errors for consistency
    const serializedErrors = errors.array().map(item => item.msg)
     res.status(400).json({
      success: false,
      errors: serializedErrors // Get all validation errors as an array
    });
    return;
  }
  
  // If no errors, pass control to the next middleware/route handler
  next();
};

export default validateRequest;
