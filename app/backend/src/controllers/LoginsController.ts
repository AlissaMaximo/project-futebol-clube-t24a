import { Request, Response } from 'express';
import LoginsService from '../services/LoginsService';

class LoginsController {
  constructor(private _service = new LoginsService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._service.login({ email, password });

    if (!token) return res.status(401).json({ message: 'Invalid email or password' });

    return res.status(200).json(token);
  }

  async returnRole(_req: Request, res: Response) {
    const { email } = res.locals.token;
    const result = await this._service.returnRole(email);

    if (!result) return res.status(401).json({ message: 'Invalid email or password' });

    return res.status(200).json({ role: result });
  }
}

export default LoginsController;
