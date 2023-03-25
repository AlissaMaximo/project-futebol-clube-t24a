import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/Jwt';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const verification = Jwt.verifyToken(authorization);
    res.locals.token = verification;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateToken;
