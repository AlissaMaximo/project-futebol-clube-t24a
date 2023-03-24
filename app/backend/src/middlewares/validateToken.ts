import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/Jwt';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    res.locals.token = Jwt.verifyToken(authorization);

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateToken;
