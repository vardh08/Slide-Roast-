import multer from 'multer';
import { ZodError } from 'zod';

export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'An unexpected internal server error occurred';

  // Handle Multer upload errors
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size limit exceeded. Pitch deck PDF must be under 10 MB.';
    } else {
      message = `Upload error: ${err.message}`;
    }
  }

  // Handle Zod schema validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    const errors = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    message = `Validation failed: ${errors}`;
  }

  // Log error internally for debugging
  console.error(`[Error] ${req.method} ${req.url} -> [${statusCode}]:`, err.message);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
