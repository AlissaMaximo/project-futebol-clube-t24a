import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchService = new MatchesService()) {}

  async getAll(_req: Request, res: Response) {
    const result = await this._matchService.getAll();

    res.status(200).json(result);
  }
}
