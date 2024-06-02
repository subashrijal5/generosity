import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { ErrorTypes } from '../enums/enum';
import { verifyToken } from '../utils/jwtTokens';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('x-auth-token');

  if (!authHeader) {
    return res.status(403).json({
      message: 'Invalid authorization header',
    });
  }

  try {
    const verified = verifyToken(authHeader);
    req.user = verified;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: 'Token expired',
        type: ErrorTypes.TokenExpiredError,
      });
    }
    return res.status(403).json({
      message: 'Invalid authorization header',
      type: ErrorTypes.JsonWebTokenError,
    });
  }
};
export default authMiddleware;
