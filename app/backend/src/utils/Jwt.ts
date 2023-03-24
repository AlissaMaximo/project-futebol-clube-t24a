import * as jwt from 'jsonwebtoken';
import process = require('process');

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

class Jwt {
  static buildToken(email :string) {
    const secret = `${process.env.JWT_SECRET}`;

    return jwt.sign({ email }, secret, jwtConfig);
  }

  static verifyToken(token: string) {
    const secret = `${process.env.JWT_SECRET}`;

    return jwt.verify(token, secret, jwtConfig);
  }
}

export default Jwt;
