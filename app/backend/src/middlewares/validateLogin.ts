import { Request, Response, NextFunction } from 'express';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  // emailRegex fonte: https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/

  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  return next();
}

export default validateLogin;
