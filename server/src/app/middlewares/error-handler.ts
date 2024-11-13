import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';


// This middleware will handle operational and unexpected errors
const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): any=>{
  if (err instanceof CustomError) {
    // Known errors
    return res.status(err.statusCode).json({
      success: false,
      errors: [err.message]
    });
  }

  // For unexpected errors, log them for debugging and send a generic message
  console.error(err); 
  return res.status(500).json({
    success: false,
    errors: ['Something went wrong. Please try again later.']
  });
};

export default errorHandler;
