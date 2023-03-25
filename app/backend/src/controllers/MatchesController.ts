import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchService = new MatchesService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = await this._matchService.getAll(inProgress as string);

    res.status(200).json(result);
  }
}
